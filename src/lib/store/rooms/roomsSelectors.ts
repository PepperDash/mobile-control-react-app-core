import { createSelector } from '@reduxjs/toolkit';
import { RoomVolumeType, Volume } from 'src/lib/types';
import { DisplayState, RoomConfiguration } from "src/lib/types/state/state";
import { useGetAllDevices } from '../devices/devicesSelectors';
import { useAppSelector } from "../hooks";
import store, { RootState } from '../rootReducer';

export const useRoomConfiguration: (roomKey: string) => RoomConfiguration | undefined = (roomKey: string) =>
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

export const useRoomDestinationList = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]
      ? state.rooms[roomKey]?.configuration?.destinationList
      : undefined
  );

export const useRoomEnvironmentalDevices = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]
      ? state.rooms[roomKey]?.configuration?.environmentalDevices
      : undefined
  );

export const useRoomProgramAudioDestinationKey = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]?.configuration?.destinationList["programAudio"]
      ? state.rooms[roomKey]?.configuration?.destinationList["programAudio"]?.sinkKey
      : state.rooms[roomKey]?.configuration?.destinationList["defaultDisplay"]?.sinkKey || ""
  );

export const useRoomCodecContentDestinationKey = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]
      ? state.rooms[roomKey]?.configuration?.destinationList["codecContent"]?.sinkKey
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
export const useGetRoomDisplayStates = (roomKey: string) => {
  return createSelector(
    [
      (_state, roomKey: string) => roomKey,
      useGetAllDevices,
      (state: RootState) => state.rooms[roomKey]?.configuration?.destinations,     
    ],
    (roomKey, deviceStates, destinations) => {
      console.log("roomKey", roomKey);
      console.log("devices", deviceStates);
      console.log("destinations", destinations);
      if (!destinations) return undefined;

      const displayKeys = Object.entries(destinations).filter(([key]) => key !== "programAudio" && key !== "codecContent").map(([,value]) => value);
    
      const displayStates = Object.values(deviceStates).filter((device) => Object.values(displayKeys).includes(device.key));

      return displayStates as DisplayState[];
    }
  )(store.getState(), roomKey);
};

export const useGetZoomRoomControllerKey = (roomKey: string) =>
  useAppSelector((state) =>
    state.rooms[roomKey]
      ? state.rooms[roomKey]?.configuration?.zoomRoomControllerKey
      : undefined
  );

