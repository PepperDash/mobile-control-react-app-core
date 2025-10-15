# WebSocket Automatic Reconnection Implementation

## Overview

This document describes the automatic reconnection logic implemented in the WebSocket middleware to handle connection drops gracefully, with special support for servers running on processor hardware.

## Reconnection Behavior

### Close Code Handling

The WebSocket middleware uses a simple approach: **auto-reconnect for everything except custom application codes**.

| Close Code               | Scenario                 | Behavior                                   |
| ------------------------ | ------------------------ | ------------------------------------------ |
| **4100**                 | Client-initiated cleanup | No reconnection, clean shutdown            |
| **4000**                 | User code changed        | No reconnection, show error, clear state   |
| **4002**                 | Room combination changed | No reconnection, manual reconnect required |
| **4001** (not processor) | Processor shutdown       | No reconnection, manual reconnect required |
| **All other codes**      | Any disconnect/error     | **Auto-reconnect after 5s**                |

**This includes:**

- **1000** (Normal Closure) - Typical processor hardware disconnect
- **4001** on processor hardware - Connection loss
- Any network errors, unexpected disconnects, etc.

**Simple rule**: If it's not one of the three custom codes (4000, 4002, 4100) or 4001 on non-processor hardware, it will auto-reconnect.

### Processor Hardware Mode

The middleware checks the `serverIsRunningOnProcessorHardware` flag from Redux state to determine reconnection behavior:

#### Default Behavior: Auto-Reconnect

**For most disconnects** (code 1000, network errors, unexpected closes, etc.):

1. Show user-friendly message: "Connection lost. Attempting to reconnect..."
2. Clear room/device state but preserve configuration
3. Wait 5 seconds, then attempt reconnection
4. **Repeat continuously every 5 seconds until successful**
5. Once connected, stop the reconnection loop

**Continuous Reconnection Loop**:

The middleware maintains a reconnection timer that:

- Starts when a reconnectable disconnect occurs
- Attempts to reconnect every 5 seconds
- Continues indefinitely until connection succeeds
- Is automatically stopped when connection is established
- Is also stopped for terminal errors (codes 4000, 4002, 4100, or 4001 on non-processor hardware)

**Code**:

```typescript
const startReconnectionLoop = (dispatch: Dispatch) => {
  if (state.reconnectTimer) {
    clearTimeout(state.reconnectTimer);
    state.reconnectTimer = null;
  }

  console.log('WebSocket middleware: Starting reconnection loop...');

  state.reconnectTimer = setTimeout(() => {
    state.waitingToReconnect = false;
    state.reconnectTimer = null;
    console.log('WebSocket middleware: Attempting automatic reconnection...');
    dispatch(wsConnect());
  }, 5000);
};

// On disconnect:
console.log('WebSocket middleware: Clearing state on disconnect');
dispatch(
  uiActions.setErrorMessage('Connection lost. Attempting to reconnect...')
);
dispatch(runtimeConfigActions.setWebsocketIsConnected(false));
dispatch(devicesActions.clearDevices());
dispatch(roomsActions.clearRooms());
dispatch(uiActions.clearAllModals());
dispatch(uiActions.clearSyncState());

// Start continuous reconnection attempts
startReconnectionLoop(dispatch);

// On successful connection:
newWs.onopen = (ev: Event) => {
  console.log('WebSocket middleware: Connected');
  state.waitingToReconnect = false;
  stopReconnectionLoop(); // Stop trying to reconnect
  dispatch(runtimeConfigActions.setWebsocketIsConnected(true));
};
```

#### Special Case: Code 4001 on Non-Processor Hardware

**Scenario**: Server is on a computer/VM that might be shut down

- Disconnect code 4001 likely means server is intentionally stopping
- Auto-reconnection would be futile
- User should manually reconnect when server restarts

**Behavior on disconnect (code 4001 only)**:

1. Show error message: "Processor has disconnected. Click Reconnect"
2. Clear all state (full cleanup)
3. Wait for manual user action
4. **No automatic reconnection**

**Code**:

```typescript
// Code 4001 on non-processor hardware should not auto-reconnect
if (closeEvent.code === 4001 && !serverIsRunningOnProcessorHardware) {
  console.log(
    'WebSocket middleware: Processor disconnected (not on processor hardware)'
  );
  dispatch(
    uiActions.setErrorMessage('Processor has disconnected. Click Reconnect')
  );
  clearStateDataOnDisconnect(dispatch);
  return; // Early exit - no auto-reconnect
}
```

**Note**: Code 4001 on processor hardware WILL auto-reconnect (treated like any other disconnect).

#### When Server is NOT on Processor Hardware (`serverIsRunningOnProcessorHardware: false`)

**Scenario**: Server is on a computer/VM that might be shut down

- Disconnect code 4001 likely means server is stopping
- Auto-reconnection would be futile
- User should manually reconnect when server restarts

**Behavior on disconnect (code 1000 or 4001)**:

1. Show error message: "Processor has disconnected. Click Reconnect"
2. Clear all state (full cleanup)
3. Wait for manual user action
4. **No automatic reconnection**

**Code**:

```typescript
// Handle code 1000 (Normal Closure)
if (closeEvent.code === 1000) {
  if (!serverIsRunningOnProcessorHardware) {
    console.log(
      'WebSocket middleware: Normal closure (not on processor hardware)'
    );
    dispatch(
      uiActions.setErrorMessage('Processor has disconnected. Click Reconnect')
    );
    clearStateDataOnDisconnect(dispatch);
    return;
  }
}

// Also handle 4001
if (closeEvent.code === 4001 && !serverIsRunningOnProcessorHardware) {
  console.log(
    'WebSocket middleware: Processor disconnected (not on processor hardware)'
  );
  dispatch(
    uiActions.setErrorMessage('Processor has disconnected. Click Reconnect')
  );
  clearStateDataOnDisconnect(dispatch);
  return; // Early exit - no auto-reconnect
}
```

### Unexpected Disconnects

For any other close codes (network issues, server restarts, etc.):

- **Automatic reconnection after 5 seconds**
- Applies regardless of `serverIsRunningOnProcessorHardware` value
- Handles edge cases like network blips, router restarts, etc.

**Code**:

```typescript
else if (closeEvent.code !== 4001 && closeEvent.code !== 4002) {
  console.log(
    'WebSocket middleware: Attempting automatic reconnection after unexpected disconnect...'
  );
  dispatch(wsReconnect());
}
```

## Implementation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    WebSocket Disconnects                         │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
                   Check Close Code
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
    Code 4100           Code 4000           Code 4001
  (Client close)    (User code change)   (Processor disconnect)
        │                   │                   │
        ▼                   ▼                   ▼
  Clean Shutdown     Show Error        Check Hardware Flag
   No Reconnect      No Reconnect              │
                                    ┌───────────┴──────────┐
                                    │                      │
                                    ▼                      ▼
                          Processor = true      Processor = false
                                    │                      │
                                    ▼                      ▼
                          "Connection lost..."    "Processor disconnected"
                          Clear state             Clear state
                          Wait 5s                 No Reconnect
                          ▼                       Manual action required
                    Auto-reconnect
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
        ▼                                   ▼
    Success: Connected            Fail: Try again in 5s
        │                                   │
        ▼                                   └──────┐
  Request room status                              │
  Back to normal                                   │
                                                   └──> Loop until success
```

## Connection Lock Mechanism

The middleware uses a `waitingToReconnect` flag to prevent concurrent reconnection attempts:

```typescript
if (state.client || state.waitingToReconnect) {
  console.log('Already connected or waiting to reconnect');
  return;
}

state.waitingToReconnect = true;

try {
  // Connection logic...
  await connect(store.dispatch, store.getState);
  state.waitingToReconnect = false;
} catch (error) {
  console.error('Connection failed:', error);
  state.waitingToReconnect = false;
}

// On disconnect - clear client reference immediately
newWs.onclose = (closeEvent: CloseEvent): void => {
  console.log('WebSocket middleware: Disconnected');

  // Critical: Clear the client reference so reconnection can proceed
  state.client = null;

  // ... handle reconnection logic
};
```

This ensures:

- Only one connection attempt at a time
- **Client reference is cleared immediately on disconnect**
- Prevents "already connected" errors on reconnection
- No race conditions
- Clean state management

## User Experience

### For All Users

✅ **Continuous automatic reconnection**

- Connection drops are handled automatically
- **Attempts reconnection every 5 seconds continuously**
- No limit on retry attempts - keeps trying until successful
- User sees "Connection lost. Attempting to reconnect..."
- App reconnects without user intervention
- Room status automatically requested on reconnect
- Minimal disruption to workflow

### Special Behavior for Non-Processor Hardware (Code 4001)

✅ **Clear indication when server is intentionally stopped**

- User sees "Processor has disconnected. Click Reconnect"
- No continuous retry attempts (prevents log spam)
- User knows to check server status
- Manual reconnect when ready

## Configuration

The `serverIsRunningOnProcessorHardware` flag is set during initialization from the `/appversion` endpoint:

```typescript
const { data: versionInfo } = await httpClient.get<VersionInfo>(
  `${config.apiPath}/appversion`
);
dispatch(
  runtimeConfigActions.setServerIsRunningOnProcessorHardware(
    versionInfo.serverIsRunningOnProcessorHardware
  )
);
```

This is stored in Redux state at `runtimeConfig.serverIsRunningOnProcessorHardware`.

## Testing Scenarios

### Test 1: Normal Processor Disconnect (Code 1000)

1. Connect to WebSocket
2. Stop processor connection (should send close code 1000)
3. **Expected**: Shows "Connection lost. Attempting to reconnect..."
4. **Expected**: Auto-reconnects after 5s
5. **Expected**: Room status automatically requested on reconnect

### Test 2: Network Drop

1. Connect to WebSocket
2. Simulate network drop (disconnect WiFi for 3 seconds)
3. **Expected**: Auto-reconnects after 5s
4. **Expected**: Shows "Connection lost..."
5. **Expected**: Multiple retry attempts until network is back

### Test 3: Code 4001 on Processor Hardware

1. Set `serverIsRunningOnProcessorHardware: true`
2. Connect to WebSocket
3. Trigger disconnect with close code 4001
4. **Expected**: Auto-reconnects after 5s
5. **Expected**: Shows "Connection lost. Attempting to reconnect..."

### Test 4: Code 4001 on Non-Processor Hardware

1. Set `serverIsRunningOnProcessorHardware: false`
2. Connect to WebSocket
3. Stop server with close code 4001
4. **Expected**: Shows "Processor has disconnected. Click Reconnect"
5. **Expected**: No auto-reconnect attempts
6. **Expected**: Manual reconnect button works when server is back

### Test 5: User Code Changed (Code 4000)

1. Connect to WebSocket
2. Trigger user code change (code 4000)
3. **Expected**: Shows "User code changed. Click reconnect to enter the new code"
4. **Expected**: No auto-reconnect attempts
5. **Expected**: State is cleared

### Test 6: Room Combination Changed (Code 4002)

1. Connect to WebSocket
2. Trigger room combination change (code 4002)
3. **Expected**: Shows "Room combination changed. Click Reconnect to re-join the room"
4. **Expected**: No auto-reconnect attempts
5. **Expected**: State is cleared

### Test 7: Continuous Reconnection Attempts

1. Connect to WebSocket
2. Stop server completely
3. **Expected**: Shows "Connection lost. Attempting to reconnect..."
4. **Expected**: Attempts reconnection every 5 seconds continuously
5. Restart server after 30 seconds
6. **Expected**: Successfully reconnects on next attempt
7. **Expected**: Reconnection loop stops after successful connection

### Test 8: Multiple Rapid Disconnects

1. Connect to WebSocket
2. Disconnect and reconnect rapidly
3. **Expected**: Connection lock prevents multiple simultaneous attempts
4. **Expected**: Reconnection timer is reset properly on each disconnect
5. **Expected**: No race conditions or duplicate connections

## Benefits

1. ✅ **Continuous reconnection** - Never gives up until connection succeeds
2. ✅ **Better UX for all deployments** - Seamless recovery from any network issue
3. ✅ **Clear feedback for terminal errors** - User knows when manual action is needed
4. ✅ **Handles long outages gracefully** - Keeps trying every 5 seconds indefinitely
5. ✅ **Prevents connection spam** - Lock mechanism prevents race conditions
6. ✅ **Automatic room status refresh** - State syncs on reconnection
7. ✅ **Production-ready error handling** - Different strategies for different scenarios
8. ✅ **Smart timer management** - Stops reconnection loop on success or terminal errors

## Related Files

- `src/lib/store/middleware/websocketMiddleware.ts` - Main implementation
- `src/lib/store/runtimeConfig/runtimeConfig.slice.ts` - State management
- `AUTOMATIC_ROOM_STATUS_IMPLEMENTATION.md` - Room status request documentation
- `WEBSOCKET_REFACTOR_SUMMARY.md` - Overall WebSocket refactor documentation

## Future Enhancements

Possible improvements for future iterations:

1. **Exponential backoff** - Increase delay between retries (5s, 10s, 20s...) to reduce load during extended outages
2. **Max retry limit with notification** - After N attempts, ask user if they want to continue trying
3. **Network status detection** - Use Navigator.onLine API to detect network availability
4. **Ping/Pong heartbeat** - Detect dead connections proactively
5. **Connection quality indicators** - Show signal strength or latency to user
6. **Offline queue** - Buffer messages to send when reconnected
