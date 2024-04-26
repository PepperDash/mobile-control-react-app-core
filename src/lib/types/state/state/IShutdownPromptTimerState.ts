import { DeviceState } from './DeviceState';

export interface IShutdownPromptTimerState extends DeviceState {
  timeRemaining?: number;
  shutdownPromptSeconds: number;
}

export interface IShutdownPromptTimerEvent {
  timerFinished: boolean;
  timerStarted: boolean;
  timerCancelled: boolean;
}