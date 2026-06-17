import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasParticipantPinUnpin.
 * Provides screen count state and actions for pinning/unpinning participants to screens.
 * @param key device key
 * @returns
 */
export function useIHasParticipantPinUnpin(
  key: string,
): IHasParticipantPinUnpinReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasParticipantPinUnpinState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const pinParticipant = (userId: number, screenIndex: number) =>
      sendMessage(`${path}/pinParticipant`, { userId, screenIndex });

    const unpinParticipant = (userId: number) =>
      sendMessage(`${path}/unpinParticipant`, { value: userId });

    const toggleParticipantPin = (userId: number, screenIndex: number) =>
      sendMessage(`${path}/toggleParticipantPin`, { userId, screenIndex });

    return {
      state,
      pinParticipant,
      unpinParticipant,
      toggleParticipantPin,
    };
  }, [key, sendMessage, state]);
}

export interface IHasParticipantPinUnpinState extends DeviceState {
  numberOfScreens?: number;
}

export interface IHasParticipantPinUnpinReturn {
  state: IHasParticipantPinUnpinState;
  pinParticipant: (userId: number, screenIndex: number) => void;
  unpinParticipant: (userId: number) => void;
  toggleParticipantPin: (userId: number, screenIndex: number) => void;
}
