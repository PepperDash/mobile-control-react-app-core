import { useButtonHeldHeartbeat } from '../useButtonHeldHeartbeat';
import { PressHoldReleaseReturn } from '../usePressHoldRelease';

/**
 * hook to control a channel messenger device that implements the IChannelMessenger interface
 * @param key the key of the device
 * @returns
 */
export function useIChannel(key: string): IChannelMessengerProps | undefined {
  const path = `/device/${key}`;

  const channelUp = useButtonHeldHeartbeat(path, 'chanUp');

  const channelDown = useButtonHeldHeartbeat(path, 'chanDown');

  const lastChannel = useButtonHeldHeartbeat(path, 'lastChan');

  const guide = useButtonHeldHeartbeat(path, 'guide');

  const info = useButtonHeldHeartbeat(path, 'info');

  const exit = useButtonHeldHeartbeat(path, 'exit');

  return { channelUp, channelDown, lastChannel, guide, info, exit };
}

export interface IChannelMessengerProps {
  channelUp: PressHoldReleaseReturn;
  channelDown: PressHoldReleaseReturn;
  lastChannel: PressHoldReleaseReturn;
  guide: PressHoldReleaseReturn;
  info: PressHoldReleaseReturn;
  exit: PressHoldReleaseReturn;
}
