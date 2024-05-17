import { useAppSelector } from '../hooks';

export const useWsIsConnected = () => useAppSelector((state) => state.runtimeConfig.websocket.isConnected);

export const useRoomKey = () => useAppSelector((state) => state.runtimeConfig.currentRoomKey);

export const useClientId = () => useAppSelector((state) => state.runtimeConfig.roomData.clientId);

export const useIsTouchpanel = () => useAppSelector((state) => state.runtimeConfig.isTouchpanel);

export const useIsServerRunningOnProcessorHardware = () => useAppSelector((state) => state.runtimeConfig.serverIsRunningOnProcessorHardware);

export const useRoomData = () => useAppSelector((state) => state.runtimeConfig.roomData);