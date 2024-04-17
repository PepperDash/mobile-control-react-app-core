import { useRef } from 'react';

export function usePressHoldRelease({
  onPress,
  onRelease,
  onHold,
  holdTimeMs = 500,
}: PressHoldReleaseParams) {
  const holdTimer = useRef<NodeJS.Timeout | null>(null);
  const pressed = useRef(false);

  function onPointerDown() {

    pressed.current = true;
    onPress?.();

    holdTimer.current = setTimeout(() => {
      onHold?.();
      holdTimer.current = null;
    }, holdTimeMs);
  }

  function onPointerUp() {
    pressed.current = false;
    onRelease?.();
    if (holdTimer.current) {
      clearTimeout(holdTimer.current);
      holdTimer.current = null;
    }
  }

  function onPointerLeave() {
    if(pressed.current) {
      onPointerUp();
    }
  }

  return {
    onPointerDown,
    onPointerUp,
    onPointerLeave
  };
}

interface PressHoldReleaseParams {
  onPress?: () => void;
  onRelease?: () => void;
  onHold?: () => void;
  /** Defaults to 500ms */
  holdTimeMs?: number;
}

export type PressHoldReleaseReturn =  ReturnType<typeof usePressHoldRelease>;

