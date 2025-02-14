# Power Control Message Flow Documentation

This document outlines the complete flow of power control messages in the Mobile Control application, from React component to API and back.

## Overview

The power control system uses a WebSocket-based communication protocol to send commands and receive state updates between the client application and the control system.

## Message Flow

### 1. React Component Layer

#### Component Usage
```typescript
function MyDeviceControl({ deviceKey }: { deviceKey: string }) {
  // Hook provides power control functions
  const { powerOn, powerOff, powerToggle } = useIHasPowerControl(deviceKey);
  
  return (
    <button onClick={powerToggle}>
      Toggle Power
    </button>
  );
}
```

#### Hook Implementation (`useIHasPowerControl`)
```typescript
function useIHasPowerControl(key: string): IHasPowerWithFeedbackProps {
  const { sendMessage } = useWebsocketContext();

  const powerOn = () => {
    sendMessage(`/device/${key}/powerOn`, null);
  };

  const powerOff = () => {
    sendMessage(`/device/${key}/powerOff`, null);
  };

  const powerToggle = () => {
    sendMessage(`/device/${key}/powerToggle`, null);
  };

  return { powerOn, powerOff, powerToggle };
}
```

### 2. WebSocket Layer

#### WebSocket Provider
The `WebsocketProvider` component manages the WebSocket connection and provides the messaging context to the application.

```typescript
const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const clientRef = useRef<WebSocket | null>(null);
  
  // Connection setup
  const joinWebsocket = async () => {
    const wsPath = appConfig.apiPath.replace("http", "ws");
    const url = `${wsPath}/ui/join/${token}`;
    const newWs = new WebSocket(url);
    clientRef.current = newWs;
    
    // Handle connection events...
  };

  // Message handling
  const sendMessage = (type: string, content: unknown) => {
    if (clientRef.current?.readyState === WebSocket.OPEN) {
      clientRef.current.send(JSON.stringify({ type, content }));
    }
  };
  
  // ... other implementation details
};
```

### 3. Message Format

#### Power Control Commands (Client to Server)
```typescript
// Power On
{
  type: "/device/{deviceKey}/powerOn",
  content: null
}

// Power Off
{
  type: "/device/{deviceKey}/powerOff",
  content: null
}

// Power Toggle
{
  type: "/device/{deviceKey}/powerToggle",
  content: null
}
```

#### State Updates (Server to Client)
```typescript
{
  type: "deviceState",
  content: {
    key: "device1",
    messageType: "state",
    eventType: "update",
    interfaces: ["IHasPowerControl"],
    state: {
      isOn: true,
      isWarmingUp: false,
      isCoolingDown: false
    }
  }
}
```

### 4. State Management

The application uses Redux to manage device state:

```typescript
// Device state slice
interface DeviceState {
  key: string;
  isOn?: boolean;
  isWarmingUp?: boolean;
  isCoolingDown?: boolean;
}

// Redux Actions
const deviceActions = {
  updateDeviceState: createAction<DeviceState>('device/updateState'),
  clearDevices: createAction('device/clear'),
  setError: createAction<string>('device/setError')
};

// Redux Selectors
const selectDevicePowerState = (state: RootState, deviceKey: string) => 
  state.devices[deviceKey]?.isOn;

const selectDeviceWarmingState = (state: RootState, deviceKey: string) => ({
  isWarmingUp: state.devices[deviceKey]?.isWarmingUp,
  isCoolingDown: state.devices[deviceKey]?.isCoolingDown
});

// State update action
const deviceStateReceived = (state: DeviceState, action: PayloadAction<DeviceState>) => {
  const { key, ...updates } = action.payload;
  state.devices[key] = {
    ...state.devices[key],
    ...updates
  };
};
```

### 5. Room-Level Power Control

The system also supports room-level power control, which can affect multiple devices:

```typescript
// Room power control hook
function useRoomPowerControl(roomKey: string) {
  const { sendMessage } = useWebsocketContext();

  const roomPowerOn = () => {
    sendMessage(`/room/${roomKey}/powerOn`, null);
  };

  const roomPowerOff = () => {
    sendMessage(`/room/${roomKey}/powerOff`, null);
  };

  return { roomPowerOn, roomPowerOff };
}

// Room state update format
{
  type: "roomState",
  content: {
    key: "room1",
    messageType: "state",
    eventType: "update",
    state: {
      isOn: true,
      devices: {
        "display1": { isOn: true },
        "audioSystem": { isOn: true }
      }
    }
  }
}
```

### 6. Authentication Flow

The WebSocket connection requires authentication:

1. **Initial Token Acquisition**:
```typescript
async function getRoomData(apiPath: string): Promise<boolean> {
  try {
    const response = await axios.get(`${apiPath}/auth/token`);
    setToken(response.data.token);
    return true;
  } catch (error) {
    handleAuthError(error);
    return false;
  }
}
```

2. **Token Usage**:
- Token is included in WebSocket URL during connection
- Server validates token for each message
- Token refresh mechanism handles expiration

3. **Error Handling**:
```typescript
// WebSocket close event codes
const WS_ERROR_CODES = {
  NORMAL_CLOSURE: 1000,
  TOKEN_EXPIRED: 4000,
  PROCESSOR_DISCONNECTED: 4001,
  INVALID_MESSAGE: 4002,
  AUTHORIZATION_FAILED: 4003
};

// Error handling in WebSocket provider
newWs.onclose = (closeEvent: CloseEvent): void => {
  switch (closeEvent.code) {
    case WS_ERROR_CODES.TOKEN_EXPIRED:
      store.dispatch(uiActions.setErrorMessage("Session expired. Please reconnect."));
      store.dispatch(runtimeConfigActions.setUserCode({ userCode: '', qrUrl: ''}));
      break;
    case WS_ERROR_CODES.PROCESSOR_DISCONNECTED:
      store.dispatch(uiActions.setErrorMessage("Processor disconnected. Click Reconnect"));
      break;
    case WS_ERROR_CODES.AUTHORIZATION_FAILED:
      store.dispatch(uiActions.setErrorMessage("Authorization failed. Please log in again."));
      break;
    // ... handle other cases
  }
};
```

## Error Handling

1. **Connection Errors**
   - WebSocket connection failures trigger reconnection attempts
   - UI displays connection status and error messages

2. **Command Errors**
   - Failed commands may trigger error events from server
   - Device state updates reflect command success/failure

## Sequence Diagram

```
React Component → useIHasPowerControl → WebsocketContext → WebSocket
     ↑                                                         ↓
     └─────────── Redux Store ← State Update ← Control System ─┘
```

## Implementation Notes

1. **Security**
   - WebSocket connections require authentication token
   - Device commands are validated server-side

2. **Performance**
   - Uses WebSocket for real-time bidirectional communication
   - State updates are immediate and efficient

3. **Reliability**
   - Automatic reconnection on connection loss
   - Command queuing during disconnection (if implemented)

## Error States and Recovery

### WebSocket Error Codes
| Code | Description | Recovery Action |
|------|-------------|----------------|
| 1000 | Normal closure | Automatic reconnect |
| 4000 | Token expired | Request new token |
| 4001 | Processor disconnected | Manual reconnect required |
| 4002 | Invalid message format | Check message format |
| 4003 | Authorization failed | Re-authenticate |
| 4004 | Rate limit exceeded | Implement backoff |

### Device Command Errors
| Error | Description | Recovery |
|-------|-------------|----------|
| DEVICE_BUSY | Device processing another command | Retry after delay |
| WARMING_UP | Device is warming up | Wait for ready state |
| COOLING_DOWN | Device is cooling down | Wait for ready state |
| COMMAND_TIMEOUT | Device did not respond | Check connection |

### Recovery Strategies
1. **Connection Loss**
   ```typescript
   let reconnectAttempts = 0;
   const MAX_RECONNECT_ATTEMPTS = 5;
   
   function handleDisconnect() {
     if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
       setTimeout(() => {
         reconnectAttempts++;
         joinWebsocket();
       }, getBackoffDelay(reconnectAttempts));
     } else {
       store.dispatch(uiActions.setErrorMessage("Unable to reconnect. Please refresh."));
     }
   }
   ```

2. **Command Retry**
   ```typescript
   async function sendCommandWithRetry(type: string, content: unknown, maxRetries = 3) {
     for (let i = 0; i < maxRetries; i++) {
       try {
         await sendMessage(type, content);
         return true;
       } catch (error) {
         if (error.code === 'DEVICE_BUSY' && i < maxRetries - 1) {
           await delay(1000 * Math.pow(2, i)); // Exponential backoff
           continue;
         }
         throw error;
       }
     }
     return false;
   }
   ```

## Common Issues and Solutions

1. **Device Unresponsive**
   - Check device connection status
   - Verify command permissions
   - Check for warming up/cooling down states

2. **State Inconsistency**
   - Force refresh device state
   - Check for missed state updates
   - Verify WebSocket connection health

## Best Practices

1. Always check device state before sending commands
2. Handle edge cases (warming up, cooling down)
3. Implement appropriate error handling
4. Use the provided hooks rather than direct WebSocket access
5. Monitor WebSocket connection status
