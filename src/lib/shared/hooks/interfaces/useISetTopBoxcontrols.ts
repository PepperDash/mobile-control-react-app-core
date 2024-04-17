import { useButtonHeldHeartbeat } from '../useHeldButtonAction';
import { PressHoldReleaseReturn } from '../usePressHoldRelease';

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