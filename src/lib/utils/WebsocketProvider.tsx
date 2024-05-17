import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { httpClient, useInitialize } from "../services";
import DisconnectedMessage from "../shared/disconnectedMessage/DisconnectedMessage";
import { store, useAppConfig } from "../store";
import { devicesActions } from "../store/devices/devices.slice";
import { roomsActions } from "../store/rooms/rooms.slice";
import {
  UserCode,
  runtimeConfigActions,
} from "../store/runtimeConfig/runtimeConfig.slice";
import {
  useClientId,
  useRoomData,
  useRoomKey,
  useWsIsConnected,
} from "../store/runtimeConfig/runtimeSelectors";
import { Message } from "../types";
import sessionStorageKeys from "../types/classes/session-storage-keys";
import WebsocketContext from "./WebsocketContext";
import { loadValue, saveValue } from "./joinParamsService";

/**
 * The context component that contains the websocket connection and provides the sendMessage function
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
  const clientRef = useRef<WebSocket | null>(null);
  // const isTouchpanel = useIsTouchpanel();
  // const serverIsRunningOnProcessorHardware = useIsServerRunningOnProcessorHardware();
  const roomData = useRoomData();
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
    async (apiPath: string) => {      
      await httpClient
        .get(`${apiPath}/ui/joinroom?token=${token}`)
        .then((res) => {
          if (res.status === 200 && res.data) {
            store.dispatch(runtimeConfigActions.setRoomData(res.data));
          }
        })
        .catch((err) => {
          console.log(err);

          if (err.response && err.response.status === 498) {
            console.error("Invalid token. Unable to join room");
          }
        });
    },
    [token]
  );

  // const getToken = useCallback(
  //   async (apiPath: string) => {
  //     console.log(roomData);
  //     await httpClient.get(`${apiPath}/ui/prejoin/?uuid=${roomData.systemUuid}&roomKey=${roomData.roomKey}&code=${roomData.userCode}`)
  //       .then((res) => {
  //         if (res.status === 200 && res.data) {
  //           // room is offline
  //           if (res.data.error) {
  //             console.log(res.data.error);
  //             return;
  //           }

  //           if (res.data.token) {
  //             store.dispatch(runtimeConfigActions.setToken(res.data.token));
  //           }            
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);

  //         if (err.response && err.response.status === 404) {
  //           console.log(err.response.data);

  //           if (err.response.data == 'invalid code') {
  //             const newUrl = `${appConfig.gatewayAppPath}?uuid=${roomData.systemUuid}&roomKey=${roomData.roomKey}`;
  //             window.location.href = newUrl;
  //           }
  //         }
  //       });
  //   },[appConfig.gatewayAppPath, roomData]
  // )

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

    // if(!token && !appConfig.enableDev) {
    //   console.error('No join token found. Unable to continue');
    //   return;
    // }

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

  /**
   * Connect to the websocket and get the room data when the apiPath changes
   */
  useEffect(() => {
    async function joinWebsocket() {
      if (!appConfig.apiPath || waitingToReconnect || !token) return;

      await getRoomData(appConfig.apiPath);

      if (!clientRef.current) {
        const wsPath = appConfig.apiPath.replace("http", "ws");
        const url = `${wsPath}/ui/join/${token}`;

        const newWs = new WebSocket(url);

        clientRef.current = newWs;

        newWs.onopen = () => {
          console.log("connected");
          store.dispatch(runtimeConfigActions.setWebsocketIsConnected(true));
        };

        newWs.onerror = (err) => {
          console.log(err);
        };

        newWs.onclose = () => {
          console.log("disconnected");
          if (clientRef.current) {
            console.log("WebSocket closed by server.");
          } else {
            console.log("WebSocket closed by client.");
            return;
          }

          if (waitingToReconnect) {
            return;
          }

          store.dispatch(runtimeConfigActions.setWebsocketIsConnected(false));
          store.dispatch(devicesActions.clearDevices());
          store.dispatch(roomsActions.clearRooms());
          store.dispatch(runtimeConfigActions.setCurrentRoomKey(""));

          setWaitingToReconnect(true);

          setTimeout(() => setWaitingToReconnect(undefined), 5000);
      };

        newWs.onmessage = (e) => {
          try {
            const message: Message = JSON.parse(e.data);
            console.log(message);            

            if (message.type.startsWith("/system/")) {
              switch (message.type) {
                case "/system/online":
                  {
                    console.log('system is online');
                    //sendMessage('/system/clientJoined', { clientId, roomKey: roomData.roomKey })

                    // newWs.send(JSON.stringify({ type:'/system/clientJoined', content: {clientId, roomKey: roomData.roomKey} }));
                    break;
                  }
                case "/system/roomKey":
                  
                  store.dispatch(
                    runtimeConfigActions.setCurrentRoomKey(
                      message.content as string
                    )
                  );
                  break;
                case "/system/touchPanelInfo":
                  {
                    const tokens = Object.keys(message.content as Record<string, unknown>);

                    store.dispatch(runtimeConfigActions.setIsTouchpanel(tokens.length > 0 && tokens.includes(token)));
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
            console.log(err);
          }
        };
      }
      // Cleanup first websocket in dev mode due to double render cycle
      return () => {
        if (clientRef.current) {
          clientRef.current.close();
        }

        clientRef.current = null;
      };
    }

    joinWebsocket();
  }, [appConfig.apiPath, clientId, getRoomData, roomData.roomKey, sendMessage, token, waitingToReconnect]);

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
      }}
    >
      {isConnected ? children : <DisconnectedMessage />}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
