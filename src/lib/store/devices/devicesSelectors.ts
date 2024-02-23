import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import store, { RootState } from '../rootReducer';

/**
 * Memoized selector to get all devices
 * @returns all devices
 */
export const useGetAllDevices = () => {
  return createSelector(
      [(state: RootState) => state.devices],
      (devicesRecord) => devicesRecord ? Object.values(devicesRecord) : undefined  
  )(store.getState())
}


// TODO: Make this generic to take a type to cast the return as
/**
 * Selector for a single device
 * @param deviceKey 
 * @returns DeviceState or undefined
 */
export const useGetDevice = (deviceKey: string) => 
  useAppSelector((state) => state.devices[deviceKey] ? state.devices[deviceKey] : undefined);
