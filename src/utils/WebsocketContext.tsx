import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { httpClient, useInitialize } from '../services/apiService.ts';
import DisconnectedMessage from '../shared/disconnectedMessage/DisconnectedMessage.tsx';
import { devicesActions } from '../store/devices.slice.ts';
import { useAppSelector } from '../store/hooks.ts';
import { store } from '../store/index.ts';
import { roomsActions } from '../store/rooms/rooms.slice.ts';
import { runtimeConfigActions, UserCode } from '../store/runtimeConfig/runtimeConfig.slice.ts';
import { useClientId, useRoomkey, useWsIsConnected } from '../store/runtimeConfig/runtimeSelectors.ts';
import { Message } from '../types/state/index.ts';

interface WebsocketContextType {
  sendMessage: (type: string, payload: unknown) => void;
}

const WebsocketContext = createContext<WebsocketContextType>({
  sendMessage: () => null,
});

export function useWebsocketContext() {
  return useContext(WebsocketContext);
}

/**
 * The context component that contains the websocket connection and provides the sendMessage function
 * Must wrap all other components
 * @param children 
 * @returns 
 */
export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  /* STATE ***********************************************************/
  const [ws, setWs] = useState<WebSocket | null>(null);
  const isConnected = useWsIsConnected();
  const roomKey = useRoomkey();
  const clientId = useClientId();
  const initialize = useInitialize();
  const apiPath = useAppSelector((state) => state.appConfig.config.apiPath);

  const qp = new URLSearchParams(window.location.search);

  const token = qp.get('token');  

  /* FUNCTIONS *******************************************************/
  /**
   * Gets the room data from the api and stores it in the store
   * @param apiPath base path to the api without the token
   */
  const getRoomData = useCallback(async (apiPath: string) => {
    await httpClient.get(`${apiPath}/ui/joinroom?token=${token}`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          store.dispatch(runtimeConfigActions.setRoomData(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);


  /**
   * Connects to the websocket and returns the websocket object
   * @param apiPath base path to the api without the token
   */
  const connectWebsocket = useCallback((apiPath: string) => {


    const wsPath = apiPath.replace('http', 'ws');
    const url = `${wsPath}/ui/join/${token}`;

   const newWs = new WebSocket(url);

    setWs(newWs);
    
    newWs.onopen = () => {
      console.log('connected');
      store.dispatch(runtimeConfigActions.setWebsocketIsConnected(true));
    };

    newWs.onerror = (err) => {
      console.log(err);
    }

    newWs.onclose = () => {
      console.log('disconnected');
      store.dispatch(runtimeConfigActions.setWebsocketIsConnected(false));
    }

    newWs.onmessage = (e) => {
      try {
        const message: Message = JSON.parse(e.data);
        console.log(message);

          if(message.type.startsWith('/system/')) { 
          switch (message.type) {
            case '/system/roomKey':
              store.dispatch(runtimeConfigActions.setCurrentRoomKey(message.content as string));
              break;
            case '/system/userCodeChanged':
              store.dispatch(runtimeConfigActions.setUserCode(message.content as UserCode));
              break;
          }
        }
        else if (message.type.startsWith('/room/')) {
          store.dispatch(roomsActions.setRoomState(message));
        }
        else if (message.type.startsWith('/device/')) {
          store.dispatch(devicesActions.setDeviceState(message));
        }
      } catch (err) {
        console.log(err);
      }
    }
    return newWs;
  }, [token]);

  const sendMessage = useCallback((type: string, content: unknown) => {
    if (ws && isConnected) {
      ws.send(JSON.stringify({ type, clientId,  content }));
    }
  }, [ws, isConnected, clientId]);

  function reconnect() {
    if (ws) {
      ws.close();
    }
    getRoomData(apiPath);
    connectWebsocket(apiPath);
  }

  //* EFFECTS *********************************************************/
  useEffect(() => {
    initialize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if (!apiPath) return;

    getRoomData(apiPath);
    const newWs = connectWebsocket(apiPath);

    // Cleanup first websocket in dev mode due to double render cycle
    return () => {
      if (newWs) {
        newWs.close();
      }
    }
    }, [apiPath, connectWebsocket, getRoomData]);

  useEffect(() => {
    if(roomKey) {
      sendMessage(`/room/${roomKey}/status`, null);
    }

  }, [roomKey, sendMessage]);

  //* RENDER **********************************************************/
  return (
    <WebsocketContext.Provider value={{ sendMessage }}>     
      {isConnected ? children : <DisconnectedMessage reconnect={reconnect} />}
    </WebsocketContext.Provider>
  );
};