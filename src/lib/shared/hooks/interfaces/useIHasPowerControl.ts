import { useWebsocketContext } from '../../../utils/useWebsocketContext';

/**
 * hook to control a device that implements the IHasPowerControl interface
 * @param key key of the device
 * @returns 
 */
export function useIHasPowerControl(key: string): IHasPowerWithFeedbackProps {
  const { sendMessage } = useWebsocketContext();

  const powerOn = () => {
      sendMessage(`/device/${key}/powerOn`, null);
  };

  const powerOff = () => {
      sendMessage(`/device/${key}/powerOff`, null);
  };

  const powerToggle = () => {
      sendMessage(`/device/${key}/powerToggle`, null);
  }

  return { powerOn, powerOff, powerToggle };
}

export interface IHasPowerWithFeedbackProps {
  powerOn: () => void;
  powerOff: () => void;
  powerToggle: () => void;
}