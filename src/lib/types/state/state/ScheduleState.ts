import { DeviceState } from './DeviceState';
import { ScheduleEvent } from './ScheduleEvent';

export interface ScheduleState extends DeviceState {
  scheduleEvents: ScheduleEvent[];
}
