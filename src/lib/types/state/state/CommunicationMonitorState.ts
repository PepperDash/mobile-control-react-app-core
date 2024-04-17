export type MonitorStatus = 'StatusUnknown' | 'IsOk' | 'InWarning' | 'InError';

export interface CommunicationMonitorState {
  isOnline: boolean;

  status: MonitorStatus;
}
