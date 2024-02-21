// import { useRef } from 'react';

// export function usePressHoldRelease({
//   onPress,
//   onRelease,
//   onHold,
//   holdTimeMs = 500,
// }: PressHoldReleaseParams) {
//   const holdTimer = useRef<number | null>(null);
//   const pressed = useRef(false);

//   function onPointerDown() {
//     pressed.current = true;
//     onPress?.();

//     // TODO: Figure out why this is yelling at me
//     holdTimer.current = setTimeout(() => {
//       onHold?.();
//       holdTimer.current = null;
//     }, holdTimeMs);
//   }

//   function onPointerUp() {
//     pressed.current = false;
//     onRelease?.();
//     if (holdTimer.current) {
//       clearTimeout(holdTimer.current);
//       holdTimer.current = null;
//     }
//   }

//   function onMouseLeave() {
//     if(pressed.current) {
//       onPointerUp();
//     }
//   }

//   return {
//     onPointerDown,
//     onPointerUp,
//     onMouseLeave
//   };
// }

// interface PressHoldReleaseParams {
//   onPress?: () => void;
//   onRelease?: () => void;
//   onHold?: () => void;
//   /** Defaults to 500ms */
//   holdTimeMs?: number;
// }
