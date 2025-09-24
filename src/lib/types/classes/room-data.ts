import { IKeyName } from '../interfaces';

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
  deviceInterfaceSupport?: { [key: string]: DeviceInterfaceInfo };
}

export interface DeviceInterfaceInfo extends IKeyName {
  interfaces: string[];
}

export interface EssentialsConfig {
  runtimeInfo: {
    pluginVersion: string;
    essentialsVersion: string;
    pepperDashCoreVersion: string;
    essentialsPlugins: { name: string; version: string }[];
  };
  rooms: EssentialsRoom[];
  devices: EssentialsDevice[];
}

export interface EssentialsRoom extends IKeyName {}

export interface EssentialsDevice extends IKeyName {}
