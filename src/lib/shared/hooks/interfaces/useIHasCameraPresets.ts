import { useGetDevice } from 'src/lib';
import { CameraPresetItem, IHasCameraPresetsState } from 'src/lib/types';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to control a device that implements the IHasCameraPresets interface
 * @param key key of the device
 * @returns
 */
export function useIHasCameraPresets(
  key: string,
): IHasCameraPresetsProps | undefined {
  const { sendMessage } = useWebsocketContext();
  const presets = useGetDevice<IHasCameraPresetsState>(key)?.presets;

  const recallPreset = (preset: number) => {
    sendMessage(`/device/${key}/recallPreset`, preset);
  };

  const savePreset = (preset: number) => {
    sendMessage(`/device/${key}/savePreset`, preset);
  };

  if (!presets) return undefined;

  return { recallPreset, savePreset, presets };
}

export interface IHasCameraPresetsProps {
  recallPreset: (preset: number) => void;
  savePreset: (preset: number) => void;
  presets?: CameraPresetItem[];
}
