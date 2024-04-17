export interface DeviceInfoState {
    deviceInfo: DeviceInfo;
}

export interface DeviceInfo {
    HostName: string;

    IpAddress: string;

    MacAddress: string;

    SerialNumber: string;

    FirmwareVersion: string;
}
