import { useGetDevice } from 'src/lib/store';
import { RoutingState } from 'src/lib/types';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';

export function useIRunRouteAction(key: string): IRunRouteActionProps | undefined {
  const { sendMessage } = useWebsocketContext();
  const routingState = useGetDevice<RoutingState>(key);
  if (!routingState) return undefined;
  
  const runRoute = (sourceListkey: string) => {
    sendMessage(`/device/${key}/source`, { sourceListkey });
  };

  return { routingState, runRoute };
}

export interface IRunRouteActionProps {
  routingState: RoutingState;
  runRoute: (sourceListkey: string) => void;
}