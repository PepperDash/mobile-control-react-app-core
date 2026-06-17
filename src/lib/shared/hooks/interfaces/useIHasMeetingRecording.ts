import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasMeetingRecordingWithPrompt.
 * Provides recording state, consent prompt visibility, and recording control actions.
 * @param key device key
 * @returns
 */
export function useIHasMeetingRecording(
  key: string,
): IHasMeetingRecordingReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasMeetingRecordingState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const startRecording = () => sendMessage(`${path}/startRecording`, null);
    const stopRecording = () => sendMessage(`${path}/stopRecording`, null);
    const toggleRecording = () => sendMessage(`${path}/toggleRecording`, null);
    const recordPromptAcknowledge = (accepted: boolean) =>
      sendMessage(`${path}/recordPromptAcknowledge`, { value: accepted });

    return {
      state,
      startRecording,
      stopRecording,
      toggleRecording,
      recordPromptAcknowledge,
    };
  }, [key, sendMessage, state]);
}

export interface IHasMeetingRecordingState extends DeviceState {
  isRecording?: boolean;
  recordConsentPromptIsVisible?: boolean;
}

export interface IHasMeetingRecordingReturn {
  state: IHasMeetingRecordingState;
  startRecording: () => void;
  stopRecording: () => void;
  toggleRecording: () => void;
  recordPromptAcknowledge: (accepted: boolean) => void;
}
