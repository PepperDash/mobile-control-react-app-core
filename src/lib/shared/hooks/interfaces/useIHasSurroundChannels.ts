import { LevelControlsState, Volume, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * hook to control a device that implements the IHasSurroundChannels interface
 * @param key key of the device
 * @returns 
 */
export function useIHasSurroundChannels(key: string): IHasSurroundChannelsReturn | undefined {
  const { sendMessage } = useWebsocketContext();

  const surroundChannelState = useGetDevice<LevelControlsState>(key);

  const setDefaultChannelLevels = () => {
    sendMessage(`/device/${key}/setDefaultChannelLevels`, null);
  }

  const getFullStatus = () => {
    if(surroundChannelState?.levelControls === undefined) return;
    const channelKeys = Object.keys(surroundChannelState?.levelControls);
    channelKeys.forEach((channel) => {
      sendMessage(`/device/${key}/${channel}/fullStatus`, null);
    });
  }

  if(!surroundChannelState) return undefined;

  const levelControls = surroundChannelState.levelControls;

  return { levelControls, setDefaultChannelLevels, getFullStatus };
}

export interface IHasSurroundChannelsReturn {
  // surroundChannelState: LevelControlsState | undefined;
  levelControls: Record<string, Volume>;
  setDefaultChannelLevels: () => void;
  getFullStatus: () => void;
}