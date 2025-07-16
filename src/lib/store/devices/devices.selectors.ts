import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../..';


const devicesConfigSlice = (state: RootState) => state.devices;

export const selectAllDevices = createSelector(
  devicesConfigSlice,
  (devices) => devices
);

export const selectDeviceByKey = (deviceKey: string) => createSelector(
  devicesConfigSlice,
  (devices) => devices[deviceKey] ? devices[deviceKey] : undefined
);
