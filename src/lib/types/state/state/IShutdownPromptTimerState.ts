import { RoomState } from './RoomState';

export interface IShutdownPromptTimerState extends RoomState {
  secondsRemaining?: number;
  percentageRemaining?: number;
  shutdownPromptSeconds: number;
}
