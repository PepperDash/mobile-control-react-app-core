import { createContext } from "react";
import { Message, SimpleContent } from '../types';

export interface WebsocketContextType {
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