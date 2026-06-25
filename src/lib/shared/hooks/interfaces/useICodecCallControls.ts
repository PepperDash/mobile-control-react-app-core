import { useMemo } from 'react';
import { ActiveCallItem, DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';
import { Meeting } from './useIHasScheduleAwareness';

/**
 * Hook to interact with a device that implements ICodecCallControls.
 * Provides call control actions including dialing meetings, ending/accepting/rejecting calls by ID.
 * @param key device key
 * @returns
 */
export function useICodecCallControls(
  key: string,
): ICodecCallControlsReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<ICodecCallControlsState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const getCallControlsStatus = () =>
      sendMessage(`${path}/callControlsStatus`, null);

    const dialMeeting = (meeting: Meeting) =>
      sendMessage(`${path}/dialMeeting`, meeting);

    const endCallById = (callId: string) =>
      sendMessage(`${path}/endCallById`, { value: callId });

    const acceptById = (callId: string) =>
      sendMessage(`${path}/acceptById`, { value: callId });

    const rejectById = (callId: string) =>
      sendMessage(`${path}/rejectById`, { value: callId });

    return {
      state,
      getCallControlsStatus,
      dialMeeting,
      endCallById,
      acceptById,
      rejectById,
    };
  }, [key, sendMessage, state]);
}

export interface ICodecCallControlsState extends DeviceState {
  calls?: ActiveCallItem[];
}

export interface ICodecCallControlsReturn {
  state: ICodecCallControlsState;
  getCallControlsStatus: () => void;
  dialMeeting: (meeting: Meeting) => void;
  endCallById: (callId: string) => void;
  acceptById: (callId: string) => void;
  rejectById: (callId: string) => void;
}
