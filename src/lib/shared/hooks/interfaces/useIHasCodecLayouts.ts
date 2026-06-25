import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasCodecLayouts.
 * Provides the current local layout and a toggle action.
 * @param key device key
 * @returns
 */
export function useIHasCodecLayouts(
  key: string,
): IHasCodecLayoutsReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasCodecLayoutsState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const localLayoutToggle = () => sendMessage(`${path}/cameraLayout`, null);

    return {
      state,
      localLayoutToggle,
    };
  }, [key, sendMessage, state]);
}

export interface IHasCodecLayoutsState extends DeviceState {
  currentLayout?: string;
}

export interface IHasCodecLayoutsReturn {
  state: IHasCodecLayoutsState;
  localLayoutToggle: () => void;
}
