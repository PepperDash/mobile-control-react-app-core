import { useMemo } from 'react';
import { DeviceState, MeetingInfo, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasMeetingInfo.
 * Provides the current meeting info (id, name, host, isHost, isSharingMeeting, isLocked,
 * isRecording, canRecord, etc.) and a way to request a fresh status push.
 * @param key device key
 * @returns
 */
export function useIHasMeetingInfo(
  key: string,
): IHasMeetingInfoReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasMeetingInfoState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const refreshMeetingInfo = () =>
      sendMessage(`${path}/meetingInfoStatus`, null);

    return {
      state,
      meetingInfo: state.meetingInfo,
      refreshMeetingInfo,
    };
  }, [key, sendMessage, state]);
}

export interface IHasMeetingInfoState extends DeviceState {
  meetingInfo?: MeetingInfo;
}

export interface IHasMeetingInfoReturn {
  state: IHasMeetingInfoState;
  meetingInfo?: MeetingInfo;
  refreshMeetingInfo: () => void;
}
