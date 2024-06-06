import { useWebsocketContext } from 'src/lib';

export function useSystemControl() {
  const { sendMessage } = useWebsocketContext();

  const reboot = () => {
    sendMessage('/system/reboot', null);
  };

  const programReset = () => {
    sendMessage(`/system/programReset`, null);
  }

  return {
    reboot,
    programReset,
  };
}