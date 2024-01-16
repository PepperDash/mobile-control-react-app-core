export interface RoomData {
  clientId: string | number;
  roomKey: string;
  systemUuid: string;
  roomUuid: string;
  userAppUrl: string;
  config: any;
  userCode: string;
  codeExpires?: Date;
  enableDebug?: boolean;
}
