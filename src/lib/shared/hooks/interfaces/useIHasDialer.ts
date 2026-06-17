import { useMemo } from 'react';
import { ActiveCallItem, DeviceState, useGetDevice } from 'src/lib';
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

    const acceptCall = (callItem: ActiveCallItem) =>
      sendMessage(`/device/${key}/acceptCall`, callItem);

    const rejectCall = (callItem: ActiveCallItem) =>
      sendMessage(`/device/${key}/rejectCall`, callItem);

    return {
      state,
      dial,
      endAllCalls,
      sendDtmf,
      acceptCall,
      rejectCall,
    };
  }, [key, sendMessage, state]);
}

export interface IHasDialerReturn {
  state: IHasDialerState;
  dial: (number: string) => void;
  endAllCalls: () => void;
  sendDtmf: (digit: string) => void;
  acceptCall: (callItem: ActiveCallItem) => void;
  rejectCall: (callItem: ActiveCallItem) => void;
}

export interface IHasDialerState extends DeviceState {
  isInCall: boolean;
  callItem?: ActiveCallItem;
}
