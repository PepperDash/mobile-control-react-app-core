import { DeviceState } from './DeviceState';

export interface IShutdownPromptTimerState extends DeviceState {
  timeRemaining?: string;
  percentageRemaining?: number;
  shutdownPromptSeconds: number;
}
