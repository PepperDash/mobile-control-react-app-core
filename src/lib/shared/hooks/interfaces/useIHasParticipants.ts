import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements the IHasParticipants interface.
 * Provides participant roster state and actions for managing participants and the waiting room.
 * @param key device key
 * @returns
 */
export function useIHasParticipants(
  key: string,
): IHasParticipantsReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasParticipantsState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const removeParticipant = (userId: number) =>
      sendMessage(`${path}/removeParticipant`, { value: userId });

    const setParticipantAsHost = (userId: number) =>
      sendMessage(`${path}/setParticipantAsHost`, { value: userId });

    const admitParticipantFromWaitingRoom = (userId: number) =>
      sendMessage(`${path}/admitParticipantFromWaitingRoom`, { value: userId });

    const admitAllFromWaitingRoom = () =>
      sendMessage(`${path}/admitAllFromWaitingRoom`, null);

    const removeFromWaitingRoom = (userId: number) =>
      sendMessage(`${path}/removeFromWaitingRoom`, { value: userId });

    const removeAllFromWaitingRoom = () =>
      sendMessage(`${path}/removeAllFromWaitingRoom`, null);

    return {
      state,
      removeParticipant,
      setParticipantAsHost,
      admitParticipantFromWaitingRoom,
      admitAllFromWaitingRoom,
      removeFromWaitingRoom,
      removeAllFromWaitingRoom,
    };
  }, [key, sendMessage, state]);
}

export interface Participant {
  userId: number;
  isHost: boolean;
  isCohost: boolean;
  isMyself: boolean;
  name: string;
  canMuteVideo: boolean;
  canUnmuteVideo: boolean;
  videoMuteFb: boolean;
  audioMuteFb: boolean;
  handIsRaisedFb: boolean;
  isPinnedFb: boolean;
  screenIndexIsPinnedToFb: number;
}

export interface IHasParticipantsState extends DeviceState {
  participants: Participant[];
  waitingRoom: Participant[];
}

export interface IHasParticipantsReturn {
  state: IHasParticipantsState;
  removeParticipant: (userId: number) => void;
  setParticipantAsHost: (userId: number) => void;
  admitParticipantFromWaitingRoom: (userId: number) => void;
  admitAllFromWaitingRoom: () => void;
  removeFromWaitingRoom: (userId: number) => void;
  removeAllFromWaitingRoom: () => void;
}
