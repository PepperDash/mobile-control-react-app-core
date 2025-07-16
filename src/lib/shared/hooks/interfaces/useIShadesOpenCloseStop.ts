import { useGetDevice } from '../../../store';
import { ShadeState } from '../../../types';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * hook that controls a device that implements the IShadesOpenCloseStop interface
 * @param key key of the device
 * @returns 
 */
export function useIShadesOpenCloseStop(key: string): IShadesOpenCloseStopProps | undefined {
  const { sendMessage } = useWebsocketContext();
  const shadeState = useGetDevice<ShadeState>(key);

  if (!shadeState) return undefined;

  const shadeUp = () => {
      sendMessage(`/device/${key}/shadeUp`, null);
  };

  const shadeDown = () => {
      sendMessage(`/device/${key}/shadeDown`, null);
  };

  const stopOrPreset = () => {
      sendMessage(`/device/${key}/stopOrPreset`, null);
  }

  return { shadeState, shadeUp, shadeDown, stopOrPreset };
}

export interface IShadesOpenCloseStopProps {
  shadeState: ShadeState;
  shadeUp: () => void;
  shadeDown: () => void;
  stopOrPreset: () => void;
}



