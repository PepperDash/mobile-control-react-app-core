import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { httpClient, useInitialize } from "../services";
import DisconnectedMessage from "../shared/disconnectedMessage/DisconnectedMessage";
import { store, useAppConfig } from "../store";
import { devicesActions } from "../store/devices.slice";
import { roomsActions } from "../store/rooms/rooms.slice";
import {
  UserCode,
  runtimeConfigActions,
} from "../store/runtimeConfig/runtimeConfig.slice";
import {
  useClientId,
  useRoomKey,
  useWsIsConnected,
} from "../store/runtimeConfig/runtimeSelectors";
import { Message } from "../types";
import sessionStorageKeys from "../types/classes/session-storage-keys";
import { loadValue, saveValue } from "./joinParamsService";
import WebsocketContext from "./useWebsocketContext";

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
  const [waitingToReconnect, setWaitingToReconnect] = useState<boolean>();

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
        });
    },
    [token]
  );

  const sendMessage = useCallback(
    (type: string, content: unknown) => {
      if (clientRef.current && isConnected) {
        clientRef.current.send(JSON.stringify({ type, clientId, content }));
      }
    },
    [isConnected, clientId]
  );

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
    if (!appConfig.apiPath || waitingToReconnect || !token) return;

    getRoomData(appConfig.apiPath);

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

        setWaitingToReconnect(true);

        setTimeout(() => setWaitingToReconnect(undefined), 5000);
      };

      newWs.onmessage = (e) => {
        try {
          const message: Message = JSON.parse(e.data);
          console.log(message);

          if (message.type.startsWith("/system/")) {
            switch (message.type) {
              case "/system/roomKey":
                store.dispatch(
                  runtimeConfigActions.setCurrentRoomKey(
                    message.content as string
                  )
                );
                break;
              case "/system/userCodeChanged":
                store.dispatch(
                  runtimeConfigActions.setUserCode(message.content as UserCode)
                );
                break;
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
  }, [appConfig.apiPath, getRoomData, token, waitingToReconnect]);

  /**
   *  Send a status message to the server to get the current state of the room when the roomKey changes
   *  */
  useEffect(() => {
    if (roomKey) {
      sendMessage(`/room/${roomKey}/status`, null);
    }
  }, [roomKey, sendMessage]);

  //* RENDER **********************************************************/
  return (
    <WebsocketContext.Provider value={{ sendMessage }}>
      {isConnected ? children : <DisconnectedMessage />}
    </WebsocketContext.Provider>
  );
};

export default WebsocketProvider;
