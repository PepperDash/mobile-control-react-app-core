import { DeviceState } from 'src/lib';
import { useAppSelector } from '../hooks';


/**
 * Selector for all devices
 * @returns Record<string, DeviceState>
 */
export const useGetAllDevices = () => {
  return useAppSelector((state) => state.devices);
}

/**
 * Selector for a single device
 * @param deviceKey 
 * @returns DeviceState or undefined
 */
export function useGetDevice<T extends DeviceState = DeviceState>(deviceKey: string): T | undefined {
  return useAppSelector((state) => state.devices[deviceKey] ? state.devices[deviceKey] : undefined) as T | undefined;
}

