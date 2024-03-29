import { useAppSelector } from '../hooks';

export const useWsIsConnected = () => useAppSelector((state) => state.runtimeConfig.websocket.isConnected);

export const useRoomKey = () => useAppSelector((state) => state.runtimeConfig.roomData.roomKey);

export const useClientId = () => useAppSelector((state) => state.runtimeConfig.roomData.clientId);