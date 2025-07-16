import { DeviceInfo, DeviceInfoState, useGetDevice } from '../../..';

/**
 * hook that returns the info for a device that implements the IDeviceInfo interface
 * @param key key of the device
 * @returns 
 */
export function useIDeviceInfoMessenger(key: string): DeviceInfo | undefined {
  const device = useGetDevice<DeviceInfoState>(key);

  if (!device) return undefined;

  return device.deviceInfo || undefined;
  
}
