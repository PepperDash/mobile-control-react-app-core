# Automatic Room Status Request Implementation

## Overview
This document describes the implementation of automatic room status requests in the WebSocket middleware. This eliminates the need for component-based logic to trigger room status requests and centralizes all WebSocket behavior in the Redux middleware layer.

## Implementation Approach: State Change Listeners

We chose **Approach 2** (State Change Listeners) over the component-based approach for the following reasons:
- ✅ Centralizes all WebSocket logic in middleware
- ✅ Eliminates dependency on React component lifecycle
- ✅ More testable (no need to test React hooks)
- ✅ Easier to maintain (single source of truth)
- ✅ More predictable (Redux action flow is explicit)

## Changes Made

### 1. Added `requestRoomStatus()` Helper Function
**Location**: `src/lib/store/middleware/websocketMiddleware.ts` (line ~190)

```typescript
const requestRoomStatus = (getState: () => LocalRootState) => {
  const state = getState();
  const roomKey = state.runtimeConfig.currentRoomKey;
  const clientId = state.runtimeConfig.roomData?.clientId;
  const isConnected = state.runtimeConfig.websocket.isConnected;

  if (!roomKey || !clientId || !isConnected) {
    console.log(
      "[WebSocket Middleware] Cannot request room status - missing requirements:",
      { roomKey, clientId, isConnected }
    );
    return;
  }

  console.log(
    `[WebSocket Middleware] Requesting status for room: ${roomKey} with clientId: ${clientId}`
  );

  sendMessage(`/room/${roomKey}/status`, null, getState);
};
```

**Purpose**: 
- Validates that all required state is available (roomKey, clientId, isConnected)
- Sends a WebSocket message to request room status
- Includes logging for debugging

### 2. Added State Change Listeners in Middleware

**Location**: `src/lib/store/middleware/websocketMiddleware.ts` (in the default case of the switch statement, line ~590)

The middleware now listens for three Redux actions that should trigger room status requests:

#### a) `setWebsocketIsConnected` - Connection Established
```typescript
if (action.type === runtimeConfigActions.setWebsocketIsConnected.type) {
  const isConnected = (action as AnyAction).payload;
  if (isConnected === true) {
    console.log(
      "[WebSocket Middleware] Connection established, requesting room status..."
    );
    setTimeout(() => requestRoomStatus(store.getState), 100);
  }
}
```
**Triggers when**: WebSocket connection is successfully established
**Why needed**: Initial room status request after connecting

#### b) `setRoomData` - Room Data/ClientId Available
```typescript
else if (action.type === runtimeConfigActions.setRoomData.type) {
  const state = store.getState() as LocalRootState;
  const roomData = (action as AnyAction).payload as RoomData | undefined;
  if (state.runtimeConfig.websocket.isConnected && roomData?.clientId) {
    console.log(
      "[WebSocket Middleware] Room data received, requesting room status..."
    );
    setTimeout(() => requestRoomStatus(store.getState), 100);
  }
}
```
**Triggers when**: Room data is received from the `/ui/joinroom` API response (includes clientId)
**Why needed**: ClientId is required for room status requests; this ensures we have it before requesting

#### c) `setCurrentRoomKey` - Room Changed
```typescript
else if (action.type === runtimeConfigActions.setCurrentRoomKey.type) {
  const roomKey = (action as AnyAction).payload;
  if (roomKey) {
    console.log(
      "[WebSocket Middleware] Room changed to:",
      roomKey,
      ", requesting room status..."
    );
    setTimeout(() => requestRoomStatus(store.getState), 100);
  }
}
```
**Triggers when**: User navigates to a different room
**Why needed**: Each room needs its status requested separately

## Technical Details

### Why `setTimeout` with 100ms delay?
The 100ms delay ensures that:
1. All Redux state updates have completed
2. The WebSocket connection is fully ready
3. Any pending actions in the queue are processed first

This prevents race conditions where we might try to send a message before the connection is fully established or before all required state is set.

### Type Safety
We use `AnyAction` casting for the Redux action payloads since these actions come from slice reducers (not our custom WebSocket actions). The middleware's switch statement uses type narrowing to safely access the payload.

### State Path Correction
The WebSocket connection state is accessed via `state.runtimeConfig.websocket.isConnected` (not `state.runtimeConfig.websocketIsConnected`).

## Flow Diagram

```
App Startup
    │
    ├─> User navigates to app with token
    │
    ├─> WebsocketProvider mounts
    │       │
    │       └─> dispatch(wsConnect())
    │               │
    │               ├─> Middleware: initialize() - fetch app config
    │               │
    │               ├─> Middleware: getRoomData() - call /ui/joinroom API
    │               │       │
    │               │       └─> dispatch(setRoomData(roomData))
    │               │               │
    │               │               └─> Listener: setRoomData detected
    │               │                       │
    │               │                       └─> requestRoomStatus() [if connected]
    │               │
    │               └─> Middleware: connect() - establish WebSocket
    │                       │
    │                       └─> dispatch(setWebsocketIsConnected(true))
    │                               │
    │                               └─> Listener: setWebsocketIsConnected detected
    │                                       │
    │                                       └─> requestRoomStatus()
    │
    └─> User navigates to different room
            │
            └─> dispatch(setCurrentRoomKey(newRoomKey))
                    │
                    └─> Listener: setCurrentRoomKey detected
                            │
                            └─> requestRoomStatus()
```

## Benefits

1. **Single Source of Truth**: All WebSocket logic is in the middleware
2. **Testability**: Can test middleware independently without React components
3. **Maintainability**: Changes to room status request logic only need to be made in one place
4. **Predictability**: Redux action flow is explicit and easy to trace
5. **Separation of Concerns**: WebsocketProvider component is purely a Context wrapper

## Optional Next Steps

### Remove Component-Based useEffect (Optional)
The `WebsocketProvider.tsx` still has a useEffect that requests room status:

```typescript
useEffect(() => {
  if (isConnected && roomKey && clientId) {
    console.log('Requesting room status');
    sendSimpleMessage(`/room/${roomKey}/status`);
  }
}, [isConnected, roomKey, clientId, sendSimpleMessage]);
```

This can now be removed since the middleware handles it automatically. However, keeping it provides a fallback mechanism and doesn't cause any issues (the duplicate request is harmless).

**Recommendation**: Remove it for cleaner code, but it's not required.

## Testing Checklist

When testing this implementation, verify:

- [ ] Room status is requested when app starts and connects
- [ ] Room status is requested when room data/clientId becomes available
- [ ] Room status is requested when user navigates to a different room
- [ ] No duplicate room status requests (check network tab)
- [ ] Console logs show the expected flow
- [ ] Room state is updated correctly after status response

## Debug Logging

All console logs include `[WebSocket Middleware]` prefix for easy filtering:

```javascript
// Filter console logs in browser DevTools:
console.log.filter = (msg) => msg.includes('[WebSocket Middleware]');
```

## Related Files

- `src/lib/store/middleware/websocketMiddleware.ts` - Main implementation
- `src/lib/store/runtimeConfig/runtimeConfig.slice.ts` - Actions we listen for
- `src/lib/utils/WebsocketProvider.tsx` - Component that uses the middleware
- `WEBSOCKET_REFACTOR_SUMMARY.md` - Overall WebSocket refactor documentation
