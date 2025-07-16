import { useGetDevice } from '../../../store';
import { MatrixRoutingState } from '../../../types/state/state/MatrixRoutingState';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';
import { SignalType } from './useIRunDirectRouteAction';

/**
 * Hook to allow routing and feedback of a matrix switcher that implements IMatrixRouting
 * @param key key of matrix routing device
 * @returns 
 */
export function useIMatrixRouting(key: string): IMatrixRoutingReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const device = useGetDevice<MatrixRoutingState>(key);

  if (!device) return undefined;

  const setRoute = (route: RouteRequest) => {
    sendMessage(`/device/${key}/route`, route);
  };

  return { matrixRoutingState: device, setRoute };
}

export interface IMatrixRoutingReturn {
  matrixRoutingState: MatrixRoutingState;
  setRoute: (route: RouteRequest) => void;
}

interface RouteRequest {
  inputKey: string;
  outputKey: string;
  routeType: SignalType;
}