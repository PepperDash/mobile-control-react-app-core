import { useButtonHeldHeartbeat } from '../useHeldButtonAction';
import { PressHoldReleaseReturn } from '../usePressHoldRelease';

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



