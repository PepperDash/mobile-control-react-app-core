export interface RoomData {
  clientId: string | number;
  roomKey: string;
  systemUuid: string;
  roomUuid: string;
  userAppUrl: string;
  config?: EssentialsConfig;
  userCode: string;
  codeExpires?: Date;
  enableDebug?: boolean;
  qrUrl: string;
}

export interface EssentialsConfig {
  runtimeInfo: {
    pluginVersion: string;
    essentialsVersion: string;
    pepperDashCoreVersion: string;
    essentialsPlugins: { name: string; version: string }[];
  };
}