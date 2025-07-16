import { DeviceState } from './DeviceState';
import { Volume } from '../volume/volume';

export interface IBasicVolumeWithFeedbackState extends DeviceState {
  volume: Volume;
}