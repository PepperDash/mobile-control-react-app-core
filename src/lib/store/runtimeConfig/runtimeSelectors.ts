import { useAppSelector } from '../hooks';

export const useWsIsConnected = () => useAppSelector((state) => state.runtimeConfig.websocket.isConnected);

export const useRoomKey = () => useAppSelector((state) => state.runtimeConfig.currentRoomKey);

export const useClientId = () => useAppSelector((state) => state.runtimeConfig.roomData.clientId);

export const useSystemUuid = () => useAppSelector((state) => state.runtimeConfig.roomData.systemUuid);

export const useUserCode = () => useAppSelector((state) => state.runtimeConfig.roomData.userCode);

export const useServerIsRunningOnProcessorHardware = () => useAppSelector((state) => state.runtimeConfig.serverIsRunningOnProcessorHardware);

export const useRuntimeInfo = () => useAppSelector((state) => state.runtimeConfig.roomData.config?.runtimeInfo);

export const useTouchpanelKey = () => useAppSelector((state) => state.runtimeConfig.touchpanelKey);

export const useIsTouchpanel = () => useAppSelector((state) => state.runtimeConfig.touchpanelKey !== '');
