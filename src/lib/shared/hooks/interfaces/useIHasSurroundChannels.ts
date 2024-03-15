import { IHasSurroundChannelsState, useGetDevice } from 'src/lib';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';


export function useIHasSurroundChannels(key: string): IHasSurroundChannelsReturn | undefined {
  const { sendMessage } = useWebsocketContext();

  const surroundChannels = useGetDevice<IHasSurroundChannelsState>(key);

  const setDefaultChannelLevels = () => {
    sendMessage(`/device/${key}/setDefaultChannelLevels`, null);
  }

  const getFullStatus = () => {
    if(surroundChannels?.surroundChannels === undefined) return;
    const channelKeys = Object.keys(surroundChannels?.surroundChannels);
    channelKeys.forEach((channel) => {
      sendMessage(`/device/${key}/${channel}/fullStatus`, null);
    });
  }

  return { surroundChannels, setDefaultChannelLevels, getFullStatus };
}

export interface IHasSurroundChannelsReturn {
  surroundChannels: IHasSurroundChannelsState | undefined;
  setDefaultChannelLevels: () => void;
  getFullStatus: () => void;
}