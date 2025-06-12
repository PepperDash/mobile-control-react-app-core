import { useEffect } from 'react';
import { RoomConfiguration } from 'src/lib/types/state/state';
import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';

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

    const deviceKeys: string[] = [];

    // Helper function to push device keys into the array and avoid duplicates
    // Also, avoid pushing '$off' as a device key
    function pushDeviceKey(key: string) {
      if (key && key !== '$off' && !deviceKeys.includes(key)) {
        deviceKeys.push(key);
      }
    }

    if (config.destinations) {
      Object.values(config.destinations).forEach((d) => {
        pushDeviceKey(d);
      });
    }

    if (config.destinationList) {
      Object.values(config.destinationList).forEach((dli) => {
        pushDeviceKey(dli.sinkKey);
      });
    }

    if (config.audioControlPointList) {
      Object.values(config.audioControlPointList?.levelControls).forEach(
        (lcl) => {
          // if the level control has an item key, combine it with the parent device key
          if (lcl.itemKey) {
            pushDeviceKey(lcl.parentDeviceKey + '--' + lcl.itemKey);
          } else {
            pushDeviceKey(lcl.parentDeviceKey);
          }
        }
      );
    }

    config.touchpanelKeys?.forEach((d) => {
      pushDeviceKey(d);
    });

    config.environmentalDevices?.forEach((d) => {
      if (d.deviceKey) pushDeviceKey(d.deviceKey);
    });

    config.accessoryDeviceKeys?.forEach((d) => {
      pushDeviceKey(d);
    });

    if (config.audioCodecKey) {
      pushDeviceKey(config.audioCodecKey);
    }

    if (config.videoCodecKey) {
      pushDeviceKey(config.videoCodecKey);
    }

    if (config.matrixRoutingKey) {
      pushDeviceKey(config.matrixRoutingKey);
    }

    if (config.roomCombinerKey) {
      pushDeviceKey(config.roomCombinerKey);
    }

    if (config.endpointKeys) {
      config.endpointKeys.forEach((ek) => {
        pushDeviceKey(ek);
      });
    }

    if (config.sourceList) {
      for (const value of Object.values(config.sourceList)) {
        // if the source has a source key, add it to the list of device keys
        if (value.sourceKey && value.sourceKey !== '$off')
          pushDeviceKey(value.sourceKey);
      }
    }

    console.log('requesting state for deviceKeys:', deviceKeys);

    deviceKeys.forEach((dk) => {
      sendMessage(`/device/${dk}/fullStatus`, { deviceKey: dk });
    });
  }, [config, sendMessage]);
};
