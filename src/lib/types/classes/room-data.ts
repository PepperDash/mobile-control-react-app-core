export interface RoomData {
  clientId: string | number;
  defaultRoomKey: string;
  currentRoomKey: string;
  systemUuid: string;
  roomUuid: string;
  userAppUrl: string;
  config: unknown;
  userCode: string;
  codeExpires?: Date;
  enableDebug?: boolean;
  qrUrl: string;
}
