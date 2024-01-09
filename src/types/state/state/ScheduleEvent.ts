import { DaysOfWeek } from '../daysOfWeek.ts';

export class ScheduleEvent {
  key!: string;

  name!: string;

  time!: string;

  days!: DaysOfWeek;

  enable!: boolean;
}
