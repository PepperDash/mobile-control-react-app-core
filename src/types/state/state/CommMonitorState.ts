export type MonitorStatus = 'StatusUnknown' | 'IsOk' | 'InWarning' | 'InError';

export interface CommMonitorState {
  isOnline: boolean;

  status: MonitorStatus;
}
