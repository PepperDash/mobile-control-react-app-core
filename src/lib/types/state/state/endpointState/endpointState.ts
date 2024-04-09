import { DeviceState } from '../DeviceState';
import { HdmiInputState } from './hdmiInputState';
import { HdmiOutputState } from './hdmiOutputState';

export interface EndpointState extends DeviceState {
  hdmiInputs: Record<string, HdmiInputState>;
  hdmiOutputs: Record<string, HdmiOutputState>;
}