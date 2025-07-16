import { useRoomVolume } from '../../store';
import { RoomVolumeType } from '../../types';
import { useIBasicVolumeWithFeedback } from './interfaces/useIBasicVolumeWithFeedback';

/**
 *  Wrapper hook for the room volumes
 * @param roomKey 
 * @param type either master or they key of the aux volume
 * @returns 
 */
export function useRoomIBasicVolumeWithFeedback(roomKey: string, type: RoomVolumeType ) {
  const volumeState = useRoomVolume(roomKey, type);

  const path = `/room/${roomKey}/volumes/${type}`;

  return useIBasicVolumeWithFeedback(path, volumeState);
}

