import { Volume } from '../../../types';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';
import { IBasicVolumeReturn, useIBasicVolume } from './useIBasicVolume';

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

  const baseVolume = useIBasicVolume(path);
  if(!baseVolume) {
      console.log('baseVolume is undefined');
      return undefined;
  }
  if (!volumeState) {
    console.log('volumeState is undefined');
    return undefined;
  }
  const setLevel = (value: number) => sendSimpleMessage(`${path}/level`, value);
  const muteOn = () => sendMessage(`${path}/muteOn`, null);
  const muteOff = () => sendMessage(`${path}/muteOff`, null);

  return {
    ...baseVolume,
    volumeState,
    setLevel,
    muteOn,
    muteOff,
  };
}

export interface IBasicVolumeWithFeedbackReturn extends IBasicVolumeReturn {
  volumeState: Volume;
  setLevel: (level: number) => void;
  muteOn: () => void;
  muteOff: () => void;
}

export function useGetIBasicVolumeWithFeedback(
  path: string,
  volumeState: Volume | undefined
): IBasicVolumeWithFeedbackReturn | undefined {
  const { sendMessage, sendSimpleMessage } = useWebsocketContext();

  const baseVolume = useIBasicVolume(path);
  if(!baseVolume) {
      console.log('baseVolume is undefined');
      return undefined;
  }
  if(!volumeState) {
      console.log('volumeState is undefined');
      return undefined;
  }

  const setLevel = (value: number) => sendSimpleMessage(`${path}/level`, value);
  const muteOn = () => sendMessage(`${path}/muteOn`, null);
  const muteOff = () => sendMessage(`${path}/muteOff`, null);

  return {
    ...baseVolume,
    volumeState,
    setLevel,
    muteOn,
    muteOff,
  };
}
