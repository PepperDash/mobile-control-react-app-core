import { useGetDevice } from '../../../store';
import { NamedRoutingSlotsState } from '../../../types/state/state/NamedRoutingSlotsState';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';
import { SignalType } from './useIRunDirectRouteAction';

/**
 * Hook for a matrix routing device that also implements Essentials Core's `IHasNamedRoutingSlots`
 * (named input/output slots + per-signal-type current-route feedback). See `useIMatrixRouting` for
 * devices that only implement the bare `IRoutingMidpointWithFeedback` contract.
 * @param key key of the routing device
 * @returns
 */
export function useINamedRoutingSlots(key: string): INamedRoutingSlotsReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const device = useGetDevice<NamedRoutingSlotsState>(key);

  if (!device) return undefined;

  const setRoute = (inputSelector: string, outputSelector: string, signalType: SignalType) => {
    sendMessage(`/device/${key}/route`, { inputSelector, outputSelector, signalType });
  };

  const clearRoute = (outputSelector: string, signalType: SignalType) => {
    sendMessage(`/device/${key}/clearRoute`, { outputSelector, signalType });
  };

  return { namedRoutingSlotsState: device, setRoute, clearRoute };
}

export interface INamedRoutingSlotsReturn {
  namedRoutingSlotsState: NamedRoutingSlotsState;
  setRoute: (inputSelector: string, outputSelector: string, signalType: SignalType) => void;
  clearRoute: (outputSelector: string, signalType: SignalType) => void;
}
