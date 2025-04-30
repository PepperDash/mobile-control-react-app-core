import { DeviceState } from 'src/lib';

export interface DeviceInfoState  extends DeviceState {
    deviceInfo: DeviceInfo;
}

export interface DeviceInfo {
    HostName: string;

    IpAddress: string;

    MacAddress: string;

    SerialNumber: string;

    FirmwareVersion: string;
}
