import { useGetDevice } from 'src/lib/store';
import { Volume } from 'src/lib/types';
import { useIBasicVolumeWithFeedback } from './interfaces/useIBasicVolumeWithFeedback';

/**
 *  Wrapper hook for a device volume
 * @param deviceKey 
 * @returns 
 */
export function useDeviceIBasicVolumeWithFeedback(deviceKey: string ) {
  const volumeState = useGetDevice<Volume>(deviceKey);

  const path = `/device/${deviceKey}`;

  return useIBasicVolumeWithFeedback(path, volumeState);
}

