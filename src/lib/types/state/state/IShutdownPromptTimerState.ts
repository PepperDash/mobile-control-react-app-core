import { DeviceState } from './DeviceState';

export interface IShutdownPromptTimerState extends DeviceState {
  secondsRemaining?: number;
  percentageRemaining?: number;
  shutdownPromptSeconds: number;
}
