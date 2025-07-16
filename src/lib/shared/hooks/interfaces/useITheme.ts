import { useGetDevice } from "../../..";
import { MobileControlTouchpanelState } from "../../../types/state/state/MobileControlTouchpanelState";
import { useWebsocketContext } from "../../../utils";

/**
 * hook that controls a device that implements the ITheme interface
 * @param touchpanelKey key of the touchpanel
 * @returns 
 */
export function useITheme(touchpanelKey: string):IThemeReturn {
  const { sendMessage } = useWebsocketContext();
  const tpState = useGetDevice<MobileControlTouchpanelState>(touchpanelKey);

  const saveTheme = (theme: string) => {
    sendMessage(`/device/${touchpanelKey}/saveTheme`, { value: theme });
  }

  return {
    currentTheme: tpState?.theme,
    saveTheme,
  }
}

interface IThemeReturn {
  currentTheme?: string;
  saveTheme: (theme: string) => void;
}