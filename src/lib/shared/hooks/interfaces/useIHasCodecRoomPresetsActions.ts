import { useMemo } from 'react';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasCodecRoomPresets.
 * Provides actions for recalling and saving camera presets (action-only, no state).
 * @param key device key
 * @returns
 */
export function useIHasCodecRoomPresetsActions(
  key: string,
): IHasCodecRoomPresetsActionsReturn {
  const { sendMessage } = useWebsocketContext();

  return useMemo(() => {
    const path = `/device/${key}`;

    const recallPreset = (index: number) =>
      sendMessage(`${path}/recallPreset`, { value: index });

    const savePreset = (index: number, description?: string) =>
      sendMessage(`${path}/savePreset`, { index, description });

    return {
      recallPreset,
      savePreset,
    };
  }, [key, sendMessage]);
}

export interface IHasCodecRoomPresetsActionsReturn {
  recallPreset: (index: number) => void;
  savePreset: (index: number, description?: string) => void;
}
