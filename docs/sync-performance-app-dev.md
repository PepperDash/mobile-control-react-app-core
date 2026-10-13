# Adopting the Mobile Control sync performance improvements in a React app

Audience: developers and coding agents updating a React app built on `@pepperdash/mobile-control-react-app-core`.

## Overview

A React app built on `@pepperdash/mobile-control-react-app-core` gets most of the gain by doing two things: request device state with one `/system/batchDeviceFullStatus` request asking for an aggregated reply, and stop sending one status request per device. On the KPMG app this took the Cisco Navigator's boot sync from 1,870 ms to 177 ms (median).

The work splits between the processor and the app:

- **Processor (Essentials, no app change needed):** per-client transmit queues are on by default, and the processor no longer pings a client before every message it sends. Every client benefits once the processor runs the new build.
- **Library:** applies an aggregated reply as one Redux update instead of one per device status, records timing marks, and provides the hooks that send batched, deduplicated requests.
- **App (this guide):** sends its sync requests as batches with `aggregate: true`, and has its modals and pages batch their own requests instead of sending one per device.

| Navigator boot sync, 40 device paths | Median | p90 |
| --- | --- | --- |
| Baseline: one message per device status | 1,870 ms | 1,900 ms |
| Aggregated reply | 195 ms | 239 ms |
| Aggregated, per-client queues, no per-message ping | 177 ms | 203 ms |

Steps 1 to 3 change the app; step 4 covers processor configuration; step 5 is optional measurement. The KPMG app (`kpmg-react-app`, a private PepperDash-Services repository, branch `perf/load-sync-metrics`) is the reference implementation, and the [worked example](#worked-example-essentialsdemoreactapp) at the end shows the changes for the public demo app.

## Prerequisites

You need library `1.25.0-feat-essentials-v3.30` or later, and Essentials `v3.0.0-rc.12` or later. Every change in this guide degrades safely on older processors.

| Component | Version | What it provides |
| --- | --- | --- |
| `@pepperdash/mobile-control-react-app-core` | `1.25.0-feat-essentials-v3.30` or later | Handles the aggregated `/system/batchDeviceStatus` reply as one store update; perf timing API (`registerPerfSink`, `perfMeasure`, `perfNames`); from `.30`, the batch hooks (`useSendBatchStatusRequest`, `useSendUnrequestedBatchStatus`, `useDeviceStatusSync`, `mergeDeviceMaps`) |
| Essentials (Mobile Control) | `v3.0.0-rc.12` or later | Aggregated batch reply when the request asks for it; per-client transmit queues on by default; no ping before each message |
| Room plugin | Any | No change needed |

Compatibility, if a piece is older:

- **Older Essentials:** ignores `aggregate` and `requestId` and replies the old way (one message per device status, then `/system/initialSyncComplete`). The app keeps working, just without the aggregation gain.
- **Older library:** doesn't understand `/system/batchDeviceStatus`, so the sync never completes. Upgrade the library before sending `aggregate: true`.

## Step 1: Upgrade the library

Pin the library to the release that has the batch hooks, `1.25.0-feat-essentials-v3.30` or later. `.29` already handles aggregated replies, but doesn't export the hooks used in steps 2 and 3. Then rebuild. No app code changes are needed for this step.

```bash
npm install --save-exact @pepperdash/mobile-control-react-app-core@1.25.0-feat-essentials-v3.30
npx tsc --noEmit && npm run build
```

What the upgrade changes on its own:

- The websocket middleware handles `/system/batchDeviceStatus`: it applies every room status in one `setManyRoomStates` dispatch and every device status in one `setManyDeviceStates` dispatch, then sets `initialSyncComplete`, exactly as `/system/initialSyncComplete` does.
- It records perf marks and counters (connect steps, WebSocket open, batch sent and completed, messages and dispatches). They cost nothing until the app registers a sink (step 5).

If the app already gates rendering on `useIsInitialSyncComplete()` (or a latch over it), that gate keeps working unchanged.

## Step 2: Send sync requests as aggregated batches

Every `/system/batchDeviceFullStatus` the app sends should go through one hook that adds `aggregate: true` and a `requestId`. The processor then replies with a single message instead of one per device status.

Request and reply, side by side:

```json
// Request (the app sends)
{ "type": "/system/batchDeviceFullStatus", "clientId": "<id>",
  "content": { "devices": { "display-1": ["/fullStatus"], "dsp-1--program": ["/volumeStatus"] },
               "aggregate": true, "requestId": "batch-lq3x9k-1" } }

// Reply (one message; the library applies it)
{ "type": "/system/batchDeviceStatus",
  "content": { "requestId": "batch-lq3x9k-1", "syncComplete": true,
               "messages": [ { "type": "/device/display-1", "content": { } }, "…" ] } }
```

**Choose each device's paths; don't default to `/fullStatus`.** The `devices` map lists, per device key, the status paths its messengers handle: `/fullStatus`, and per-messenger paths such as `/powerStatus`, `/inputStatus`, `/volumeStatus`, `/commStatus` and `/deviceInfo`. The processor runs every handler registered for each path and puts all their replies in the one aggregated message. Ask for the narrowest paths that cover what the UI renders: a volume fader needs `/volumeStatus`, not the whole device. A path no messenger handles for that device is skipped, so it costs nothing but sends no data either; check a device's messengers in Essentials Dev Tools (or its plugin) before relying on a path.

Import the hooks from the library (`1.25.0-feat-essentials-v3.30` or later) rather than copying them into the app. They send `aggregate: true` and a `requestId` by default, and record each device and path pair they request so step 3 can skip repeats. Source: `src/lib/shared/hooks/useBatchDeviceStatus.ts`.

```ts
import {
  useSendBatchStatusRequest,     // sends every pair given
  useSendUnrequestedBatchStatus, // sends only pairs not yet requested on this connection
  type DeviceStatusMap,          // Record<deviceKey, statusPaths[]>
} from "@pepperdash/mobile-control-react-app-core";
```

Then replace every direct `sendMessage("/system/batchDeviceFullStatus", …)` in the app with the hook:

```ts
const sendBatchStatusRequest = useSendBatchStatusRequest();
// …inside the existing effect, in place of sendMessage(...):
sendBatchStatusRequest(devices);
```

Keep the existing guard that sends the boot batch once (a sync-state flag such as `devicesSynced`) and the existing render gate on `initialSyncComplete`. Both work the same with the aggregated reply.

Aggregation is on by default. To make it switchable from the processor, pass the option from the app config, as the KPMG app does with `perf.aggregateBatch`:

```ts
const appConfig = useAppConfig() as { perf?: { aggregateBatch?: boolean } } | undefined;
const sendBatchStatusRequest = useSendBatchStatusRequest({
  aggregate: appConfig?.perf?.aggregateBatch !== false,
});
```

## Step 3: Batch the requests modals and pages make

Any component that sends `/device/<key>/fullStatus` (or `/volumeStatus`, `/inputStatus`, …) once per device should instead hand a device map to one deduplicated batch. Find them with:

```bash
grep -rnE "sendMessage\(\`/device/[^\`]*/(fullStatus|volumeStatus|inputStatus|commStatus|deviceInfo)" src
```

Use the library's `useDeviceStatusSync`, with `mergeDeviceMaps` to combine maps:

```ts
import {
  mergeDeviceMaps, useDeviceStatusSync, type DeviceStatusMap,
} from "@pepperdash/mobile-control-react-app-core";

// In a modal wrapper: everything its children render, as one deduplicated batch.
const devices = useMemo<DeviceStatusMap>(
  () => mergeDeviceMaps(routeBootMap, { [roomCombinerKey]: ["/fullStatus"] }),
  [routeBootMap, roomCombinerKey],
);
useDeviceStatusSync(devices);                      // options: { enabled, aggregate }
```

`useDeviceStatusSync(devices, { enabled, aggregate })` sends only pairs this connection hasn't requested yet, and runs again when `devices` changes, sending only what is new.

Then, in each component that requests per device:

1. Build the same devices and paths as a memoized map (`useMemo`), keyed on the config or state they come from.
2. Call `useDeviceStatusSync(devices)` and delete the per-device `sendMessage` loop.
3. Remove any re-request that runs on every room-state update (an effect with `[roomState]` as its dependency is the usual sign). Once a pair has been requested, the processor pushes its changes to this client.

Rules that keep it correct:

- **Every route can be an entry point.** A panel can launch the app straight at a modal's route (`/environment`, `/videoWall`), or reach it by navigating inside the app. The wrapper at the top of a modal must request everything its children render: the route's own boot map, the wrapper's devices, and any devices its children request. Don't rely on what another page requested.
- **Children keep their own requests, routed through the same hook.** When a child needs a device only it can know about (a video wall screen's sub-device, known only after the processor's state arrives), it calls `useDeviceStatusSync` with that device. When the wrapper already covered it, nothing is sent.
- **Don't overlap the boot batch.** The library times and completes the most recent batch it sent, and doesn't match replies by `requestId`. Render modal routes behind the initial-sync gate, as the KPMG app does, so their batches go out after the boot reply.
- **A page that shows a spinner until its data arrives** should follow the KPMG `useTechPageSync` pattern instead: remove `initialSyncComplete`, send the batch with `useSendBatchStatusRequest`, and wait for the library to set it again.

## Step 4: Processor configuration

No processor setting is required: with the new Essentials build, per-client queues and the removal of the per-message ping are already on. The settings below exist to turn things off, or to pass app settings through.

| Setting | Where | Default | Effect |
| --- | --- | --- | --- |
| `directServer.perClientQueues` | `appServer` device properties | `true` | Each client gets its own transmit queue, so a slow client only delays itself. `false` = the old shared transmit thread. |
| `applicationConfig.perf.aggregateBatch` | `appServer` device properties | `true` (read by the app) | `false` makes the app send plain batches, for comparison or rollback. |
| Any other `applicationConfig` key | `appServer` device properties | n/a | Copied into the app's `_config.local.json` on every program start, so app-specific settings (such as a `datadog` block) survive restarts. |

Example `appServer` properties with the defaults written out:

```json
"directServer": {
  "enableDirectServer": true,
  "port": 50003,
  "perClientQueues": true
},
"applicationConfig": {
  "perf": { "aggregateBatch": true }
}
```

The app reads `applicationConfig` through `useAppConfig()`. Settings it doesn't model need a cast, as in the step 2 example.

## Step 5 (optional): Measure with Datadog RUM

Skip this unless you need before-and-after numbers. To add it, copy the KPMG app's `src/perf/` folder (`datadogPerf.ts`, `perfConfig.ts`, `PerfMonitor.tsx`, `usePerfMetrics.ts`), install `@datadog/browser-rum`, and render `<PerfMonitor />` once near the app root.

What matters when copying it:

- **Never send Mobile Control tokens to Datadog.** The join URL and `token=` query parameters carry them. Keep the `beforeSend` scrubber (`maskToken` in `perfConfig.ts`).
- **Panel browsers need fallbacks.** Keep `sessionPersistence: ['cookie', 'local-storage', 'memory']`; the Navigator and some panels refuse cookies.
- **Label each panel.** Add `?perfLabel=navigator` (or `tsw1070`, `desktop-vpn`) to that panel's app URL. The label is read once at load, before the app's redirects drop the query string.
- **Configure it from the processor.** Put the `datadog` block and `perf.phase` in the `appServer` device's `applicationConfig` (step 4); the Datadog client token is public by design.

The primary metric is the `sync.batch` vital. In RUM Explorer, filter on `@vital.name:sync.batch @context.initial:true`, group by `@context.panel` and `@context.phase`, and show the 50th and 90th percentiles of the vital duration. A command-line probe that measures how one client's sync affects others is in `tools/sync-probe.mjs` in the KPMG app.

## Verification checklist

Work through these before handing the change over. An agent can do the first four without hardware.

- [ ] `package.json` pins `@pepperdash/mobile-control-react-app-core` to `1.25.0-feat-essentials-v3.30` or later.
- [ ] No direct `sendMessage("/system/batchDeviceFullStatus", …)` remains in the app; the library hooks send it (`grep -rn batchDeviceFullStatus src`).
- [ ] The step 3 grep finds no per-device status loops, or only ones you've checked are deliberate.
- [ ] `npx tsc --noEmit`, the linter on the changed files, and `npm run build` pass.
- [ ] On a processor with the new Essentials build, the browser's WebSocket frames show the boot batch carrying `"aggregate":true` and one `/system/batchDeviceStatus` reply, and the app leaves its syncing screen.
- [ ] Each modal route, loaded directly by URL, shows populated state.
- [ ] Live updates still arrive after the sync: change a device from another panel or from Essentials Dev Tools and watch it update.

Pitfalls seen during the KPMG work:

- **Chrome's network throttling doesn't apply to WebSockets.** It won't simulate a slow panel link; test over a real VPN or a slow network instead.
- **Node's built-in WebSocket can't read the processor's compressed messages.** Scripts that talk to the processor should use the `ws` package.
- **A batch with no devices is never sent** by these hooks. If a page's map can be legitimately empty, make sure its gate doesn't wait for a reply that won't come.
- **Maps must be memoized.** An unmemoized map re-runs the effect every render; the dedupe keeps that from sending repeats, but it's wasted work.

## Worked example: EssentialsDemoReactApp

The demo app needs steps 1 and 2 and a small change to its tech sync. It already batches its syncs and has no per-device request loops, so step 3 has nothing to convert. State as of branch `feature/initial-development`:

| What | Where | Today | Change |
| --- | --- | --- | --- |
| Library | `package.json` | `1.25.0-feat-essentials-v3.27` | Pin `1.25.0-feat-essentials-v3.30` (step 1) |
| Boot sync | `src/hooks/useInitialDeviceSync.ts`, called from `RoomBusiness.tsx` | `sendMessage('/system/batchDeviceFullStatus', { devices })` | Send through `useSendBatchStatusRequest` (step 2) |
| Tech sync | `src/hooks/useTechDeviceSync.ts`, called from `TechLayout.tsx` | Same direct `sendMessage` | Send through `useSendUnrequestedBatchStatus`, so devices the boot sync already requested aren't asked for again |
| Render gate | `RoomBusiness.tsx` with `useHasCompletedInitialSync` | Shows `SyncingPage` until `initialSyncComplete`, then latches | No change. Every route, `/tech` included, renders behind it, so the two batches never overlap |
| Per-device requests | step 3 grep | None found | None |

Both hooks currently ask every device for `/fullStatus` (a `FULL_STATUS` constant). While you're in them, check what each device's UI actually reads and switch to the narrower per-messenger paths where they cover it (step 2), for example `/powerStatus` and `/inputStatus` for the displays, and `/commStatus` with `/deviceInfo` for the system status list.

The edit in `useInitialDeviceSync.ts`:

```ts
// before
const { sendMessage } = useWebsocketContext();
…
sendMessage('/system/batchDeviceFullStatus', { devices });

// after
const sendBatchStatusRequest = useSendBatchStatusRequest();
…
sendBatchStatusRequest(devices);
```

`useTechDeviceSync.ts` changes the same way with `useSendUnrequestedBatchStatus()`. Keep its `techDevicesSynced` flag: it records that the tech pages have asked, even when every device was already covered and nothing was sent.

Then run the verification checklist. The demo processor needs Essentials `v3.0.0-rc.12` or later for the aggregated reply; on an older build the app behaves exactly as it does today.

## Instructions for coding agents

If you are a coding agent asked to apply these improvements to an app, follow the steps above in order and use the library's hooks; do not copy their source into the app. Before editing, read the app's current sync code (`grep -rn batchDeviceFullStatus src` and the step 3 grep) and list what you will change. Finish with the verification checklist, and say which items you could not check without hardware.

To make this discoverable from the app itself, add this to the app's `CLAUDE.md`:

```markdown
## Mobile Control sync performance

This app syncs device state with the batch hooks from `@pepperdash/mobile-control-react-app-core`
(`useSendBatchStatusRequest`, `useDeviceStatusSync`). When adding or changing code that requests
device state, use those hooks instead of sending `/device/<key>/fullStatus` per device, and request the
narrowest status paths the UI needs. Guide:
https://github.com/PepperDash/mobile-control-react-app-core/blob/feat/essentials-v3/docs/sync-performance-app-dev.md
```
