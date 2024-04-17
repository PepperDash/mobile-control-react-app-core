import { useGetDevice } from 'src/lib/store';
import { RoutingState } from 'src/lib/types';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';

export function useIRunRouteAction(key: string): IRunRouteActionProps | undefined {
  const { sendMessage } = useWebsocketContext();
  const routingState = useGetDevice<RoutingState>(key);
  
  const runRoute = (request: RouteRequest) => {
    sendMessage(`/room/${key}/source`, request);
  };

  return { routingState, runRoute };
}

export interface IRunRouteActionProps {
  routingState: RoutingState | undefined;
  runRoute: (request: RouteRequest) => void;
}

export interface RouteRequest {
  sourceListItemKey: string;
  sourceListKey?: string;
}