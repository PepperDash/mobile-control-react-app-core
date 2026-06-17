import { useMemo } from 'react';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasPresentationOnlyMeeting.
 * Provides actions for starting a laptop sharing-only meeting and converting to a normal meeting.
 * Action-only (no state).
 * @param key device key
 * @returns
 */
export function useIHasPresentationOnlyMeeting(
  key: string,
): IHasPresentationOnlyMeetingReturn {
  const { sendMessage } = useWebsocketContext();

  return useMemo(() => {
    const path = `/device/${key}`;

    const dialPresent = () => sendMessage(`${path}/dialPresent`, null);
    const dialConvert = () => sendMessage(`${path}/dialConvert`, null);

    return {
      dialPresent,
      dialConvert,
    };
  }, [key, sendMessage]);
}

export interface IHasPresentationOnlyMeetingReturn {
  dialPresent: () => void;
  dialConvert: () => void;
}
