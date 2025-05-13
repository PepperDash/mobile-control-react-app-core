import { AxiosError } from "axios";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { httpClient, useInitialize } from "../services";
import DisconnectedMessage from "../shared/disconnectedMessage/DisconnectedMessage";
import { store, uiActions, useAppConfig } from "../store";
import { devicesActions } from "../store/devices/devices.slice";
import { roomsActions } from "../store/rooms/rooms.slice";
import {
  useClientId,
  useRoomKey,
  useServerIsRunningOnProcessorHardware,
  useSystemUuid,
  useUserCode,
  useWsIsConnected,
} from "../store/runtimeConfig/runtime.hooks";
import {
  UserCode,
  runtimeConfigActions,
} from "../store/runtimeConfig/runtimeConfig.slice";
import { Message, RoomData } from "../types";
import sessionStorageKeys from "../types/classes/session-storage-keys";
import WebsocketContext from "./WebsocketContext";
import { loadValue, saveValue } from "./joinParamsService";

/**
 * The context component that contains the websocket connection and provides the functions to send messages
 * Must wrap all other components
 * @param children the child components.  First child should be a room buseness logic component
 */
const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  /* STATE ***********************************************************/
  const [token, setToken] = useState<string>();
  const isConnected = useWsIsConnected();
  const roomKey = useRoomKey();
  const clientId = useClientId();
  const initialize = useInitialize();
  const appConfig = useAppConfig();
  const systemUuid = useSystemUuid();
  const userCode = useUserCode();
  const serverIsRunningOnProcessorHardware = useServerIsRunningOnProcessorHardware();
  
  const clientRef = useRef<WebSocket | null>(null);
  const [waitingToReconnect, setWaitingToReconnect] = useState<boolean>();  

  /* HANDLERS *******************************************************/

  /**
   * Stores event handlers for the websocket
   * key: a unique key for the handler to allow for removal
   * eventType: the type of event to listen for
   * callback: the function to call when the event is received that takes the message as an argument
   * if additional data is required beyond the eventType
   */
  const eventHandlers = useRef<
    Record<string, Record<string, (data: Message) => void>>
  >({});

  /* FUNCTIONS *******************************************************/

  /**
   * Gets the room data from the api and stores it in the store
   * @param apiPath base path to the api without the token
   */
  const getRoomData = useCallback(
    async (apiPath: string):Promise<boolean> => {
      try {
        const res = await httpClient.get<RoomData>(`${apiPath}/ui/joinroom?token=${token}`);
      
        if (res.status === 200 && res.data) {
          store.dispatch(runtimeConfigActions.setRoomData(res.data));
          return true;
        }

        return false
      }
      catch (err) {
        console.log(err);

        if (serverIsRunningOnProcessorHardware) return true;

        if (err instanceof AxiosError && err.response && err.response.status === 498) {
          console.error("Invalid token. Unable to join room");
          store.dispatch(uiActions.setErrorMessage(`Token ${token} is invalid. Unable to join room`));      
          return false;
        }

        console.error("Error getting room data", err);
        
        if (err instanceof Error) {
          store.dispatch(uiActions.setErrorMessage(err.message));
        } else {
          store.dispatch(uiActions.setErrorMessage("Error getting room data"));
        }
        return false;        
      }
    },
    [token, serverIsRunningOnProcessorHardware]
  );

  const reconnect = useCallback(() => {   
    const newUrl = `${appConfig.gatewayAppPath}?uuid=${systemUuid}&roomKey=${roomKey}`;
    window.location.href = userCode ? `${newUrl}&Code=${userCode}` : newUrl;
  }, [appConfig.gatewayAppPath, roomKey, systemUuid, userCode]);  

  /**
   * Sends a message to the server
   */
  const sendMessage = useCallback(
    (type: string, content: unknown) => {

      if (clientRef.current && isConnected) {
        clientRef.current.send(JSON.stringify({ type, clientId, content }));
      }
    },
    [isConnected, clientId]
  );

  /**
   * Helper function to send a simple message with a boolean, number, or string value
   * @param type
   * @param value
   */
  const sendSimpleMessage = (
    type: string,
    value: boolean | number | string
  ) => {
    sendMessage(type, { value });
  };

  const addEventHandler = useCallback(
    (eventType: string, key: string, callback: (data: Message) => void) => {
      if (!eventHandlers.current[eventType]) {
        eventHandlers.current[eventType] = {};
      }

      eventHandlers.current[eventType][key] = callback;

      console.log("event handler added", eventType, key);
    },
    []
  );

  const removeEventHandler = useCallback((eventType: string, key: string) => {
    if (eventHandlers.current[eventType]) {
      delete eventHandlers.current[eventType][key];

      console.log("event handler removed", eventType, key);
    }
  }, []);  

  //* EFFECTS *********************************************************/
  useEffect(() => {
    // Get the join token from the url params or from session storage and sets it as a local state variable
    const qp = new URLSearchParams(window.location.search);

    let joinToken = qp.get("token");    

    if (joinToken) {
      console.log("saving token: ", joinToken);
      saveValue(sessionStorageKeys.uuid, joinToken);
    } else {
      joinToken = loadValue(sessionStorageKeys.uuid);
      console.log("loading token: ", joinToken);
    }

    setToken(joinToken);

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  console.log("connection dependencies", appConfig.apiPath, getRoomData, token, waitingToReconnect, serverIsRunningOnProcessorHardware);

  /**
   * Connect to the websocket and get the room data when the apiPath changes
   */
  useEffect(() => {
    async function joinWebsocket() {
      console.log('Attempting to join websocket...');
      if (!appConfig.apiPath || waitingToReconnect || !token) return;

      const tokenResult = await getRoomData(appConfig.apiPath);

      if (!tokenResult) return;
      
      if (clientRef.current) {
        console.log("websocket exists")
        return;
      }
      
      console.log("connecting to websocket");

      const wsPath = appConfig.apiPath.replace("http", "ws");
      const url = `${wsPath}/ui/join/${token}`;

      const newWs = new WebSocket(url);

      clientRef.current = newWs;

      newWs.onopen = (ev: Event) => {
        console.log("connected", ev.type, ev.target);
        store.dispatch(runtimeConfigActions.setWebsocketIsConnected(true));
      };

      newWs.onerror = (err) => {
        console.error('Websocket error', err);
      };

      newWs.onclose = (closeEvent: CloseEvent): void => {
        console.log("disconnected: ", closeEvent.reason, closeEvent.code);        

        // Handle explicit client-side close from useEffect cleanup
        if (closeEvent.code === 4100) { // Code used in clientRef.current.close() in useEffect cleanup
          console.log("WebSocket closed by client (useEffect cleanup).");
          // No need to set waitingToReconnect, as the useEffect will handle re-triggering connection if necessary.
          // The store will be repopulated by getRoomData on successful reconnection.
          // If immediate clearing of device/room state is desired here, it can be added.
          store.dispatch(uiActions.setShowReconnect(true));
          store.dispatch(runtimeConfigActions.setWebsocketIsConnected(false));
          store.dispatch(devicesActions.clearDevices());
          store.dispatch(roomsActions.clearRooms());
          return;
        }

        // Set waitingToReconnect to true for all cases except explicit client-side closures (code 4100),
        // which are handled separately above.
        setWaitingToReconnect(true);

        if (closeEvent.code === 4000) {
          console.log("user code changed");
          store.dispatch(runtimeConfigActions.setUserCode({ userCode: '', qrUrl: ''}));
          store.dispatch(uiActions.setErrorMessage("User code changed. Click reconnect to enter the new code"));
          store.dispatch(uiActions.setShowReconnect(true));
          store.dispatch(runtimeConfigActions.setWebsocketIsConnected(false));
          store.dispatch(devicesActions.clearDevices());
          store.dispatch(roomsActions.clearRooms());
          return;
        }

        if (closeEvent.code === 4001 && !serverIsRunningOnProcessorHardware) {
          console.log("processor disconnected");
          store.dispatch(uiActions.setErrorMessage("Processor has disconnected. Click Reconnect"));
          store.dispatch(uiActions.setShowReconnect(true));
          store.dispatch(runtimeConfigActions.setWebsocketIsConnected(false));
          store.dispatch(devicesActions.clearDevices());
          store.dispatch(roomsActions.clearRooms());
          return;
        }

        if (closeEvent.code === 4002) {
          console.log("room combination changed");
          store.dispatch(uiActions.setErrorMessage("Room combination changed. Click Reconnect to re-join the room"));
          store.dispatch(uiActions.setShowReconnect(true));
          store.dispatch(runtimeConfigActions.setWebsocketIsConnected(false));
          store.dispatch(devicesActions.clearDevices());
          store.dispatch(roomsActions.clearRooms());
          return;
        }          

        if (clientRef.current) {
          console.log("WebSocket closed by server.");
        } else {
          console.log("WebSocket closed by client.");
          return;
        }

        console.log('websocket waitingToReconnect', waitingToReconnect);
        if (waitingToReconnect) {
          return;
        }
        
        console.log('websocket clearing state on disconnect');
        store.dispatch(runtimeConfigActions.setWebsocketIsConnected(false));
        store.dispatch(devicesActions.clearDevices());
        store.dispatch(roomsActions.clearRooms());        

        setTimeout(() => setWaitingToReconnect(undefined), 5000);
      };

      newWs.onmessage = (e) => {
        try {
          const message: Message = JSON.parse(e.data);
          console.log(message);

          if (message.type === 'close') // MC API sent a close message
          {
            newWs.close(4001, message.content as string);              
            return;
          }
          if (message.type.startsWith("/system/")) {
            switch (message.type) {          
              case "/system/touchpanelKey":
                store.dispatch(
                  runtimeConfigActions.setTouchpanelKey(
                    message.content as string
                  )
                );
                break;
              case "/system/roomKey": {
                store.dispatch(roomsActions.clearRooms());
                store.dispatch(devicesActions.clearDevices());
                store.dispatch(
                  runtimeConfigActions.setCurrentRoomKey(
                    message.content as string
                  )
                );
                break;
              }
              case "/system/userCodeChanged":
                store.dispatch(
                  runtimeConfigActions.setUserCode(
                    message.content as UserCode
                  )
                );
                break;
              case "/system/roomCombinationChanged":
                // TODO: Revisit if this is the right way to handle combination scenario changes
                window.location.reload();
                break;
              default:
                console.log("unhandled system message", message);
                break;
            }
          } else if (message.type.startsWith("/event/")) {
            console.log("event message received", message);
            // const eventType = (message.content as EventContent).eventType;
            // if (!eventType) return;
            const handlers = eventHandlers.current[message.type];

            if (!handlers) {
              console.log("no handlers found for event type", message.type);
            }

            if (handlers) {
              Object.values(handlers).forEach((handler) => {
                try {
                  handler(message);
                } catch (err) {
                  console.error(err);
                }
              });
            }
          } else if (message.type.startsWith("/room/")) {
            store.dispatch(roomsActions.setRoomState(message));
          } else if (message.type.startsWith("/device/")) {
            store.dispatch(devicesActions.setDeviceState(message));
          }
        } catch (err) {
          console.error('websocket message handling error', err);
        }
      };
      
    }

    joinWebsocket();

    console.log(`App mode: ${import.meta.env.MODE}`);
    console.log(`Is dev mode: ${import.meta.env.DEV}`);

    // Cleanup first websocket in dev mode due to double render cycle
    return () => {
      if (clientRef.current) {
        console.log("closing websocket dev mode");
        clientRef.current.close(4100, 'app running in dev mode');
        clientRef.current = null;
      }
    };
    
  }, [appConfig.apiPath, getRoomData, token, waitingToReconnect, serverIsRunningOnProcessorHardware]);

  /**
   *  Send a status message to the server to get the current state of the room when the roomKey changes
   *  */
  useEffect(() => {
    if (!roomKey || !isConnected) return;
    console.log("clientId: ", clientId);
    if (!clientId) return;

    console.log("requesting status from room: ", roomKey);
    sendMessage(`/room/${roomKey}/status`, null);
  }, [roomKey, clientId, isConnected, sendMessage]);

  //* RENDER **********************************************************/
  return (
    <WebsocketContext.Provider
      value={{
        sendMessage,
        sendSimpleMessage,
        addEventHandler,
        removeEventHandler,
        reconnect,
      }}
    >
      {isConnected ? children : <DisconnectedMessage />}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
