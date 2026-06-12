import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements the IAudioCodecPhonebook interface.
 * Provides the phonebook entries and methods to set entries.
 * @param key device key
 * @returns
 */
export function useIAudioCodecPhonebook(
  key: string,
): IAudioCodecPhonebookReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const device = useGetDevice<IAudioCodecPhonebookState>(key);

  const actions = useMemo(() => {
    const path = `/device/${key}`;

    const setEntry = (index: number, name: string, number: string) =>
      sendMessage(`${path}/setEntry`, { index, name, number });

    return { setEntry };
  }, [key, sendMessage]);

  if (!device) return undefined;

  return {
    phonebookEntries: device.phonebookEntries ?? [],
    ...actions,
  };
}

export interface PhonebookEntry {
  name: string;
  number: string;
}

export interface IAudioCodecPhonebookState extends DeviceState {
  phonebookEntries?: PhonebookEntry[];
}

export interface IAudioCodecPhonebookReturn {
  phonebookEntries: PhonebookEntry[];
  setEntry: (index: number, name: string, number: string) => void;
}
