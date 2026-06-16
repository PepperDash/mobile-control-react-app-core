import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements the IDialerCallStatus interface.
 * Provides call status information and methods for dialing, ending calls, accepting, rejecting, and sending DTMF.
 * @param key device key
 * @returns
 */
export function useIDialerCallStatus(
  key: string,
): IDialerCallStatusReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IDialerCallStatusState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const dial = (number: string) =>
      sendMessage(`${path}/dial`, { value: number });

    const endCallById = (callId: string) =>
      sendMessage(`${path}/endCallById`, { value: callId });

    const endAllCalls = () => sendMessage(`${path}/endAllCalls`, null);

    const sendDtmf = (digit: string) =>
      sendMessage(`${path}/dtmf`, { value: digit });

    const acceptById = (callId: string) =>
      sendMessage(`${path}/acceptById`, { value: callId });

    const rejectById = (callId: string) =>
      sendMessage(`${path}/rejectById`, { value: callId });

    return {
      state,
      dial,
      endCallById,
      endAllCalls,
      sendDtmf,
      acceptById,
      rejectById,
    };
  }, [key, sendMessage, state]);
}

export interface ActiveCallItem {
  name?: string;
  number?: string;
  type?: string;
  status?: string;
  direction?: string;
  id?: string;
  isOnHold?: boolean;
  duration?: string;
}

export interface IDialerCallStatusState extends DeviceState {
  isInCall: boolean;
  calls: ActiveCallItem[];
  info?: {
    phoneNumber?: string;
  };
}

export interface IDialerCallStatusReturn {
  state: IDialerCallStatusState;
  dial: (number: string) => void;
  endCallById: (callId: string) => void;
  endAllCalls: () => void;
  sendDtmf: (digit: string) => void;
  acceptById: (callId: string) => void;
  rejectById: (callId: string) => void;
}
