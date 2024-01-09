import { DeviceState } from './DeviceState.ts';
import { ScheduleEvent } from './ScheduleEvent.ts';

export class ScheduleState extends DeviceState {
  scheduleEvents!: ScheduleEvent[];
}
