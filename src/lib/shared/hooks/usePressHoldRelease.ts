import { useRef } from 'react';


/**
 * This hook is used to link up the functions to trigger for a button that can be pressed and held
 * @param onPress function to call when the pointer is pressed
 * @param onRelease function to call when the pointer is released
 * @param onHold function to call when the pointer is held
 * @param holdTimeMs time in milliseconds to hold before onHold is called 
 * @returns an object that can be easily applied to a button or other element using a spread operator to attach to the element events
 * @example
 * const button1 = usePressHoldRelease({
 *  onPress: () => console.log('pressed'),
 *  onRelease: () => console.log('released'),
 *  onHold: () => console.log('held'),
 *  holdTimeMs: 2000
 * });
 * 
 * // use the spread operator to attach the events to the button
 * <button {...button1}>Press and Hold</button>
 */
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

