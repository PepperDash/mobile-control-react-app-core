import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';

/**
 * Hook to subscribe to a device that implements IZoomWirelessShareInstructions.
 * Provides wireless sharing status (pairing codes, connection state, sharing key).
 * Status-only (no actions).
 * @param key device key
 * @returns
 */
export function useIZoomWirelessShareInstructions(
  key: string,
): IZoomWirelessShareInstructionsReturn | undefined {
  const state = useGetDevice<IZoomWirelessShareInstructionsState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    return { state };
  }, [state]);
}

export interface ZoomSharingInfo {
  directPresentationPairingCode?: string;
  directPresentationSharingKey?: string;
  dispState?: string;
  isAirHostClientConnected?: boolean;
  isBlackMagicConnected?: boolean;
  isBlackMagicDataAvailable?: boolean;
  isDirectPresentationConnected?: boolean;
  isSharingBlackMagic?: boolean;
  password?: string;
  serverName?: string;
  wifiName?: string;
}

export interface IZoomWirelessShareInstructionsState extends DeviceState {
  shareInfo?: ZoomSharingInfo;
}

export interface IZoomWirelessShareInstructionsReturn {
  state: IZoomWirelessShareInstructionsState;
}
