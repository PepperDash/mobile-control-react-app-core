import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasScheduleAwareness.
 * Provides meeting schedule state including upcoming meetings and meeting change events.
 * @param key device key
 * @returns
 */
export function useIHasScheduleAwareness(
  key: string,
): IHasScheduleAwarenessReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasScheduleAwarenessState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const getSchedule = () => sendMessage(`${path}/schedule/fullStatus`, null);

    return {
      state,
      getSchedule,
    };
  }, [key, sendMessage, state]);
}

export interface Meeting {
  id: string;
  organizer: string;
  title: string;
  agenda: string;
  startTime: string;
  endTime: string;
  duration: string;
  privacy: string;
  joinable: boolean;
  dialable: boolean;
  conferencePassword: string;
  isOneButtonToPushMeeting: boolean;
  meetingWarningMinutes: string;
  timeToMeetingStart: string;
  timeToMeetingEnd: string;
  minutesBeforeMeeting: number;
  calls: MeetingCall[];
}

export interface MeetingCall {
  id: string;
  number: string;
  name: string;
  direction: string;
  type: string;
  status: string;
}

export interface MeetingChange {
  changeType: string;
  meeting: Meeting;
}

export interface IHasScheduleAwarenessState extends DeviceState {
  meetings?: Meeting[];
  meetingWarningMinutes?: number;
  meetingChange?: MeetingChange;
}

export interface IHasScheduleAwarenessReturn {
  state: IHasScheduleAwarenessState;
  getSchedule: () => void;
}
