import { useButtonHeldHeartbeat } from '../useButtonHeldHeartbeat';
import { PressHoldReleaseReturn } from '../usePressHoldRelease';

/**
 * hook that controls a device that implements the ITransport interface
 * @param key key of the device
 * @returns
 */
export function useITransport(key: string): ITransportProps | undefined {
  const path = `/device/${key}`;

  const play = useButtonHeldHeartbeat(path, 'play');

  const pause = useButtonHeldHeartbeat(path, 'pause');

  const stop = useButtonHeldHeartbeat(path, 'stop');

  const prevTrack = useButtonHeldHeartbeat(path, 'prevTrack');

  const nextTrack = useButtonHeldHeartbeat(path, 'nextTrack');

  const rewind = useButtonHeldHeartbeat(path, 'rewind');

  const fastForward = useButtonHeldHeartbeat(path, 'ffwd');

  const record = useButtonHeldHeartbeat(path, 'record');

  return {
    play,
    pause,
    stop,
    prevTrack,
    nextTrack,
    rewind,
    fastForward,
    record,
  };
}

interface ITransportProps {
  play: PressHoldReleaseReturn;
  pause: PressHoldReleaseReturn;
  stop: PressHoldReleaseReturn;
  prevTrack: PressHoldReleaseReturn;
  nextTrack: PressHoldReleaseReturn;
  rewind: PressHoldReleaseReturn;
  fastForward: PressHoldReleaseReturn;
  record: PressHoldReleaseReturn;
}
