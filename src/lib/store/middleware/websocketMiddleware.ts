import { AnyAction, Dispatch, Middleware } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { AppConfig, Message, RoomData } from '../../types';
import sessionStorageKeys from '../../types/classes/session-storage-keys';
import { RoomState } from '../../types/state/state';
import { DeviceState } from '../../types/state/state/DeviceState';
import { loadValue, saveValue } from '../../utils/joinParamsService';
import { appConfigActions, AppConfigState } from '../appConfig/appConfig.slice';
import { devicesActions } from '../devices/devices.slice';
import { roomsActions } from '../rooms/rooms.slice';
import {
  runtimeConfigActions,
  RuntimeConfigState,
  UserCode,
} from '../runtimeConfig/runtimeConfig.slice';
import { uiActions, UiConfigState } from '../ui/ui.slice';

const httpClient = axios.create();

// Define RootState locally to avoid circular dependency
type LocalRootState = {
  appConfig: AppConfigState;
  runtimeConfig: RuntimeConfigState;
  rooms: Record<string, RoomState>;
  devices: Record<string, DeviceState>;
  ui: UiConfigState;
};

/**
 * WebSocket middleware action types
 */
export const WS_CONNECT = 'websocket/connect';
export const WS_DISCONNECT = 'websocket/disconnect';
export const WS_SEND_MESSAGE = 'websocket/sendMessage';
export const WS_ADD_EVENT_HANDLER = 'websocket/addEventHandler';
export const WS_REMOVE_EVENT_HANDLER = 'websocket/removeEventHandler';
export const WS_RECONNECT = 'websocket/reconnect';

/**
 * WebSocket middleware action creators
 */
export const wsConnect = () => ({ type: WS_CONNECT });
export const wsDisconnect = () => ({ type: WS_DISCONNECT });
export const wsSendMessage = (messageType: string, content: unknown) => ({
  type: WS_SEND_MESSAGE,
  payload: { messageType, content },
});
export const wsAddEventHandler = (
  eventType: string,
  key: string,
  callback: (data: Message) => void
) => ({
  type: WS_ADD_EVENT_HANDLER,
  payload: { eventType, key, callback },
});
export const wsRemoveEventHandler = (eventType: string, key: string) => ({
  type: WS_REMOVE_EVENT_HANDLER,
  payload: { eventType, key },
});
export const wsReconnect = () => ({ type: WS_RECONNECT });

/**
 * WebSocket middleware state
 */
interface WebSocketMiddlewareState {
  client: WebSocket | null;
  token: string | null;
  waitingToReconnect: boolean;
  eventHandlers: Record<string, Record<string, (data: Message) => void>>;
}

/**
 * Creates the WebSocket middleware
 */
export const createWebSocketMiddleware = (): Middleware<
  Record<string, never>,
  LocalRootState
> => {
  const state: WebSocketMiddlewareState = {
    client: null,
    token: null,
    waitingToReconnect: false,
    eventHandlers: {},
  };

  /**
   * Initialize the app configuration
   */
  const initialize = async (dispatch: Dispatch): Promise<boolean> => {
    try {
      const basePath = location.pathname
        .split('/')
        .filter((path) => path.length > 0);

      if (basePath.length >= 5) {
        basePath.length = 5;
      } else {
        basePath.length = 2;
      }

      const baseURL = `/${basePath.join('/')}`;

      // Get the local config and set it in the store
      const configRes = await httpClient.get<AppConfig>(
        '/_local-config/_config.local.json',
        { baseURL }
      );

      if (configRes.status === 200 && configRes.data) {
        const apiPath = configRes.data.apiPath;
        dispatch(appConfigActions.setAppConfig(configRes.data));

        // Get the runtime version info and set it in the store
        const versionRes = await httpClient.get<RuntimeConfigState>(
          `${apiPath}/version`
        );
        if (versionRes.status === 200 && versionRes.data) {
          dispatch(runtimeConfigActions.setRuntimeConfig(versionRes.data));
        }
      }
    } catch (error) {
      console.error('Error getting config', error);
    }

    return true;
  };

  /**
   * Gets the room data from the api and stores it in the store
   */
  const getRoomData = async (
    apiPath: string,
    token: string,
    dispatch: Dispatch
  ): Promise<boolean> => {
    try {
      const res = await httpClient.get<RoomData>(
        `${apiPath}/ui/joinroom?token=${token}`
      );

      if (res.status === 200 && res.data) {
        dispatch(runtimeConfigActions.setRoomData(res.data));
        return true;
      }

      return false;
    } catch (err) {
      console.log(err);

      if (
        err instanceof AxiosError &&
        err.response &&
        err.response.status === 498
      ) {
        console.error('Invalid token. Unable to join room');
        dispatch(
          uiActions.setErrorMessage(
            `Token ${token} is invalid. Unable to join room`
          )
        );
        return false;
      }

      console.error('Error getting room data', err);

      if (err instanceof Error) {
        dispatch(uiActions.setErrorMessage(err.message));
      } else {
        dispatch(uiActions.setErrorMessage('Error getting room data'));
      }
      return false;
    }
  };

  /**
   * Clear state data on disconnect
   */
  const clearStateDataOnDisconnect = (dispatch: Dispatch) => {
    dispatch(uiActions.setShowReconnect(true));
    dispatch(runtimeConfigActions.setWebsocketIsConnected(false));
    dispatch(devicesActions.clearDevices());
    dispatch(roomsActions.clearRooms());
    dispatch(uiActions.clearAllModals());
    dispatch(uiActions.clearSyncState());
  };

  /**
   * Request room status - automatically called when connection and room data are ready
   */
  const requestRoomStatus = (getState: () => LocalRootState) => {
    const rootState = getState();
    const { roomKey } = rootState.runtimeConfig.roomData;
    const { clientId } = rootState.runtimeConfig.roomData;
    const isConnected = rootState.runtimeConfig.websocket.isConnected;

    if (!roomKey || !isConnected || !clientId) {
      console.log('WebSocket middleware: Cannot request room status', {
        hasRoomKey: !!roomKey,
        isConnected,
        hasClientId: !!clientId,
      });
      return;
    }

    console.log('WebSocket middleware: Requesting status from room:', roomKey);

    if (state.client && isConnected) {
      state.client.send(
        JSON.stringify({
          type: `/room/${roomKey}/status`,
          clientId,
          content: null,
        })
      );
    }
  };

  /**
   * Connect to the WebSocket
   */
  const connect = async (
    dispatch: Dispatch,
    getState: () => LocalRootState
  ) => {
    console.log('WebSocket middleware: Attempting to connect...');

    const rootState = getState();
    const { apiPath } = rootState.appConfig.config;
    const { serverIsRunningOnProcessorHardware } = rootState.runtimeConfig;

    if (!apiPath || !state.token) {
      console.log(
        'WebSocket middleware: Cannot connect - missing requirements',
        {
          hasApiPath: !!apiPath,
          hasToken: !!state.token,
        }
      );
      return;
    }

    // Check if already connected or currently connecting
    if (state.client || state.waitingToReconnect) {
      console.log(
        'WebSocket middleware: Already connected/connecting, skipping',
        {
          hasClient: !!state.client,
          waitingToReconnect: state.waitingToReconnect,
        }
      );
      return;
    }

    // Mark as connecting to prevent concurrent attempts
    state.waitingToReconnect = true;

    try {
      const tokenResult = await getRoomData(apiPath, state.token, dispatch);

      if (!tokenResult) {
        console.log('WebSocket middleware: Failed to get room data');
        state.waitingToReconnect = false;
        return;
      }

      console.log('WebSocket middleware: Connecting to websocket');

      const wsPath = apiPath.replace('http', 'ws');
      const url = `${wsPath}/ui/join/${state.token}`;

      const newWs = new WebSocket(url);
      state.client = newWs;

      newWs.onopen = (ev: Event) => {
        console.log('WebSocket middleware: Connected', ev.type, ev.target);
        dispatch(runtimeConfigActions.setWebsocketIsConnected(true));
      };

      newWs.onerror = (err) => {
        console.error('WebSocket middleware: Error', err);
        clearStateDataOnDisconnect(dispatch);
      };

      newWs.onclose = (closeEvent: CloseEvent): void => {
        console.log(
          'WebSocket middleware: Disconnected',
          closeEvent.reason,
          closeEvent.code
        );

        // Handle explicit client-side close
        if (closeEvent.code === 4100) {
          console.log('WebSocket middleware: Closed by client (cleanup)');
          clearStateDataOnDisconnect(dispatch);
          return;
        }

        state.waitingToReconnect = true;

        if (closeEvent.code === 4000) {
          console.log('WebSocket middleware: User code changed');
          dispatch(
            runtimeConfigActions.setUserCode({ userCode: '', qrUrl: '' })
          );
          dispatch(
            uiActions.setErrorMessage(
              'User code changed. Click reconnect to enter the new code'
            )
          );
          clearStateDataOnDisconnect(dispatch);
          return;
        }

        if (closeEvent.code === 4001 && !serverIsRunningOnProcessorHardware) {
          console.log('WebSocket middleware: Processor disconnected');
          dispatch(
            uiActions.setErrorMessage(
              'Processor has disconnected. Click Reconnect'
            )
          );
          clearStateDataOnDisconnect(dispatch);
          return;
        }

        if (closeEvent.code === 4002) {
          console.log('WebSocket middleware: Room combination changed');
          dispatch(
            uiActions.setErrorMessage(
              'Room combination changed. Click Reconnect to re-join the room'
            )
          );
          clearStateDataOnDisconnect(dispatch);
          return;
        }

        if (state.client) {
          console.log('WebSocket middleware: Closed by server');
        } else {
          console.log('WebSocket middleware: Closed by client');
          return;
        }

        console.log('WebSocket middleware: Clearing state on disconnect');
        dispatch(runtimeConfigActions.setWebsocketIsConnected(false));
        dispatch(devicesActions.clearDevices());
        dispatch(roomsActions.clearRooms());
        dispatch(uiActions.clearAllModals());
        dispatch(uiActions.clearSyncState());

        setTimeout(() => {
          state.waitingToReconnect = false;
        }, 5000);
      };

      newWs.onmessage = (e) => {
        try {
          const message: Message = JSON.parse(e.data);
          console.log('WebSocket middleware: Message received', message);

          if (message.type === 'close') {
            newWs.close(4001, message.content as string);
            return;
          }

          if (message.type.startsWith('/system/')) {
            switch (message.type) {
              case '/system/touchpanelKey':
                dispatch(
                  runtimeConfigActions.setTouchpanelKey(
                    message.content as string
                  )
                );
                break;
              case '/system/roomKey':
                dispatch(roomsActions.clearRooms());
                dispatch(devicesActions.clearDevices());
                dispatch(uiActions.clearSyncState());
                dispatch(
                  runtimeConfigActions.setCurrentRoomKey(
                    message.content as string
                  )
                );
                break;
              case '/system/userCodeChanged':
                dispatch(
                  runtimeConfigActions.setUserCode(message.content as UserCode)
                );
                break;
              case '/system/roomCombinationChanged':
                window.location.reload();
                break;
              default:
                console.log(
                  'WebSocket middleware: Unhandled system message',
                  message
                );
                break;
            }
          } else if (message.type.startsWith('/event/')) {
            console.log(
              'WebSocket middleware: Event message received',
              message
            );
            const handlers = state.eventHandlers[message.type];

            if (!handlers) {
              console.log(
                'WebSocket middleware: No handlers found for event type',
                message.type
              );
            }

            if (handlers) {
              Object.values(handlers).forEach((handler) => {
                try {
                  handler(message);
                } catch (err) {
                  console.error(
                    'WebSocket middleware: Event handler error',
                    err
                  );
                }
              });
            }
          } else if (message.type.startsWith('/room/')) {
            dispatch(roomsActions.setRoomState(message));
          } else if (message.type.startsWith('/device/')) {
            dispatch(devicesActions.setDeviceState(message));
          }
        } catch (err) {
          console.error('WebSocket middleware: Message handling error', err);
        }
      };

      // Reset the connecting flag on successful connection
      state.waitingToReconnect = false;
    } catch (error) {
      console.error('WebSocket middleware: Connection error', error);
      state.waitingToReconnect = false;
      state.client = null;
    }
  };

  /**
   * Disconnect from the WebSocket
   */
  const disconnect = () => {
    if (state.client) {
      console.log('WebSocket middleware: Disconnecting');
      state.client.close(4100, 'Client requested disconnect');
      state.client = null;
    }
  };

  /**
   * Send a message through the WebSocket
   */
  const sendMessage = (
    messageType: string,
    content: unknown,
    getState: () => LocalRootState
  ) => {
    const rootState = getState();
    const isConnected = rootState.runtimeConfig.websocket.isConnected;
    const clientId = rootState.runtimeConfig.roomData.clientId;

    if (state.client && isConnected) {
      state.client.send(
        JSON.stringify({ type: messageType, clientId, content })
      );
    } else {
      console.warn('WebSocket middleware: Cannot send message - not connected');
    }
  };

  /**
   * Add an event handler
   */
  const addEventHandler = (
    eventType: string,
    key: string,
    callback: (data: Message) => void
  ) => {
    if (!state.eventHandlers[eventType]) {
      state.eventHandlers[eventType] = {};
    }

    state.eventHandlers[eventType][key] = callback;
    console.log('WebSocket middleware: Event handler added', eventType, key);
  };

  /**
   * Remove an event handler
   */
  const removeEventHandler = (eventType: string, key: string) => {
    if (state.eventHandlers[eventType]) {
      delete state.eventHandlers[eventType][key];
      console.log(
        'WebSocket middleware: Event handler removed',
        eventType,
        key
      );
    }
  };

  /**
   * Reconnect to the WebSocket
   */
  const reconnect = (getState: () => LocalRootState) => {
    const rootState = getState();
    const { gatewayAppPath } = rootState.appConfig.config;
    const roomKey = rootState.runtimeConfig.roomData.roomKey;
    const systemUuid = rootState.runtimeConfig.roomData.systemUuid;
    const userCode = rootState.runtimeConfig.roomData.userCode;

    const newUrl = `${gatewayAppPath}?uuid=${systemUuid}&roomKey=${roomKey}`;
    window.location.href = userCode ? `${newUrl}&Code=${userCode}` : newUrl;
  };

  /**
   * The middleware function
   */
  return (store) => (next) => (action) => {
    const result = next(action);

    // Type guard to check if action has required properties
    if (!action || typeof action !== 'object' || !('type' in action)) {
      return result;
    }

    const typedAction = action as AnyAction;

    // Handle actions asynchronously
    (async () => {
      switch (typedAction.type) {
        case WS_CONNECT: {
          // Get token from URL or session storage
          const qp = new URLSearchParams(window.location.search);
          let joinToken = qp.get('token');

          if (joinToken) {
            console.log('WebSocket middleware: Saving token');
            saveValue(sessionStorageKeys.uuid, joinToken);
          } else {
            joinToken = loadValue(sessionStorageKeys.uuid);
            console.log('WebSocket middleware: Loading token');
          }

          state.token = joinToken;

          // Initialize config
          await initialize(store.dispatch);

          // Connect
          await connect(store.dispatch, store.getState);
          break;
        }

        case WS_DISCONNECT:
          disconnect();
          break;

        case WS_SEND_MESSAGE:
          sendMessage(
            typedAction.payload.messageType,
            typedAction.payload.content,
            store.getState
          );
          break;

        case WS_ADD_EVENT_HANDLER:
          addEventHandler(
            typedAction.payload.eventType,
            typedAction.payload.key,
            typedAction.payload.callback
          );
          break;

        case WS_REMOVE_EVENT_HANDLER:
          removeEventHandler(
            typedAction.payload.eventType,
            typedAction.payload.key
          );
          break;

        case WS_RECONNECT:
          reconnect(store.getState);
          break;

        default:
          // Listen for state changes that should trigger room status requests
          if (
            action.type === runtimeConfigActions.setWebsocketIsConnected.type
          ) {
            // When connection is established, request room status
            const isConnected = (action as AnyAction).payload;
            if (isConnected === true) {
              console.log(
                '[WebSocket Middleware] Connection established, requesting room status...'
              );
              setTimeout(() => requestRoomStatus(store.getState), 100);
            }
          } else if (action.type === runtimeConfigActions.setRoomData.type) {
            // When room data (including clientId) becomes available, request room status if connected
            const state = store.getState() as LocalRootState;
            const roomData = (action as AnyAction).payload as
              | RoomData
              | undefined;
            if (
              state.runtimeConfig.websocket.isConnected &&
              roomData?.clientId
            ) {
              console.log(
                '[WebSocket Middleware] Room data received, requesting room status...'
              );
              setTimeout(() => requestRoomStatus(store.getState), 100);
            }
          } else if (
            action.type === runtimeConfigActions.setCurrentRoomKey.type
          ) {
            // When room changes, request status for the new room
            const roomKey = (action as AnyAction).payload;
            if (roomKey) {
              console.log(
                '[WebSocket Middleware] Room changed to:',
                roomKey,
                ', requesting room status...'
              );
              setTimeout(() => requestRoomStatus(store.getState), 100);
            }
          }
          break;
      }
    })().catch((err) => {
      console.error('WebSocket middleware: Error handling action', err);
    });

    return result;
  };
};
