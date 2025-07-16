import { CommunicationMonitorState, useGetDevice } from '../../..';


/**
 * hook to control a device that implements the ICommunicationMonitor interface
 * @param key key of the device
 * @returns 
 */
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