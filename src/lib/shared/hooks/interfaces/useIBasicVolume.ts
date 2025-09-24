import { useWebsocketContext } from '../../../utils/useWebsocketContext';
import { useButtonHeldHeartbeat } from '../useButtonHeldHeartbeat';
import { PressHoldReleaseReturn } from '../usePressHoldRelease';

/**
 * hook to control a volume device that implements the IBasicVolumeControls interface
 * @param path path prefix to for the device. i.e. /device/{key} or /room/{key}
 * @returns
 */
export function useIBasicVolume(
  path: string,
): IBasicVolumeReturn | undefined {
  const { sendMessage } = useWebsocketContext();

  const volumeUp = useButtonHeldHeartbeat(`${path}`, 'volumeUp');
  const volumeDown = useButtonHeldHeartbeat(`${path}`, 'volumeDown');

  const muteToggle = () => sendMessage(`${path}/muteToggle`, null);

  return {
    volumeUp,
    volumeDown,
    muteToggle,
  };
}

export interface IBasicVolumeReturn {
  volumeUp: PressHoldReleaseReturn;
  volumeDown: PressHoldReleaseReturn;
  muteToggle: () => void;
}

export function useGetIBasicVolume(
  path: string,
): IBasicVolumeReturn | undefined {
  const { sendMessage } = useWebsocketContext();

  const volumeUp = useButtonHeldHeartbeat(`${path}`, 'volumeUp');
  const volumeDown = useButtonHeldHeartbeat(`${path}`, 'volumeDown');

  const muteToggle = () => sendMessage(`${path}/muteToggle`, null);
  return {
    volumeUp,
    volumeDown,
    muteToggle,
  };
}
