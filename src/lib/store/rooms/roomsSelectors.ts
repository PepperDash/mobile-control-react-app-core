import { useAppSelector } from '../hooks';

export const useRoomConfiguration = (roomKey: string) => useAppSelector((state) => state.rooms[roomKey] ? state.rooms[roomKey]?.configuration : undefined);