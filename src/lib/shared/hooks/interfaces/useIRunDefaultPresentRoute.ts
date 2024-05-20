import { useWebsocketContext } from "src/lib/utils";

export function useIRunDefaultPresentRoute(key: string):IRunDefaultPresentRouteProps {
  const { sendMessage } = useWebsocketContext();
  
  const runDefaultPresentRoute = () => {
    sendMessage(`/room/${key}/defaultsource`, {});
  };
 
  return {runDefaultPresentRoute}
}

export interface IRunDefaultPresentRouteProps {
  runDefaultPresentRoute: () => void;
}