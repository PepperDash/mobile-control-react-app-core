import { IKeyName, useWebsocketContext } from '../../..';

/**
 * hook to control a device that implements the IDspPresets interface
 * @param key key of the device
 * @returns
 */
export function useIDspPresets(key: string) {
  const { sendMessage } = useWebsocketContext();

  const recallPreset = (presetKey: string | IKeyName) => {
    // If presetKey is an object, use its key property; otherwise, use presetKey directly
    // The messenger is expecting the 'content' object to be just a string that is the key of the preset to recall
    sendMessage(
      `/device/${key}/recallPreset`,
      (presetKey as IKeyName).key || presetKey
    );
  };

  return { recallPreset };
}
