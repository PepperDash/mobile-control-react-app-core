import { createContext, useContext } from "react";

export function useWebsocketContext() {
  return useContext(WebsocketContext);
}

interface WebsocketContextType {
  sendMessage: (type: string, payload: unknown) => void;
}

const WebsocketContext = createContext<WebsocketContextType>({
  sendMessage: () => null,
});

export default WebsocketContext;
