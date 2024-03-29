import { useEffect } from "react";
import { RoomConfiguration } from 'src/lib/types/state/state';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';


/**
 * This hook will send messages to the websocket to get the state of all devices in the room
 */
export const useGetAllDeviceStateFromRoomConfiguration = ({config}: {config: RoomConfiguration | undefined}) => {
  const { sendMessage } = useWebsocketContext();

  useEffect(() => {
    if (!config) {
      return
    }

    const deviceKeys = [];

    config.displayKeys.forEach((d) => {
      deviceKeys.push(d);
    });

    config.touchpanelKeys?.forEach((d) => {
      deviceKeys.push(d);
    });

    config.environmentalDevices.forEach((d) => {
      deviceKeys.push(d);
    });

    if (config.audioCodecKey) {
      deviceKeys.push(config.audioCodecKey);
    }

    if (config.videoCodecKey) {
      deviceKeys.push(config.videoCodecKey);
    }

    for (const value of Object.values(config.sourceList)) {
      deviceKeys.push(value.sourceKey);
    }

    deviceKeys.forEach((dk) => {
      sendMessage(`/device/${dk}/fullStatus`, { deviceKey: dk });
    });
  }, [config, sendMessage]);
};
