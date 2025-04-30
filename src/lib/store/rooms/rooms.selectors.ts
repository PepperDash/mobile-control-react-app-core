import { createSelector } from '@reduxjs/toolkit';
import { RoomVolumeType } from 'src/lib/types';
import { DisplayState, LevelControlsState, RoomConfiguration, RoomState } from "src/lib/types/state/state";
import { useGetAllDevices } from '../devices/devices.selectors';
import { useAppSelector } from "../hooks";
import { RootState, store } from '../store';
import { selectRoomAdvancedSharingActive, selectRoomAudioControlPointList, selectRoomByKey, selectRoomCodecContentDestinationKey, selectRoomConfiguration, selectRoomDestinationList, selectRoomDestinations, selectRoomEnvironmentalDevices, selectRoomInCall, selectRoomIsCoolingDown, selectRoomIsOn, selectRoomIsWarmingUp, selectRoomLevelControls, selectRoomName, selectRoomProgramAudioDestinationKey, selectRooms, selectRoomShareState, selectRoomSourceList, selectRoomVolume, selectZoomRoomControllerKey } from './rooms.hooks';

export function useRoomConfiguration(roomKey: string): RoomConfiguration | undefined {
  return useAppSelector(
   selectRoomConfiguration(roomKey)) as RoomConfiguration | undefined;
}

export function useGetAllRooms() {
  return useAppSelector(selectRooms);
}

export function useRoomState<T extends RoomState = RoomState>(roomKey: string): T | undefined {
  return useAppSelector(selectRoomByKey(roomKey)) as T | undefined;
}


/** Alternate for useRoomState */
export const useGetRoom = useRoomState;

export const useRoomName = (roomKey: string) =>
  useAppSelector(selectRoomName(roomKey)
  );

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useRoomVolume = (roomKey: string, volumeKey: RoomVolumeType) =>
  useAppSelector(selectRoomVolume(roomKey, volumeKey)
  );

export const useRoomLevelControls = (roomKey: string) =>
  useAppSelector(selectRoomLevelControls(roomKey)) as unknown as LevelControlsState || undefined;

export const useRoomSourceList = (roomKey: string) =>
  useAppSelector(selectRoomSourceList(roomKey));

export const useRoomAudioControlPointList = (roomKey: string) =>
  useAppSelector(selectRoomAudioControlPointList(roomKey));

export const useRoomDestinations = (roomKey: string) =>
  useAppSelector(selectRoomDestinations(roomKey));

export const useRoomDestinationList = (roomKey: string) =>
  useAppSelector(selectRoomDestinationList(roomKey));

export const useRoomEnvironmentalDevices = (roomKey: string) =>
  useAppSelector(selectRoomEnvironmentalDevices(roomKey));

export const useRoomProgramAudioDestinationKey = (roomKey: string) =>
  useAppSelector(selectRoomProgramAudioDestinationKey(roomKey));

export const useRoomCodecContentDestinationKey = (roomKey: string) =>
  useAppSelector(selectRoomCodecContentDestinationKey(roomKey));

export const useRoomInCall = (roomKey: string) =>
  useAppSelector(selectRoomInCall(roomKey));

export const useRoomIsWarmingUp = (roomKey: string) =>
  useAppSelector(selectRoomIsWarmingUp(roomKey));

export const useRoomIsCoolingDown = (roomKey: string) =>
  useAppSelector(selectRoomIsCoolingDown(roomKey));

export const useRoomIsOn = (roomKey: string) =>
  useAppSelector(selectRoomIsOn(roomKey));

export const useRoomAdvancedSharingActive = (roomKey: string) =>
  useAppSelector(selectRoomAdvancedSharingActive(roomKey));

export const useRoomShareState = (roomKey: string) =>
  useAppSelector(selectRoomShareState(roomKey));

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
  useAppSelector(selectZoomRoomControllerKey(roomKey));

