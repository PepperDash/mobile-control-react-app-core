import { DaysOfWeek } from '../daysOfWeek';

export interface ScheduleEvent {
  key: string;

  name: string;

  time: string;

  days: DaysOfWeek;

  enable: boolean;
}
