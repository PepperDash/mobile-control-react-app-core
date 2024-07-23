import { useContext } from "react";
import WebsocketContext from "./WebsocketContext";


/**
 * A hook that provides access to the websocket for the purposes of sending messages as well as adding and removing event handlers
 * @returns The websocket context
 */
export function useWebsocketContext() {
  return useContext(WebsocketContext);
}
