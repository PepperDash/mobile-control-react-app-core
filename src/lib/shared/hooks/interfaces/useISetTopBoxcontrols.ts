import { useButtonHeldHeartbeat } from '../useButtonHeldHeartbeat';
import { PressHoldReleaseReturn } from '../usePressHoldRelease';

/**
 * hook to control a device that implements the ISetTopBoxControls interface
 * @param key key of the device
 * @returns
 */
export function useISetTopBoxControls(key: string): ISetTopBoxControlsProps {
  const path = `/device/${key}`;

  const dvrList = useButtonHeldHeartbeat(path, 'chanUp');

  const replay = useButtonHeldHeartbeat(path, 'chanDown');

  return { dvrList, replay };
}

interface ISetTopBoxControlsProps {
  dvrList: PressHoldReleaseReturn;
  replay: PressHoldReleaseReturn;
}
