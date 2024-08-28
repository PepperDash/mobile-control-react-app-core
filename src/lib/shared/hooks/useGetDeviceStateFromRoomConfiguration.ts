import { useEffect } from "react";
import { RoomConfiguration } from 'src/lib/types/state/state';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';


/**
 * This hook will gather up all the keys for devices in the room
 * and  send messages to the websocket to get the iniital state 
 * for each device
 */
export const useGetAllDeviceStateFromRoomConfiguration = ({config}: {config: RoomConfiguration | undefined}) => {
  const { sendMessage } = useWebsocketContext();

  useEffect(() => {
    if (!config) {
      return
    }

    const deviceKeys = []

   
    Object.values(config.destinations).forEach((d) => {
      deviceKeys.push(d);
    });

    Object.values(config.destinationList).forEach((dli) => {
      deviceKeys.push(dli.sinkKey);
    });

    if(config.audioControlPointList) {
      Object.values(config.audioControlPointList?.levelControls).forEach((lcl) => {
        // if the level control has an item key, combine it with the parent device key
        if(lcl.itemKey) {
          deviceKeys.push(lcl.parentDeviceKey + "--" + lcl.itemKey);
        } else {
          deviceKeys.push(lcl.parentDeviceKey);
        }
      });
    }

    config.touchpanelKeys?.forEach((d) => {
      deviceKeys.push(d);
    });

    config.environmentalDevices.forEach((d) => {
      deviceKeys.push(d.deviceKey);
    });

    config.accessoryDeviceKeys?.forEach((d) => {
      deviceKeys.push(d);
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

    if (config.roomCombinerKey) {
      deviceKeys.push(config.roomCombinerKey);
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

    console.log("deviceKeys", deviceKeys);

    deviceKeys.forEach((dk) => {
      sendMessage(`/device/${dk}/fullStatus`, { deviceKey: dk });
    });
  }, [config, sendMessage]);
};
