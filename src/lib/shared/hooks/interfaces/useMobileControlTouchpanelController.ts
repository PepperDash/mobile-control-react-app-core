import { useGetDevice } from "src/lib/store";
import { MobileControlTouchpanelState } from "src/lib/types/state/state/MobileControlTouchpanelState";
import { useWebsocketContext } from "src/lib/utils/useWebsocketContext";

export function useMobileControlTouchpanelController(
  key: string
): MobileControlTouchpanelControllerReturn | undefined {
  const touchpanelState = useGetDevice(key) as
    | MobileControlTouchpanelState
    | undefined;

  const { sendMessage } = useWebsocketContext();

  // bail if state is undefined
  if (!touchpanelState) return undefined;

  const hideApp = () => {
    sendMessage(`/device/${key}/hideApp`, null);
  };

  const openApp = () => {
    sendMessage(`/device/${key}/openApp`, null);
  };

  const closeApp = () => {
    sendMessage(`/device/${key}/closeApp`, null);
  };

  const endCall = () => {
    sendMessage(`/device/${key}/endCall`, null);
  };

  return {
    touchpanelState,
    appControl: { hideApp, openApp, closeApp },
    zoomControl: { endCall },
  };
}

interface MobileControlTouchpanelControllerReturn {
  touchpanelState: MobileControlTouchpanelState;
  appControl: {
    hideApp: () => void;
    openApp: () => void;
    closeApp: () => void;
  };
  zoomControl: {
    endCall: () => void;
  };
}
