import { useAppSelector } from './hooks.ts';

export const useWsIsConnected = () => useAppSelector((state) => state.runtimeConfig.websocket.isConnected);

export const useRoomkey = () => useAppSelector((state) => state.runtimeConfig.roomData.roomKey);

export const useClientId = () => useAppSelector((state) => state.runtimeConfig.roomData.clientId);