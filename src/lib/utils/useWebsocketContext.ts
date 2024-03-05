import { createContext, useContext } from "react";
import { SimpleContent } from '../types';

export function useWebsocketContext() {
  return useContext(WebsocketContext);
}

interface WebsocketContextType {
  sendMessage: (type: string, payload: SimpleContent | unknown ) => void;
  sendSimpleMessage: (type: string, payload: boolean | number | string ) => void;
}

const WebsocketContext = createContext<WebsocketContextType>({
  sendMessage: () => null,
  sendSimpleMessage: () => null,
});

export default WebsocketContext;
