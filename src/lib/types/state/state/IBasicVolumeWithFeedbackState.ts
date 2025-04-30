import { DeviceState } from 'src/lib';
import { Volume } from '../volume/volume';

export interface IBasicVolumeWithFeedbackState extends DeviceState {
  volume: Volume;
}