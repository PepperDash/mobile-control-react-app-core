import { useAppSelector } from '../hooks';

export const useWsIsConnected = () => useAppSelector((state) => state.runtimeConfig.websocket.isConnected);

export const useRoomKey = () => useAppSelector((state) => state.runtimeConfig.roomData.roomKey);

export const useClientId = () => useAppSelector((state) => state.runtimeConfig.roomData.clientId);

export const useServerIsRunningOnProcessorHardware = () => useAppSelector((state) => state.runtimeConfig.serverIsRunningOnProcessorHardware);

export const useSystemUuid = () => useAppSelector((state) => state.runtimeConfig.roomData.systemUuid);

export const useUserCode = () => useAppSelector((state) => state.runtimeConfig.roomData.userCode);