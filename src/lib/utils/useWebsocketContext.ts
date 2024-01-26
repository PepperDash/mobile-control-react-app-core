import { createContext, useContext } from 'react';

interface WebsocketContextType {
  sendMessage: (type: string, payload: unknown) => void;
}

const WebsocketContext = createContext<WebsocketContextType>({
  sendMessage: () => null,
});

export function useWebsocketContext() {
  return useContext(WebsocketContext);
}

export default WebsocketContext;