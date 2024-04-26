import { createContext, useContext } from "react";
import { Message, SimpleContent } from '../types';

export function useWebsocketContext() {
  return useContext(WebsocketContext);
}

interface WebsocketContextType {
  sendMessage: (type: string, payload: SimpleContent | unknown ) => void;
  sendSimpleMessage: (type: string, payload: boolean | number | string ) => void;
  addEventHandler: (key: string, eventType: string, callback: (data: Message) => void) => void;
  removeEventHandler: (key: string, eventType: string) => void;
}

const WebsocketContext = createContext<WebsocketContextType>({
  sendMessage: () => null,
  sendSimpleMessage: () => null,
  addEventHandler: () => null,
  removeEventHandler: () => null,
});

export default WebsocketContext;
