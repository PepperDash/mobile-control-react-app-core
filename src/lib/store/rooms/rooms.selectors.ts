import { createSelector } from '@reduxjs/toolkit';
import { DisplayState, RootState, selectAllDevices } from '../..';


const roomsState = (state: RootState) => state.rooms;

export const selectRoomConfiguration = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey].configuration : undefined
);

export const selectRooms = createSelector(
  roomsState,
  (rooms) => rooms
);

export const selectRoomByKey = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey] : undefined
);

export const selectRoomName = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey].name : undefined
);

export const selectRoomVolume = (roomKey: string, volumeKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey].volumes[volumeKey] : undefined
);

export const selectRoomLevelControls = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey] : undefined
);

export const selectRoomSourceList = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey]?.configuration?.sourceList : undefined
);
  
export const selectRoomAudioControlPointList = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey]?.configuration?.audioControlPointList : undefined
);

export const selectRoomDestinations = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey]?.configuration?.destinations : undefined
);

export const selectRoomDestinationList = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey]?.configuration?.destinationList : undefined
);

export const selectRoomEnvironmentalDevices = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey]?.configuration?.environmentalDevices : undefined
);

export const selectRoomProgramAudioDestinationKey = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey]?.configuration?.destinationList["programAudio"]
    ? rooms[roomKey]?.configuration?.destinationList["programAudio"]?.sinkKey
    : rooms[roomKey]?.configuration?.destinationList["defaultDisplay"]?.sinkKey || ""
);

export const selectRoomCodecContentDestinationKey = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey]
    ? rooms[roomKey]?.configuration?.destinationList["codecContent"]?.sinkKey
    : undefined
);

export const selectRoomInCall = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey]?.isInCall : undefined
);

export const selectRoomIsWarmingUp = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey]?.isWarmingUp : undefined
);

export const selectRoomIsCoolingDown = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey]?.isCoolingDown : undefined
);

export const selectRoomIsOn = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey]?.isOn : undefined
);

export const selectRoomAdvancedSharingActive = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey]?.advancedSharingActive : undefined
);

export const selectRoomShareState = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey]?.share : undefined
);

export const selectZoomRoomControllerKey = (roomKey: string) => createSelector(
  roomsState,
  (rooms) => rooms[roomKey] ? rooms[roomKey]?.configuration?.zoomRoomControllerKey : undefined
);

/**
 * Get the display states for the room
 * Exludes the programAudio and codecContent destinations
 * @param roomKey
 * @returns the display states for the room's displays
 */
export const selectRoomDisplayStates = createSelector(
  [
    (state: RootState, roomKey: string) => roomKey,
    () => selectAllDevices,
    (state: RootState, roomKey: string) => state.rooms[roomKey]?.configuration?.destinations,
  ],
  (roomKey, deviceStates, destinations) => {
    console.log("roomKey", roomKey);
    console.log("devices", deviceStates);
    console.log("destinations", destinations);
    if (!destinations) return undefined;

    const displayKeys = Object.entries(destinations).filter(([key]) => key !== "programAudio" && key !== "codecContent").map(([, value]) => value);

    const displayStates = Object.values(deviceStates).filter((device) => Object.values(displayKeys).includes(device.key));

    return displayStates as DisplayState[];
  }
);