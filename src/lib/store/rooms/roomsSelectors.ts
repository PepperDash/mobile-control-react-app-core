import { RoomVolumeType, Volume } from 'src/lib/types';
import { DisplayState } from "src/lib/types/state/state";
import { useAppSelector } from "../hooks";

export const useRoomConfiguration = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey] ? state.rooms[roomKey]?.configuration : undefined
  );

export const useRoomState = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey] ? state.rooms[roomKey] : undefined
  );

export const useRoomName = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey] ? state.rooms[roomKey]?.name : undefined
  );

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useRoomVolume = (roomKey: string, volumeKey: RoomVolumeType) =>
  useAppSelector((state ) =>
    state.rooms[roomKey] ? state.rooms[roomKey]?.volumes[volumeKey] as Volume : undefined
  );

export const useRoomSourceList = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]
      ? state.rooms[roomKey]?.configuration?.sourceList
      : undefined
  );

export const useRoomDestinations = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]
      ? state.rooms[roomKey]?.configuration?.destinations
      : undefined
  );

export const useRoomProgramAudioDestinationKey = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]
      ? state.rooms[roomKey]?.configuration?.destinations["programAudio"]
      : undefined
  );

export const useRoomCodecContentDestinationKey = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]
      ? state.rooms[roomKey]?.configuration?.destinations["codecContent"]
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

/**
 * Get the display states for the room
 * Exludes the programAudio and codecContent destinations
 * @param roomKey
 * @returns the display states for the room's displays
 */
export const useGetRoomDisplayStates = (roomKey: string) =>
  useAppSelector((state) => {
    const destinations = Object.entries(state.rooms[roomKey]?.configuration?.destinations ?? {});

    if(!destinations) return undefined;

    const displayKeys = destinations.filter(([key]) => key !== "programAudio" && key !== "codecContent");

    console.log("displayKeys", displayKeys);

    // filter state.devices to only include the values in displayKeys

    const devices = Object.values(state.devices);

    const displays = devices.filter((device) =>
      Object.values(displayKeys).includes(device.key)
    );

    // const displays = Object.entries(state.devices).filter(([key,]) =>
    //   displayKeys.includes(key)
    // );

    return (displays as DisplayState[]) || undefined;
  });

export const useGetZoomRoomControllerKey = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]
      ? state.rooms[roomKey]?.configuration?.zoomRoomControllerKey
      : undefined
  );
