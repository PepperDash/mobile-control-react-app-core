import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasStartMeeting.
 * Provides actions for starting and leaving ad-hoc meetings.
 * @param key device key
 * @returns
 */
export function useIHasStartMeeting(
  key: string,
): IHasStartMeetingReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasStartMeetingState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const startMeeting = (durationMin?: number) =>
      sendMessage(`${path}/startMeeting`, { value: durationMin });

    const leaveMeeting = () => sendMessage(`${path}/leaveMeeting`, null);

    return {
      state,
      startMeeting,
      leaveMeeting,
    };
  }, [key, sendMessage, state]);
}

export interface IHasStartMeetingState extends DeviceState {
  supportsAdHocMeeting?: boolean;
  defaultMeetingDurationMin?: number;
}

export interface IHasStartMeetingReturn {
  state: IHasStartMeetingState;
  startMeeting: (durationMin?: number) => void;
  leaveMeeting: () => void;
}
