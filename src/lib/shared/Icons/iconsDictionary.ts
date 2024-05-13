import { MultiIconFC } from "../Buttons/IconButton/IconButton";
import { IconMultiController, IconMultiRoomPC } from './MultiStateIcons';
import { IconMultiMic } from './MultiStateIcons/IconMultMic';
import { IconMultiAlert } from "./MultiStateIcons/IconMultiAlert";
import { IconMultiBan } from './MultiStateIcons/IconMultiBan';
import { IconMultiCamera } from "./MultiStateIcons/IconMultiCamera";
import { IconMultiCheck } from './MultiStateIcons/IconMultiCheck';
import { IconMultiDownArrow } from "./MultiStateIcons/IconMultiDownArrow";
import { IconMultiElipses } from './MultiStateIcons/IconMultiElipses';
import { IconMultiFlag } from './MultiStateIcons/IconMultiFlag';
import { IconMultiGear } from './MultiStateIcons/IconMultiGear';
import { IconMultiGlass } from './MultiStateIcons/IconMultiGlass';
import { IconMultiHdmi } from './MultiStateIcons/IconMultiHdmi';
import { IconMultiLaptop } from './MultiStateIcons/IconMultiLaptop';
import { IconMultiLeftArrow } from './MultiStateIcons/IconMultiLeftArrow';
import { IconMultiLight } from './MultiStateIcons/IconMultiLight';
import { IconMultiMoon } from './MultiStateIcons/IconMultiMoon';
import { IconMultiPlaystation } from './MultiStateIcons/IconMultiPlaystation';
import { IconMultiPodium } from './MultiStateIcons/IconMultiPodium';
import { IconMultiPower } from './MultiStateIcons/IconMultiPower';
import { IconMultiPrivacy } from './MultiStateIcons/IconMultiPrivacy';
import { IconMultiQuestion } from './MultiStateIcons/IconMultiQuestion';
import { IconMultiRightArrow } from './MultiStateIcons/IconMultiRightArrow';
import { IconMultiShade } from './MultiStateIcons/IconMultiShade';
import { IconMultiSun } from './MultiStateIcons/IconMultiSun';
import { IconMultiUpArrow } from './MultiStateIcons/IconMultiUpArrow';
import { IconMultiVolDown } from './MultiStateIcons/IconMultiVolDown';
import { IconMultiVolMute } from './MultiStateIcons/IconMultiVolMute';
import { IconMultiVolUp } from './MultiStateIcons/IconMultiVolUp';
import { IconMultiWireless } from './MultiStateIcons/IconMultiWireless';
import { IconMultiX } from './MultiStateIcons/IconMultiX';
import { IconMultiXbox } from './MultiStateIcons/IconMultiXbox';

export type IconNames =
  | "Alert"
  | "Ban"
  | "Camera"
  | "Check"
  | "Controller"
  | "DownArrow"
  | "Elipses"
  | "Flag"
  | "Gear"
  | "Glass"
  | "Hdmi"
  | "Laptop"
  | "LeftArrow"
  | "Light"
  | "Mic"
  | "Moon"
  | "Playstation"
  | "Podium"
  | "Power"
  | "Privacy"
  | "Question"
  | "RightArrow"
  | "RoomPC"
  | "Shade"
  | "Sun"
  | "UpArrow"
  | "VolDown"
  | "VolMute"
  | "VolUp"
  | "Wireless"
  | "X"
  | "Xbox";

export const iconsDictionary: Record<
  IconNames,
  MultiIconFC
> = {
  Alert: IconMultiAlert,
  Camera: IconMultiCamera,
  DownArrow: IconMultiDownArrow,
  Ban: IconMultiBan,
  Check: IconMultiCheck,
  Controller: IconMultiController,
  Elipses: IconMultiElipses,
  Flag: IconMultiFlag,
  Gear: IconMultiGear,
  Glass: IconMultiGlass,
  Hdmi: IconMultiHdmi,
  Laptop: IconMultiLaptop,
  LeftArrow: IconMultiLeftArrow,
  Light: IconMultiLight,
  Mic: IconMultiMic,
  Moon: IconMultiMoon,
  Playstation: IconMultiPlaystation,
  Podium: IconMultiPodium,
  Power: IconMultiPower,
  Privacy: IconMultiPrivacy,
  Question: IconMultiQuestion,
  RightArrow: IconMultiRightArrow,
  RoomPC: IconMultiRoomPC,
  Shade: IconMultiShade,
  Sun: IconMultiSun,
  UpArrow: IconMultiUpArrow,
  VolDown: IconMultiVolDown,
  VolMute: IconMultiVolMute,
  VolUp: IconMultiVolUp,
  Wireless: IconMultiWireless,
  X: IconMultiX,
  Xbox: IconMultiXbox,
};
