import { useButtonHeldHeartbeat } from '../useHeldButtonAction';
import { PressHoldReleaseReturn } from '../usePressHoldRelease';

export function useIColor(key: string): IColorProps | undefined {
  const path = `/device/${key}`;

  const red = useButtonHeldHeartbeat(path, 'red');
  
  const green = useButtonHeldHeartbeat(path, 'green');

  const yellow = useButtonHeldHeartbeat(path, 'yellow');

  const blue = useButtonHeldHeartbeat(path, 'blue');

  return { red, green, yellow, blue };
}

export interface IColorProps {
  red: PressHoldReleaseReturn;
  green: PressHoldReleaseReturn;
  yellow: PressHoldReleaseReturn;
  blue: PressHoldReleaseReturn;
}




