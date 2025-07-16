import { useRef } from 'react';
import { useWebsocketContext } from '../../utils/useWebsocketContext';
import { usePressHoldRelease } from './usePressHoldRelease';

/**
 * This hook is used to return the functions to trigger for a button that can be pressed and held
 * @param path the prefix path for the command
 * @param command the suffix command for the path
 * @returns an object that can be easily applied to a button or other element using a spread operator to attach to the element events
 * @example 
 * const path = `/device/${key}`;
 * 
 * // use the hook without destucturing
 * const numericKey = useButtonHeldHeartbeat(path, 'num0');
 * <button {...numericKey.digit0}>0</button>
 * 
 * // use the hook with destructuring
 * const { digit0 } = useButtonHeldHeartbeat(path, 'num0');
 * <button {...digit0}>0</button>
 */
export function useButtonHeldHeartbeat(path: string, command: string) {
  const repeatIntervalMs = 250;
  const { sendMessage } = useWebsocketContext();
  const held = useRef<NodeJS.Timeout | null>(null);

  function onPress() {
    sendMessage(`${path}/${command}`, { value: 'pressed' });

    if(!held.current) {
      held.current = setInterval(() => {
        sendMessage(`${path}/${command}`, { value: 'held' } );
      }, repeatIntervalMs);
    }
  }

  function onRelease() {
    if(held.current) {
      clearInterval(held.current);
      held.current = null;
    }
    sendMessage(`${path}/${command}`, { value:  'released' });
  }


  return usePressHoldRelease( {onPress, onRelease });
}

export interface HeldActionReturn {
  onPress: () => void;
  onRelease: () => void;
}