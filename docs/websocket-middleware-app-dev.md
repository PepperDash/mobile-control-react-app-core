# WebSocket Middleware — App Developer Guide

**Relates to:** [Issue #93](https://github.com/PepperDash/mobile-control-react-app-core/issues/93) · [Document Mobile Control data flow #89](https://github.com/PepperDash/mobile-control-react-app-core/issues/89)

The library owns the WebSocket connection to [PepperDash Essentials](https://github.com/PepperDash/Essentials) for you. `MobileControlProvider` opens the connection on mount, keeps it alive, and reconnects automatically when it drops. As an app developer you rarely touch the WebSocket directly — you read connection status with a hook, send messages with `useWebsocketContext()`, and let [interface hooks](./interface-hooks-app-dev.md) and the [Redux store](./redux-state-app-dev.md) handle the rest.

## Connection Status

```tsx
import { useWsIsConnected } from '@pepperdash/mobile-control-react-app-core';

const isConnected = useWsIsConnected();
```

`isConnected` reflects the live WebSocket state. While disconnected, `WebsocketProvider` (mounted inside `MobileControlProvider`) renders a built-in `DisconnectedMessage` in place of your app's children — you don't need to build your own "reconnecting" screen for the common case.

## Sending Messages

Use `useWebsocketContext()` for anything the built-in [interface hooks](./interface-hooks-app-dev.md) don't already cover — for example, a custom [action path](./action-paths-app-dev.md) your Essentials plugin defines.

```tsx
import { useWebsocketContext } from '@pepperdash/mobile-control-react-app-core';

const { sendMessage, sendSimpleMessage } = useWebsocketContext();

// Full control over the message content
sendMessage('/device/Display1/powerOn', null);

// Shorthand for a single boolean/number/string value, sent as { value }
sendSimpleMessage('/device/Display1/volume', 50);
```

Messages sent while disconnected are dropped (logged as a warning) rather than queued — check `isConnected` before sending if the action matters.

## Listening for Events

Essentials pushes one-off events (as opposed to persistent [device/room state](./device-state-feedback-app-dev.md)) as `/event/*` messages — button presses forwarded from a panel, momentary notifications, etc. Register a handler for the types you care about:

```tsx
import { useEffect, useId } from 'react';
import { useWebsocketContext } from '@pepperdash/mobile-control-react-app-core';

const { addEventHandler, removeEventHandler } = useWebsocketContext();
const handlerKey = useId();

useEffect(() => {
  const handler = (message) => console.log('Event received', message);
  addEventHandler('/event/someEvent', handlerKey, handler);
  return () => removeEventHandler('/event/someEvent', handlerKey);
}, [addEventHandler, handlerKey, removeEventHandler]);
```

The `key` argument namespaces your handler among others registered for the same event type — use something stable and unique per registration (e.g. a component instance id) so `removeEventHandler` cleans up the right one.

## Reconnection Behavior

You don't need to implement retry logic yourself:

- **Automatic reconnection** — most disconnects (network blips, server restarts, normal closure) trigger a retry loop that attempts to reconnect every 5 seconds until it succeeds. `isConnected` flips back to `true` on success and your app's children re-render automatically.
- **Manual reconnection required** — a few server-driven scenarios stop the automatic loop and require the user to take action:
  - The user's join code changed (they need to re-enter it).
  - The room combination changed (they need to re-join).
  - The Essentials server is not running on processor hardware and appears to have shut down intentionally.

In the manual cases, `useWebsocketContext()` exposes a `reconnect()` function — the built-in `DisconnectedMessage` already wires this to a "Reconnect" button, so most apps don't need to call it directly.

```tsx
const { reconnect } = useWebsocketContext();
reconnect();
```

> [!NOTE]
> `reconnect()` does not simply reopen the socket — it navigates the browser to the Mobile Control gateway URL for the current room, which restarts the whole join flow. It is a page-level action, not something to call speculatively inside render logic.

## What You Don't Need to Manage

- **Connecting on startup** — handled by `MobileControlProvider` / `WebsocketProvider`.
- **Re-requesting room status after a reconnect** — once Essentials sends the room key for the (re-)joined session, the middleware requests that room's status automatically.
- **Routing incoming messages to state** — `/room/*` and `/device/*` messages are dispatched into the [Redux store](./redux-state-app-dev.md) automatically; read them with selector hooks, not by inspecting raw messages.

For how any of this works internally — close-code handling, the event handler registry, message routing — see the [WebSocket Middleware — Contributor Reference](./websocket-middleware-contributors.md).
