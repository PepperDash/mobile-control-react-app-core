import { useMemo } from 'react';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasParticipantVideoMute.
 * Provides actions for muting, unmuting, and toggling individual participant video.
 * Action-only (no state).
 * @param key device key
 * @returns
 */
export function useIHasParticipantVideoMute(
  key: string,
): IHasParticipantVideoMuteReturn {
  const { sendMessage } = useWebsocketContext();

  return useMemo(() => {
    const path = `/device/${key}`;

    const muteVideoForParticipant = (userId: number) =>
      sendMessage(`${path}/muteVideoForParticipant`, { value: userId });

    const unmuteVideoForParticipant = (userId: number) =>
      sendMessage(`${path}/unmuteVideoForParticipant`, { value: userId });

    const toggleParticipantVideoMute = (userId: number) =>
      sendMessage(`${path}/toggleParticipantVideoMute`, { value: userId });

    return {
      muteVideoForParticipant,
      unmuteVideoForParticipant,
      toggleParticipantVideoMute,
    };
  }, [key, sendMessage]);
}

export interface IHasParticipantVideoMuteReturn {
  muteVideoForParticipant: (userId: number) => void;
  unmuteVideoForParticipant: (userId: number) => void;
  toggleParticipantVideoMute: (userId: number) => void;
}
