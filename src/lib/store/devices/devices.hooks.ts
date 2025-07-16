import { DeviceState } from '../..';
import { useAppSelector } from '../hooks';
import { selectAllDevices, selectDeviceByKey } from './devices.selectors';


/**
 * Selector for all devices
 * @returns Record<string, DeviceState>
 */
export const useGetAllDevices = () => {
  return useAppSelector(selectAllDevices);
}

/**
 * Selector for a single device
 * @param deviceKey 
 * @returns DeviceState or undefined
 */
export function useGetDevice<T extends DeviceState = DeviceState>(deviceKey: string): T | undefined {
  return useAppSelector(selectDeviceByKey(deviceKey)) as T | undefined;
}

