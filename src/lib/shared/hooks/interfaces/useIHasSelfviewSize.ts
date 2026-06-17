import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';
import { SelfviewOption } from './useIHasSelfviewPosition';

/**
 * Hook to interact with a device that implements IHasSelfviewSize.
 * Provides current selfview PiP size, available sizes, and toggle/set actions.
 * @param key device key
 * @returns
 */
export function useIHasSelfviewSize(
  key: string,
): IHasSelfviewSizeReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasSelfviewSizeState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const toggleSelfviewSize = () =>
      sendMessage(`${path}/toggleSelfviewSize`, null);

    const setSelfviewSize = (command: string) =>
      sendMessage(`${path}/setSelfviewSize`, { value: command });

    return {
      state,
      toggleSelfviewSize,
      setSelfviewSize,
    };
  }, [key, sendMessage, state]);
}

export interface IHasSelfviewSizeState extends DeviceState {
  selfviewPipSize?: string;
  availableSizes?: SelfviewOption[];
}

export interface IHasSelfviewSizeReturn {
  state: IHasSelfviewSizeState;
  toggleSelfviewSize: () => void;
  setSelfviewSize: (command: string) => void;
}
