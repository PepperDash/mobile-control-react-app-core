import { createContext } from "react";
import { Message, SimpleContent } from '../types';

export interface WebsocketContextType {
  sendMessage: (type: string, payload: SimpleContent | unknown ) => void;
  sendSimpleMessage: (type: string, payload: boolean | number | string ) => void;
  addEventHandler: (eventType: string, key: string, callback: (data: Message) => void) => void;
  removeEventHandler: (eventType: string, key: string) => void;
  reconnect: () => void;
}

const WebsocketContext = createContext<WebsocketContextType>({
  sendMessage: () => null,
  sendSimpleMessage: () => null,
  addEventHandler: () => null,
  removeEventHandler: () => null,
  reconnect: () => null,
});

export default WebsocketContext;