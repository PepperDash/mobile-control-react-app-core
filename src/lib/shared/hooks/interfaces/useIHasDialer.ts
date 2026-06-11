import { useMemo } from 'react';
import { DeviceState, useGetDevice } from 'src/lib';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to control a device that implements the IHasDialer interface.
 * Provides methods for dialing, sending DTMF tones, and ending calls.
 * @param key path prefix for the device, e.g. /device/{key}
 * @returns
 */
export function useIHasDialer(key: string): IHasDialerReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasDialerState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const dial = (number: string) =>
      sendMessage(`/device/${key}/dial`, { value: number });

    const endAllCalls = () => sendMessage(`/device/${key}/endAllCalls`, null);

    const sendDtmf = (digit: string) =>
      sendMessage(`/device/${key}/dtmf`, { value: digit });

    return {
      state,
      dial,
      endAllCalls,
      sendDtmf,
    };
  }, [key, sendMessage, state]);
}

export interface IHasDialerReturn {
  state: IHasDialerState;
  dial: (number: string) => void;
  endAllCalls: () => void;
  sendDtmf: (digit: string) => void;
}

export interface IHasDialerState extends DeviceState {
  isInCall: boolean;
}
