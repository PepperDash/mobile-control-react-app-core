import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';
import { CodecDirectory, DirectoryContact } from './useIHasDirectory';

/**
 * Hook to interact with a Zoom Room device.
 * Provides Zoom-specific state (camera mute, directory) and actions for inviting contacts,
 * joining/ending meetings, and controlling the camera.
 * @param key device key
 * @returns
 */
export function useZoomRoom(key: string): ZoomRoomReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<ZoomRoomState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const invite = (contact: InvitableDirectoryContact) =>
      sendMessage(`${path}/invite`, contact);

    const inviteContactsToNewMeeting = (
      invitees: InvitableDirectoryContact[],
      duration: number,
    ) =>
      sendMessage(`${path}/inviteContactsToNewMeeting`, { invitees, duration });

    const inviteContactsToExistingMeeting = (
      invitees: InvitableDirectoryContact[],
    ) => sendMessage(`${path}/inviteContactsToExistingMeeting`, { invitees });

    const muteVideo = () => sendMessage(`${path}/muteVideo`, null);

    const toggleVideoMute = () => sendMessage(`${path}/toggleVideoMute`, null);

    const endMeeting = () => sendMessage(`${path}/endMeeting`, null);

    const joinScheduledMeeting = (meetingId: string) =>
      sendMessage(`${path}/joinScheduledMeeting`, { value: meetingId });

    const joinMeeting = (meetingNumber: string, password?: string) =>
      sendMessage(`${path}/joinMeeting`, { meetingNumber, password });

    return {
      state,
      invite,
      inviteContactsToNewMeeting,
      inviteContactsToExistingMeeting,
      muteVideo,
      toggleVideoMute,
      endMeeting,
      joinScheduledMeeting,
      joinMeeting,
    };
  }, [key, sendMessage, state]);
}

export interface ContactMethod {
  contactMethodId?: string;
  number?: string;
  device?: string;
  contactMethodType?: string;
}

export interface InvitableDirectoryContact extends DirectoryContact {
  isInvitableContact?: boolean;
}

export interface ZoomRoomState extends DeviceState {
  cameraIsMuted?: boolean;
  currentDirectory?: CodecDirectory;
}

export interface ZoomRoomReturn {
  state: ZoomRoomState;
  invite: (contact: InvitableDirectoryContact) => void;
  inviteContactsToNewMeeting: (
    invitees: InvitableDirectoryContact[],
    duration: number,
  ) => void;
  inviteContactsToExistingMeeting: (
    invitees: InvitableDirectoryContact[],
  ) => void;
  muteVideo: () => void;
  toggleVideoMute: () => void;
  endMeeting: () => void;
  joinScheduledMeeting: (meetingId: string) => void;
  joinMeeting: (meetingNumber: string, password?: string) => void;
}
