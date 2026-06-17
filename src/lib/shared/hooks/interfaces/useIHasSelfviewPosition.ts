import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasSelfviewPosition.
 * Provides current selfview PiP position, available positions, and toggle/set actions.
 * @param key device key
 * @returns
 */
export function useIHasSelfviewPosition(
  key: string,
): IHasSelfviewPositionReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasSelfviewPositionState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const toggleSelfviewPosition = () =>
      sendMessage(`${path}/toggleSelfviewPosition`, null);

    const setSelfviewPosition = (command: string) =>
      sendMessage(`${path}/setSelfviewPosition`, { value: command });

    return {
      state,
      toggleSelfviewPosition,
      setSelfviewPosition,
    };
  }, [key, sendMessage, state]);
}

export interface SelfviewOption {
  command: string;
  label: string;
}

export interface IHasSelfviewPositionState extends DeviceState {
  selfviewPipPosition?: string;
  availablePositions?: SelfviewOption[];
}

export interface IHasSelfviewPositionReturn {
  state: IHasSelfviewPositionState;
  toggleSelfviewPosition: () => void;
  setSelfviewPosition: (command: string) => void;
}
