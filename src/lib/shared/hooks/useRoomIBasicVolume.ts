import { RoomVolumeType } from '../../types';
import { useIBasicVolume } from './interfaces/useIBasicVolume';

/**
 *  Wrapper hook for the room volumes
 * @param roomKey 
 * @param type either master or they key of the aux volume
 * @returns 
 */
export function useRoomIBasicVolume(roomKey: string, type: RoomVolumeType ) {

  const path = `/room/${roomKey}/volumes/${type}`;

  return useIBasicVolume(path);
}

