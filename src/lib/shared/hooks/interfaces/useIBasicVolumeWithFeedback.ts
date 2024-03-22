import { Volume } from "src/lib/types";
import { useWebsocketContext } from "src/lib/utils/useWebsocketContext";
import { useButtonHeldHeartbeat } from "../useHeldButtonAction";
import { PressHoldReleaseReturn } from "../usePressHoldRelease";

export function useIBasicVolumeWithFeedback(
  path: string, volumeState: Volume | undefined
): IBasicVolumeWithFeedbackReturn | undefined {
  const { sendMessage, sendSimpleMessage } = useWebsocketContext();

  const volumeUp = useButtonHeldHeartbeat(`${path}`, "volumeUp");
  const volumeDown = useButtonHeldHeartbeat(`${path}`, "volumeDown");

  if (!volumeState) return undefined;

  const setLevel = (value: number) =>
    sendSimpleMessage(`${path}/level`, value);

  const muteToggle = () => sendMessage(`${path}/muteToggle`, null);

  const muteOn = () => sendMessage(`${path}/muteOn`, null);

  const muteOff = () => sendMessage(`${path}/muteOff`, null);

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

export interface IBasicVolumeWithFeedbackReturn {
  volumeState: Volume;
  volumeUp: PressHoldReleaseReturn;
  volumeDown: PressHoldReleaseReturn;
  setLevel: (level: number) => void;
  muteToggle: () => void;
  muteOn: () => void;
  muteOff: () => void;
}

export function useGetIBasicVolumeWithFeedback(
  path: string, volumeState: Volume | undefined
): IBasicVolumeWithFeedbackReturn | undefined {
  const { sendMessage, sendSimpleMessage } = useWebsocketContext();

  const volumeUp = useButtonHeldHeartbeat(`${path}`, "volumeUp");
  const volumeDown = useButtonHeldHeartbeat(`${path}`, "volumeDown");

  if (!volumeState) return undefined;

  const setLevel = (value: number) =>
    sendSimpleMessage(`${path}/level`, value);

  const muteToggle = () => sendMessage(`${path}/muteToggle`, null);

  const muteOn = () => sendMessage(`${path}/muteOn`, null);

  const muteOff = () => sendMessage(`${path}/muteOff`, null);

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