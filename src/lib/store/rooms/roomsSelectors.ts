import { useAppSelector } from "../hooks";

export const useRoomConfiguration = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey] ? state.rooms[roomKey]?.configuration : undefined
  );

export const useRoomState = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey] ? state.rooms[roomKey] : undefined
  );

export const useRoomMasterVolume = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey] ? state.rooms[roomKey]?.volumes?.master : undefined
  );

export const useRoomSourceList = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]
      ? state.rooms[roomKey]?.configuration?.sourceList
      : undefined
  );

export const useRoomDestinationKeys = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]
      ? state.rooms[roomKey]?.configuration?.displayKeys
      : undefined
  );

export const useRoomInCall = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey] ? state.rooms[roomKey]?.isInCall : undefined
  );

export const useRoomIsWarmingUp = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey] ? state.rooms[roomKey]?.isWarmingUp : undefined
  );

export const useRoomIsCoolingDown = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey] ? state.rooms[roomKey]?.isCoolingDown : undefined
  );

export const useRoomIsOn = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey] ? state.rooms[roomKey]?.isOn : undefined
  );

export const useRoomAdvancedSharingActive = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]
      ? state.rooms[roomKey]?.advancedSharingActive
      : undefined
  );

export const useRoomShareState = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey] ? state.rooms[roomKey]?.share : undefined
  );
