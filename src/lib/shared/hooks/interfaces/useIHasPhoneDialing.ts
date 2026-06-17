import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasPhoneDialing.
 * Provides phone off-hook and caller ID state, plus dial/end/DTMF actions.
 * @param key device key
 * @returns
 */
export function useIHasPhoneDialing(
  key: string,
): IHasPhoneDialingReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasPhoneDialingState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const dialPhoneCall = (number: string) =>
      sendMessage(`${path}/dialPhoneCall`, { value: number });

    const endPhoneCall = () => sendMessage(`${path}/endPhoneCall`, null);

    const sendDtmfToPhone = (digit: string) =>
      sendMessage(`${path}/sendDtmfToPhone`, { value: digit });

    return {
      state,
      dialPhoneCall,
      endPhoneCall,
      sendDtmfToPhone,
    };
  }, [key, sendMessage, state]);
}

export interface IHasPhoneDialingState extends DeviceState {
  phoneOffHook?: boolean;
  callerIdName?: string;
  callerIdNumber?: string;
}

export interface IHasPhoneDialingReturn {
  state: IHasPhoneDialingState;
  dialPhoneCall: (number: string) => void;
  endPhoneCall: () => void;
  sendDtmfToPhone: (digit: string) => void;
}
