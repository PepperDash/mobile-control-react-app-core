import { useGetDevice } from 'src/lib/store';
import { LevelControlsState } from 'src/lib/types/state/state/LevelControlsState';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';


export function useILevelControls(key: string): ILevelControlsReturn | undefined {
  const { sendMessage, sendSimpleMessage } = useWebsocketContext();
  const device = useGetDevice<LevelControlsState>(key);

  if (!device) return undefined;

  const setLevel = (levelKey: string, value: number) =>
    sendSimpleMessage(`${levelKey}/level`, value);

  const muteToggle = (levelKey: string) => sendMessage(`${levelKey}/muteToggle`, null);

  const muteOn = (levelKey: string) => sendMessage(`${levelKey}/muteOn`, null);

  const muteOff = (levelKey: string) => sendMessage(`${levelKey}/muteOff`, null);

  return {
    levelState: device,
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

