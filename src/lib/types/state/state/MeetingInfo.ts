export interface MeetingInfo {
  host: string;
  id: string;
  name: string;
  password: string;
  shareStatus: string;
  isHost: boolean;
  isSharingMeeting: boolean;
  waitingForHost: boolean;
  isRecording: boolean;
  canRecord: boolean;
  isLocked: boolean;
}
