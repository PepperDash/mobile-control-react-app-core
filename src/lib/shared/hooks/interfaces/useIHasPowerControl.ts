import { useWebsocketContext } from 'src/lib/utils/useWebsocketContext';

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