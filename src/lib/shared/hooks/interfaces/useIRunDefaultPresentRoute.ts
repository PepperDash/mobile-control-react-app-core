import { useWebsocketContext } from "../../../utils";

/**
 * hook to control a room that implements the IRunDefaultPresentRoute interface
 * @param roomKey key of the room
 * @returns 
 */
export function useIRunDefaultPresentRoute(roomKey: string):IRunDefaultPresentRouteProps {
  const { sendMessage } = useWebsocketContext();
  
  const runDefaultPresentRoute = () => {
    sendMessage(`/room/${roomKey}/defaultsource`, {});
  };
 
  return {runDefaultPresentRoute}
}

export interface IRunDefaultPresentRouteProps {
  runDefaultPresentRoute: () => void;
}