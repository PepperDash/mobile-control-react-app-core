import { useButtonHeldHeartbeat } from '../useButtonHeldHeartbeat';
import { PressHoldReleaseReturn } from '../usePressHoldRelease';

/**
 * hook to control a device that implements the IDvr interface
 * @param key key of the device
 * @returns
 */
export function useIDvr(key: string): IDvrProps | undefined {
  const path = `/device/${key}`;

  const dvrList = useButtonHeldHeartbeat(path, 'dvrList');

  const record = useButtonHeldHeartbeat(path, 'record');

  return { dvrList, record };
}

interface IDvrProps {
  dvrList: PressHoldReleaseReturn;
  record: PressHoldReleaseReturn;
}
