import { useContext } from "react";
import WebsocketContext from "./WebsocketContext";

export function useWebsocketContext() {
  return useContext(WebsocketContext);
}
