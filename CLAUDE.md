# CLAUDE.md

Guidance for coding agents working in this repository or helping an app that uses it.

## What this repo is

`@pepperdash/mobile-control-react-app-core`: the React hooks, TypeScript types, Redux store and WebSocket
middleware that React apps use to talk to PepperDash Essentials Mobile Control. See `README.md` for how
Mobile Control works and how the library is meant to be used.

## Commands

- `npm run build` runs `tsc && vite build`. Run it before committing; it type-checks.
- `npm run lint` runs ESLint with `--max-warnings 0`.
- There is no test runner configured.

## Layout

- `src/lib/store/`: Redux slices, selectors, hooks and the WebSocket middleware
  (`store/middleware/websocketMiddleware.ts`).
- `src/lib/shared/hooks/`: the React hooks apps import. Everything public is re-exported through the
  `index.ts` files up to `src/lib/index.ts`; a hook that isn't exported there isn't in the package.
- `src/lib/utils/`: the WebSocket context, `useWebsocketContext`, and the perf timing API (`perf.ts`).
- `docs/`: documentation. `*-app-dev.md` files are for developers of apps that use the library;
  `*-contributors.md` files are for people working on the library itself.

Only `dist` is published to npm (`"files": ["dist"]`), so `docs/` is read on GitHub, not from
`node_modules`.

## Documentation to read first

| If the task is... | Read |
| --- | --- |
| Making an app request device state faster, or converting per-device `fullStatus` requests to batches | [`docs/sync-performance-app-dev.md`](docs/sync-performance-app-dev.md) |
| Reading or merging device and room state | [`docs/redux-state-app-dev.md`](docs/redux-state-app-dev.md) |
| Adding or using a hook for a device interface | [`docs/interface-hooks-app-dev.md`](docs/interface-hooks-app-dev.md), [`docs/custom-interface-hook-how-to.md`](docs/custom-interface-hook-how-to.md) |
| Action paths and how messages are routed | [`docs/action-paths-app-dev.md`](docs/action-paths-app-dev.md) |

## Rules

- **Device state requests:** to request device state for a page or modal, use `useDeviceStatusSync`; for a
  boot or other full sync, use `useSendBatchStatusRequest`. Both are in
  `src/lib/shared/hooks/useBatchDeviceStatus.ts`. Do not add a per-device
  `sendMessage('/device/<key>/fullStatus', ...)` loop, and do not copy those hooks into an app. Request the
  narrowest status paths the UI needs (`/powerStatus`, `/volumeStatus`, and so on) rather than defaulting to
  `/fullStatus`.
- **Batch requests are tracked:** the batch hooks remember which device and path pairs a connection has
  already requested. A new way of sending `/system/batchDeviceFullStatus` that bypasses them will repeat
  requests the store already has.
- **Updating an app:** follow [`docs/sync-performance-app-dev.md`](docs/sync-performance-app-dev.md) in order,
  and finish with its verification checklist. Say which checklist items you could not check without hardware.
- **Changing the hooks or the middleware:** update `docs/sync-performance-app-dev.md` in the same commit if
  the behaviour or the API it describes changes.
- **Versions:** the guide names the minimum library and Essentials versions. If you publish a release that
  changes what an app needs, update those.
