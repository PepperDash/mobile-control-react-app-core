import { DeviceInfo, DeviceInfoState, useGetDevice } from 'src/lib';


export function useIDeviceInfoMessenger(key: string): DeviceInfo | undefined {
  const device = useGetDevice<DeviceInfoState>(key);

  if (!device) return undefined;

  return device.deviceInfo || undefined;
  
}
