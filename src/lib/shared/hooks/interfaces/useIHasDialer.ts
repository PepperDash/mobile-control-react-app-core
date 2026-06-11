import { useMemo } from 'react';
import { DeviceState } from 'src/lib';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to control a device that implements the IHasDialer interface.
 * Provides methods for dialing, sending DTMF tones, and ending calls.
 * @param path path prefix for the device, e.g. /device/{key}
 * @returns
 */
export function useIHasDialer(path: string): IHasDialerReturn {
  const { sendMessage } = useWebsocketContext();

  return useMemo(() => {
    const dial = (number: string) =>
      sendMessage(`${path}/dial`, { value: number });

    const endAllCalls = () => sendMessage(`${path}/endAllCalls`, null);

    const sendDtmf = (digit: string) =>
      sendMessage(`${path}/dtmf`, { value: digit });

    return {
      dial,
      endAllCalls,
      sendDtmf,
    };
  }, [path, sendMessage]);
}

export interface IHasDialerReturn {
  dial: (number: string) => void;
  endAllCalls: () => void;
  sendDtmf: (digit: string) => void;
}

export interface IHasDialerState extends DeviceState {
  isInCall: boolean;
}
