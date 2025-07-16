import { Volume } from '../../../types';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';
import { useButtonHeldHeartbeat } from '../useButtonHeldHeartbeat';
import { PressHoldReleaseReturn } from '../usePressHoldRelease';

/**
 * hook to control a volume device that implements the IBasicVolumeWithFeedback interface
 * @param path path prefix to for the device. i.e. /device/{key} or /room/{key}
 * @param volumeState
 * @returns
 */
export function useIBasicVolumeWithFeedback(
  path: string,
  volumeState: Volume | undefined
): IBasicVolumeWithFeedbackReturn | undefined {
  const { sendMessage, sendSimpleMessage } = useWebsocketContext();

  const volumeUp = useButtonHeldHeartbeat(`${path}`, 'volumeUp');
  const volumeDown = useButtonHeldHeartbeat(`${path}`, 'volumeDown');

  if (!volumeState) return undefined;

  const setLevel = (value: number) => sendSimpleMessage(`${path}/level`, value);

  const muteToggle = () => sendMessage(`${path}/muteToggle`, null);

  const muteOn = () => sendMessage(`${path}/muteOn`, null);

  const muteOff = () => sendMessage(`${path}/muteOff`, null);

  return {
    volumeState,
    volumeUp,
    volumeDown,
    setLevel,
    muteToggle,
    muteOn,
    muteOff,
  };
}

export interface IBasicVolumeWithFeedbackReturn {
  volumeState: Volume;
  volumeUp: PressHoldReleaseReturn;
  volumeDown: PressHoldReleaseReturn;
  setLevel: (level: number) => void;
  muteToggle: () => void;
  muteOn: () => void;
  muteOff: () => void;
}

export function useGetIBasicVolumeWithFeedback(
  path: string,
  volumeState: Volume | undefined
): IBasicVolumeWithFeedbackReturn | undefined {
  const { sendMessage, sendSimpleMessage } = useWebsocketContext();

  const volumeUp = useButtonHeldHeartbeat(`${path}`, 'volumeUp');
  const volumeDown = useButtonHeldHeartbeat(`${path}`, 'volumeDown');

  if (!volumeState) return undefined;

  const setLevel = (value: number) => sendSimpleMessage(`${path}/level`, value);

  const muteToggle = () => sendMessage(`${path}/muteToggle`, null);

  const muteOn = () => sendMessage(`${path}/muteOn`, null);

  const muteOff = () => sendMessage(`${path}/muteOff`, null);

  return {
    volumeState,
    volumeUp,
    volumeDown,
    setLevel,
    muteToggle,
    muteOn,
    muteOff,
  };
}
