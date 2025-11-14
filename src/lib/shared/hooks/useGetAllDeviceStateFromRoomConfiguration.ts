import { useCallback, useEffect, useMemo, useRef } from 'react';
import { RoomConfiguration } from '../../types/state/state';
import { useWebsocketContext } from '../../utils/useWebsocketContext';

/**
 * This hook will gather up all the keys for devices in the room
 * and send messages to the websocket to get the initial state
 * for each device.
 *
 * @param config - Room configuration containing device keys
 * @param requestStatus - Whether to request device status (default: true)
 * @returns Set of device keys found in the configuration
 */
export const useGetAllDeviceStateFromRoomConfiguration = (
  {
    config,
  }: {
    config: RoomConfiguration | undefined;
  },
  requestStatus: boolean = true
) => {
  const { sendMessage } = useWebsocketContext();
  const hasRequestedRef = useRef(false);

  // Step 1: Memoize the collection of device keys (pure computation)
  const deviceKeysSet = useMemo(() => {
    const keys: Set<string> = new Set<string>();

    if (!config) {
      return keys;
    }

    if (config.destinations) {
      Object.values(config.destinations).forEach((d) => {
        keys.add(d);
      });
    }

    if (config.destinationList) {
      Object.values(config.destinationList).forEach((dli) => {
        keys.add(dli.sinkKey);
      });
    }

    if (config.audioControlPointList) {
      Object.values(config.audioControlPointList?.levelControls).forEach(
        (lcl) => {
          // if the level control has an item key, combine it with the parent device key
          if (lcl.itemKey) {
            keys.add(lcl.parentDeviceKey + '--' + lcl.itemKey);
          } else {
            keys.add(lcl.parentDeviceKey);
          }
        }
      );
    }

    config.touchpanelKeys?.forEach((d) => {
      keys.add(d);
    });

    config.environmentalDevices?.forEach((d) => {
      if (d.deviceKey) keys.add(d.deviceKey);
    });

    config.accessoryDeviceKeys?.forEach((d) => {
      keys.add(d);
    });

    if (config.audioCodecKey) {
      keys.add(config.audioCodecKey);
    }

    if (config.videoCodecKey) {
      keys.add(config.videoCodecKey);
    }

    if (config.matrixRoutingKey) {
      keys.add(config.matrixRoutingKey);
    }

    if (config.roomCombinerKey) {
      keys.add(config.roomCombinerKey);
    }

    if (config.endpointKeys) {
      config.endpointKeys.forEach((ek) => {
        keys.add(ek);
      });
    }

    if (config.sourceList) {
      for (const value of Object.values(config.sourceList)) {
        // if the source has a source key, add it to the list of device keys
        if (value.sourceKey && value.sourceKey !== '$off')
          keys.add(value.sourceKey);
      }
    }

    return keys;
  }, [config]);

  // Step 2: Create a stable callback for requesting device status
  const requestDeviceStatus = useCallback(() => {
    if (!requestStatus || deviceKeysSet.size === 0 || hasRequestedRef.current) {
      return;
    }

    console.log('requesting state for deviceKeys:', deviceKeysSet);

    deviceKeysSet.forEach((dk) => {
      sendMessage(`/device/${dk}/fullStatus`, { deviceKey: dk });
    });

    hasRequestedRef.current = true;
  }, [deviceKeysSet, requestStatus, sendMessage]);

  // Step 3: Request device status when deviceKeysSet changes
  useEffect(() => {
    // Reset the ref when deviceKeysSet changes (new room/config)
    hasRequestedRef.current = false;
    requestDeviceStatus();
  }, [requestDeviceStatus]);

  return deviceKeysSet;
};
