import { useAppSelector } from '../hooks.ts';

export const useRoomConfiguration = (roomKey: string) => useAppSelector((state) => state.rooms.rooms[roomKey] ? state.rooms.rooms[roomKey]?.configuration : undefined);