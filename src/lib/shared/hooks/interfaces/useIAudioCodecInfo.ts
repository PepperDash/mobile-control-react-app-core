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
  const state = useGetDevice<IAudioCodecInfoState>(key);

  if (!state) return undefined;

  return {
    state,
  };
}

export interface IAudioCodecInfoState extends DeviceState {
  phoneNumber?: string;
}

export interface IAudioCodecInfoReturn {
  state: IAudioCodecInfoState;
}
