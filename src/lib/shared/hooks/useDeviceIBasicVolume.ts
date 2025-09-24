import { useIBasicVolume } from './interfaces/useIBasicVolume';

/**
 *  Wrapper hook for a device volume
 * @param deviceKey 
 * @returns 
 */
export function useDeviceIBasicVolume(deviceKey: string ) {
  
  const path = `/device/${deviceKey}`;

  return useIBasicVolume(path);
}

