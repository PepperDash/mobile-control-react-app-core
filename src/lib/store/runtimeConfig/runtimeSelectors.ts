import { useAppSelector } from '../hooks';

export const useWsIsConnected = () => useAppSelector((state) => state.runtimeConfig.websocket.isConnected);

export const useRoomKey = () => useAppSelector((state) => state.runtimeConfig.roomData.currentRoomKey);

export const useClientId = () => useAppSelector((state) => state.runtimeConfig.roomData.clientId);