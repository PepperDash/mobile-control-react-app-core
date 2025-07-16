import { useGetDevice, useRoomLevelControls } from '../../../store';
import { LevelControlsState } from '../../../types/state/state/LevelControlsState';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * hook that controls a device that implements the ILevelControls interface
 * @param key key of the device
 * @returns 
 */
export function useILevelControls(key: string): ILevelControlsReturn | undefined {
  const { sendMessage, sendSimpleMessage } = useWebsocketContext();
  const device = useGetDevice<LevelControlsState>(key);
  const room = useRoomLevelControls(key);

  const state: LevelControlsState | undefined = device || room;

  if (!state) return undefined;

  const setLevel = (levelKey: string, value: number) =>
    sendSimpleMessage(`${levelKey}/level`, value);

  const muteToggle = (levelKey: string) => sendMessage(`${levelKey}/muteToggle`, null);

  const muteOn = (levelKey: string) => sendMessage(`${levelKey}/muteOn`, null);

  const muteOff = (levelKey: string) => sendMessage(`${levelKey}/muteOff`, null);

  return {
    levelState: state,
    setLevel,
    muteToggle,
    muteOn,
    muteOff,
  };
}

export interface ILevelControlsReturn {
  levelState: LevelControlsState;
  setLevel: (levelKey: string, value: number) => void;
  muteToggle: (levelKey: string) => void;
  muteOn: (levelKey: string) => void;
  muteOff: (levelKey: string) => void;
}

