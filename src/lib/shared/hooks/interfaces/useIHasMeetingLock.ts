import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasMeetingLock.
 * Provides meeting lock state and lock/unlock/toggle actions.
 * @param key device key
 * @returns
 */
export function useIHasMeetingLock(
  key: string,
): IHasMeetingLockReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasMeetingLockState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const lockMeeting = () => sendMessage(`${path}/lockMeeting`, null);
    const unlockMeeting = () => sendMessage(`${path}/unlockMeeting`, null);
    const toggleMeetingLock = () =>
      sendMessage(`${path}/toggleMeetingLock`, null);

    return {
      state,
      lockMeeting,
      unlockMeeting,
      toggleMeetingLock,
    };
  }, [key, sendMessage, state]);
}

export interface IHasMeetingLockState extends DeviceState {
  meetingIsLocked?: boolean;
}

export interface IHasMeetingLockReturn {
  state: IHasMeetingLockState;
  lockMeeting: () => void;
  unlockMeeting: () => void;
  toggleMeetingLock: () => void;
}
