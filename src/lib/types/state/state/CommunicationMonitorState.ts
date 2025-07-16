import { DeviceState } from './DeviceState';

export type MonitorStatus = 'StatusUnknown' | 'IsOk' | 'InWarning' | 'InError';

export interface CommunicationMonitorState extends DeviceState {
  isOnline: boolean;

  status: MonitorStatus;
}
