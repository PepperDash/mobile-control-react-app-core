import { useButtonHeldHeartbeat } from "../useHeldButtonAction";
import { PressHoldReleaseReturn } from "../usePressHoldRelease";

export function useIDPad(key: string): IDPadProps | undefined {
  const path = `/device/${key}`;

  const up = useButtonHeldHeartbeat(path, "up");
  const down = useButtonHeldHeartbeat(path, "down");
  const left = useButtonHeldHeartbeat(path, "left");
  const right = useButtonHeldHeartbeat(path, "right");
  const select = useButtonHeldHeartbeat(path, "select");
  const menu = useButtonHeldHeartbeat(path, "menu");
  const exit = useButtonHeldHeartbeat(path, "exit");

  return { up, down, left, right, select, menu, exit };
}

export interface IDPadProps {
  up: PressHoldReleaseReturn;
  down: PressHoldReleaseReturn;
  left: PressHoldReleaseReturn;
  right: PressHoldReleaseReturn;
  select: PressHoldReleaseReturn;
  menu: PressHoldReleaseReturn;
  exit: PressHoldReleaseReturn;
}
