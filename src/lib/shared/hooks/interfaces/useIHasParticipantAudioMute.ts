import { useMemo } from 'react';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasParticipantAudioMute.
 * Provides actions for muting all participants and toggling individual participant audio/video.
 * Action-only (no state).
 * @param key device key
 * @returns
 */
export function useIHasParticipantAudioMute(
  key: string,
): IHasParticipantAudioMuteReturn {
  const { sendMessage } = useWebsocketContext();

  return useMemo(() => {
    const path = `/device/${key}`;

    const muteAllParticipants = () =>
      sendMessage(`${path}/muteAllParticipants`, null);

    const toggleParticipantAudioMute = (userId: number) =>
      sendMessage(`${path}/toggleParticipantAudioMute`, { value: userId });

    const toggleParticipantVideoMute = (userId: number) =>
      sendMessage(`${path}/toggleParticipantVideoMute`, { value: userId });

    return {
      muteAllParticipants,
      toggleParticipantAudioMute,
      toggleParticipantVideoMute,
    };
  }, [key, sendMessage]);
}

export interface IHasParticipantAudioMuteReturn {
  muteAllParticipants: () => void;
  toggleParticipantAudioMute: (userId: number) => void;
  toggleParticipantVideoMute: (userId: number) => void;
}
