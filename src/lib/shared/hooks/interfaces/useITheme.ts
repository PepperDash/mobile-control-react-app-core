import { useGetDevice } from "src/lib";
import { MobileControlTouchpanelState } from "src/lib/types/state/state/MobileControlTouchpanelState";
import { useWebsocketContext } from "src/lib/utils";

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