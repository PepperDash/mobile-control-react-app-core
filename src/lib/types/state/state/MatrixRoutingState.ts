import { SignalType } from 'src/lib/shared';
import { IKeyName } from '../../interfaces';
import { IOnline } from '../../interfaces/IOnline';
import { DeviceState } from './DeviceState';

export interface MatrixRoutingState {
  inputs: Record<string, InputSlot>;
  outputs: Record<string, OutputSlot>;
}

export interface InputSlot extends DeviceState, IKeyName, IOnline, IVideoSync  {
  txDeviceKey: string;
}

export interface OutputSlot extends IKeyName {
  rxDeviceKey: string;

  currentRoutes: Record<SignalType, InputSlot>;
}

export interface IVideoSync {
  videoSyncDetected: boolean;
}