import { useGetDevice } from "src/lib/store";
import { Volume } from "src/lib/types";
import { useWebsocketContext } from "src/lib/utils/useWebsocketContext";
import { useButtonHeldHeartbeat } from "../useHeldButtonAction";
import { PressHoldReleaseReturn } from "../usePressHoldRelease";

export function useIBasicVolumeWithFeedback(
  key: string
): IBasicVolumeWithFeedbackProps | undefined {
  const { sendMessage, sendSimpleMessage } = useWebsocketContext();
  const volumeState = useGetDevice<Volume>(key);

  const volumeUp = useButtonHeldHeartbeat(`/device/${key}`, "volumeUp");
  const volumeDown = useButtonHeldHeartbeat(`/device/${key}`, "volumeDown");

  if (!volumeState) return undefined;

  const setLevel = (value: number) =>
    sendSimpleMessage(`/device/${key}/level`, value);

  const muteToggle = () => sendMessage(`/device/${key}/muteToggle`, null);

  const muteOn = () => sendMessage(`/device/${key}/muteOn`, null);

  const muteOff = () => sendMessage(`/device/${key}/muteOff`, null);

  return {
    volumeState,
    volumeUp,
    volumeDown,
    setLevel,
    muteToggle,
    muteOn,
    muteOff,
  };
}

export interface IBasicVolumeWithFeedbackProps {
  volumeState: Volume;
  volumeUp: PressHoldReleaseReturn;
  volumeDown: PressHoldReleaseReturn;
  setLevel: (level: number) => void;
  muteToggle: () => void;
  muteOn: () => void;
  muteOff: () => void;
}
