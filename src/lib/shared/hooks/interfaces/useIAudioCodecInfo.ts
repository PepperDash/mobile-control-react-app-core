import { DeviceState, useGetDevice } from '../../..';

/**
 * Hook to get audio codec info for a device that implements the IAudioCodecInfo interface.
 * Returns the phone number associated with the audio codec.
 * @param key device key
 * @returns
 */
export function useIAudioCodecInfo(
  key: string,
): IAudioCodecInfoReturn | undefined {
  const device = useGetDevice<IAudioCodecInfoState>(key);

  if (!device) return undefined;

  return {
    phoneNumber: device.phoneNumber,
  };
}

export interface IAudioCodecInfoState extends DeviceState {
  phoneNumber?: string;
}

export interface IAudioCodecInfoReturn {
  phoneNumber?: string;
}
