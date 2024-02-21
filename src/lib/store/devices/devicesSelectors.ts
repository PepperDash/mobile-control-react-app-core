import { useAppSelector } from '../hooks';

export const useGetAllDevices = () => {
  return useAppSelector((state) => Object.values(state.devices));
}

export const useGetDevice = (deviceKey: string) => {
  return useAppSelector((state) => state.devices[deviceKey]);
}