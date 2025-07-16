import { useGetDevice } from '../../../store';
import { RoutingState } from '../../../types';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * hook to control a room that implements the IRunRouteAction interface
 * @param roomKey key of the room
 * @returns 
 */
export function useIRunRouteAction(roomKey: string): IRunRouteActionProps | undefined {
  const { sendMessage } = useWebsocketContext();
  const routingState = useGetDevice<RoutingState>(roomKey);
  
  const runRoute = (request: RouteRequest) => {
    sendMessage(`/room/${roomKey}/source`, request);
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