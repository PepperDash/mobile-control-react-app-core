import { useGetDevice } from '../../..';
import { CameraPresetItem, IHasCameraPresetsState } from '../../../types';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to control a device that implements the IHasCameraPresets interface.
 * Provides methods for recalling and saving camera presets.
 * @param key key of the device
 * @returns
 */
export function useIHasCameraPresets(
  key: string,
): IHasCameraPresetsReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const presets = useGetDevice<IHasCameraPresetsState>(key)?.presets;

  const recallPreset = (preset: number) => {
    sendMessage(`/device/${key}/recallPreset`, { value: preset });
  };

  const savePreset = (preset: number) => {
    sendMessage(`/device/${key}/storePreset`, { value: preset });
  };

  if (!presets) return undefined;

  return { recallPreset, savePreset, presets };
}

export interface IHasCameraPresetsReturn {
  recallPreset: (preset: number) => void;
  savePreset: (preset: number) => void;
  presets: CameraPresetItem[];
}
