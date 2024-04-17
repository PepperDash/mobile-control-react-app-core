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

   
    Object.values(config.destinations).forEach((d) => {
      deviceKeys.push(d);
    });

    config.touchpanelKeys?.forEach((d) => {
      deviceKeys.push(d);
    });

    config.environmentalDevices.forEach((d) => {
      deviceKeys.push(d.deviceKey);
    });

    if (config.audioCodecKey) {
      deviceKeys.push(config.audioCodecKey);
    }

    if (config.videoCodecKey) {
      deviceKeys.push(config.videoCodecKey);
    }

    if (config.matrixRoutingKey) {
      deviceKeys.push(config.matrixRoutingKey);
    }

    if (config.endpointKeys) {
      config.endpointKeys.forEach((ek) => {
        deviceKeys.push(ek);
      });
    }

    for (const value of Object.values(config.sourceList)) {
      // if the source has a source key, add it to the list of device keys
      if(value.sourceKey && value.sourceKey !== "$off")
        deviceKeys.push(value.sourceKey);
    }

    deviceKeys.forEach((dk) => {
      sendMessage(`/device/${dk}/fullStatus`, { deviceKey: dk });
    });
  }, [config, sendMessage]);
};
