import { CommunicationMonitorState, useGetDevice } from 'src/lib';

export function useICommunicationMonitor(key: string): ICommunicationMonitorReturn | undefined {
  const device = useGetDevice<CommunicationMonitorState>(key);

  if (!device) return undefined;

  return {
    communicationMonitorState: device,
  };
}

export interface ICommunicationMonitorReturn {
  communicationMonitorState: CommunicationMonitorState;
}