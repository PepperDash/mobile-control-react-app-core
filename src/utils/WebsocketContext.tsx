import { createContext, ReactNode, useContext, useState } from 'react';
import { httpClient } from '../services/apiService.ts';
import { store } from '../store/index.ts';
import { runtimeConfigActions } from '../store/runtimeConfig.slice.ts';

interface WebsocketContextType {
  ws: WebSocket | null;
  setWs: (ws: WebSocket) => void;
  sendMessage: (type: string, payload: unknown) => void;
}

const WebsocketContext = createContext<WebsocketContextType>({
  ws: null,
  setWs: () => {},
  sendMessage: () => null,
});

export function useWebsocketContext() {
  return useContext(WebsocketContext);
}

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  console.log('WebsocketProvider');
  /* STATE ***********************************************************/
  const [ws, setWs] = useState<WebSocket | null>(null);

  const qp = new URLSearchParams(window.location.search);

  const token = qp.get('token');  

  // const apiPath = useAppSelector((state) => state.appConfig.config.apiPath);
  const apiPath = 'http://192.168.1.164:50002/mc/api';

  getRoomData(apiPath);

  connectWebsocket(apiPath);


  /* FUNCTIONS *******************************************************/
  async function getRoomData(apiPath: string) {
    console.log('getRoomData');
    await httpClient.get(`${apiPath}/ui/joinroom?token=${token}`)
      .then((res) => {
        if (res.status === 200 && res.data) {
          store.dispatch(runtimeConfigActions.setRoomData(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function connectWebsocket(apiPath: string) {
    console.log('apiPath', apiPath);
    const wsPath = apiPath.replace('http', 'ws');
    console.log('wsPath', wsPath);
    const url = `${wsPath}/ui/join/?token=${token}`;

   const ws = new WebSocket(url);

    setWs(ws);
    
    ws.onopen = () => {
      console.log('connected');
      store.dispatch(runtimeConfigActions.setWebsocketIsConnected(true));
    };

    ws.onerror = (err) => {
      console.log(err);
    }

    ws.onclose = () => {
      console.log('disconnected');
      store.dispatch(runtimeConfigActions.setWebsocketIsConnected(false));
    }

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log(message);
    }
  }

  function sendMessage(type: string, payload: unknown) {
    if (ws) {
      ws.send(JSON.stringify({ type, payload }));
    }
  }

  return (
    <WebsocketContext.Provider value={{ ws, setWs, sendMessage }}>
      {children}
    </WebsocketContext.Provider>
  );
};