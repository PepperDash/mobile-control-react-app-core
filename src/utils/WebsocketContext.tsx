import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { httpClient } from '../services/apiService.ts';
import DisconnectedMessage from '../shared/disconnectedMessage/DisconnectedMessage.tsx';
import { store } from '../store/index.ts';
import { roomsActions } from '../store/rooms/rooms.slice.ts';
import { runtimeConfigActions } from '../store/runtimeConfig/runtimeConfig.slice.ts';
import { useClientId, useRoomkey, useWsIsConnected } from '../store/runtimeConfig/runtimeSelectors.ts';

interface WebsocketContextType {
  sendMessage: (type: string, payload: unknown) => void;
}

const WebsocketContext = createContext<WebsocketContextType>({
  sendMessage: () => null,
});

export function useWebsocketContext() {
  return useContext(WebsocketContext);
}

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  /* STATE ***********************************************************/
  const [ws, setWs] = useState<WebSocket | null>(null);
  const isConnected = useWsIsConnected();
  const roomKey = useRoomkey();
  const clientId = useClientId();

  const qp = new URLSearchParams(window.location.search);

  const token = qp.get('token');  

  // TODO: Figure out why we can't use the store here
  // const apiPath = useAppSelector((state) => state.appConfig.config.apiPath);
  const apiPath = 'http://192.168.1.164:50002/mc/api';


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
        const message = JSON.parse(e.data);
        console.log(message);

        switch (message.type) {
          case '/system/roomKey':
            store.dispatch(runtimeConfigActions.setCurrentRoomKey(message.payload));
            break;
          case '/system/userCodeChanged':
            store.dispatch(runtimeConfigActions.setUserCode(message.payload));
            break;
          case /room\/.*\/status/:
            console.log('status update for room: ', message.payload.key);
            store.dispatch(roomsActions.setRoomState(message.payload));
            break;
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