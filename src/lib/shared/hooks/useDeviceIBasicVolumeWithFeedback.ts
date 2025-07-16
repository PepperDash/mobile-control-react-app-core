import { useGetDevice } from '../../store';
import { IBasicVolumeWithFeedbackState } from '../../types/state/state/IBasicVolumeWithFeedbackState';
import { useIBasicVolumeWithFeedback } from './interfaces/useIBasicVolumeWithFeedback';

/**
 *  Wrapper hook for a device volume
 * @param deviceKey 
 * @returns 
 */
export function useDeviceIBasicVolumeWithFeedback(deviceKey: string ) {
  const volumeState = useGetDevice<IBasicVolumeWithFeedbackState>(deviceKey);

  const path = `/device/${deviceKey}`;

  return useIBasicVolumeWithFeedback(path, volumeState?.volume);
}

