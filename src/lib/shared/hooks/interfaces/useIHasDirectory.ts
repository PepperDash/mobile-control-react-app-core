import { useMemo } from 'react';
import { DeviceState, useGetDevice } from '../../..';
import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * Hook to interact with a device that implements IHasDirectory.
 * Provides directory browsing state and actions for navigating the phonebook directory.
 * @param key device key
 * @returns
 */
export function useIHasDirectory(key: string): IHasDirectoryReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const state = useGetDevice<IHasDirectoryState>(key);

  return useMemo(() => {
    if (!state) return undefined;

    const path = `/device/${key}`;

    const getDirectory = () => sendMessage(`${path}/getDirectory`, null);

    const directoryById = (folderId: string) =>
      sendMessage(`${path}/directoryById`, { value: folderId });

    const directorySearch = (searchString: string) =>
      sendMessage(`${path}/directorySearch`, { value: searchString });

    const directoryBack = () => sendMessage(`${path}/directoryBack`, null);

    return {
      state,
      getDirectory,
      directoryById,
      directorySearch,
      directoryBack,
    };
  }, [key, sendMessage, state]);
}

export interface DirectoryContactMethod {
  contactMethodId?: string;
  number?: string;
  device?: string;
  contactMethodType?: string;
}

export interface DirectoryContact {
  contactId?: string;
  name?: string;
  title?: string;
  contactMethods?: DirectoryContactMethod[];
}

export interface DirectoryFolder {
  name?: string;
  folderId?: string;
}

export interface CodecDirectory {
  contacts?: DirectoryContact[];
  folders?: DirectoryFolder[];
  resultsFolderId?: string;
}

export interface IHasDirectoryState extends DeviceState {
  currentDirectory?: CodecDirectory;
  initialPhonebookSyncComplete?: boolean;
  hasDirectory?: boolean;
  hasDirectorySearch?: boolean;
  directorySelectedFolderName?: string;
}

export interface IHasDirectoryReturn {
  state: IHasDirectoryState;
  getDirectory: () => void;
  directoryById: (folderId: string) => void;
  directorySearch: (searchString: string) => void;
  directoryBack: () => void;
}
