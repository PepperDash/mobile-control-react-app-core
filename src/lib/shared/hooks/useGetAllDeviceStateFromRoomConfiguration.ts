import { useEffect } from 'react';
import { RoomConfiguration } from '../../types/state/state';
import { useWebsocketContext } from '../../utils/useWebsocketContext';

/**
 * This hook will gather up all the keys for devices in the room
 * and  send messages to the websocket to get the iniital state
 * for each device
 */
export const useGetAllDeviceStateFromRoomConfiguration = ({
  config,
}: {
  config: RoomConfiguration | undefined;
}) => {
  const { sendMessage } = useWebsocketContext();

  useEffect(() => {
    if (!config) {
      return;
    }

    const deviceKeysSet: Set<string> = new Set<string>();

    if (config.destinations) {
      Object.values(config.destinations).forEach((d) => {
        deviceKeysSet.add(d);
      });
    }

    if (config.destinationList) {
      Object.values(config.destinationList).forEach((dli) => {
        deviceKeysSet.add(dli.sinkKey);
      });
    }

    if (config.audioControlPointList) {
      Object.values(config.audioControlPointList?.levelControls).forEach(
        (lcl) => {
          // if the level control has an item key, combine it with the parent device key
          if (lcl.itemKey) {
            deviceKeysSet.add(lcl.parentDeviceKey + '--' + lcl.itemKey);
          } else {
            deviceKeysSet.add(lcl.parentDeviceKey);
          }
        }
      );
    }

    config.touchpanelKeys?.forEach((d) => {
      deviceKeysSet.add(d);
    });

    config.environmentalDevices?.forEach((d) => {
      if (d.deviceKey) deviceKeysSet.add(d.deviceKey);
    });

    config.accessoryDeviceKeys?.forEach((d) => {
      deviceKeysSet.add(d);
    });

    if (config.audioCodecKey) {
      deviceKeysSet.add(config.audioCodecKey);
    }

    if (config.videoCodecKey) {
      deviceKeysSet.add(config.videoCodecKey);
    }

    if (config.matrixRoutingKey) {
      deviceKeysSet.add(config.matrixRoutingKey);
    }

    if (config.roomCombinerKey) {
      deviceKeysSet.add(config.roomCombinerKey);
    }

    if (config.endpointKeys) {
      config.endpointKeys.forEach((ek) => {
        deviceKeysSet.add(ek);
      });
    }

    if (config.sourceList) {
      for (const value of Object.values(config.sourceList)) {
        // if the source has a source key, add it to the list of device keys
        if (value.sourceKey && value.sourceKey !== '$off')
          deviceKeysSet.add(value.sourceKey);
      }
    }

    console.log('requesting state for deviceKeys:', deviceKeysSet);

    deviceKeysSet.forEach((dk) => {
      sendMessage(`/device/${dk}/fullStatus`, { deviceKey: dk });
    });
  }, [config, sendMessage]);
};
