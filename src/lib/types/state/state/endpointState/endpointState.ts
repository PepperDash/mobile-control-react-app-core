import { CommunicationMonitorState } from '../CommunicationMonitorState';
import { DeviceState } from '../DeviceState';
import { HdmiInputState } from './hdmiInputState';
import { HdmiOutputState } from './hdmiOutputState';

export interface EndpointState extends DeviceState {
  friendlyName: string;
  commMonitor: CommunicationMonitorState;
  isStreamingSecondaryAudio: boolean;
  secondaryAudioStreamStatus: string;
  secondaryAudioStreamUrl: string;
  isStreamingVideo: boolean;
  videoStreamStatus: string;
  streamUrl: string;
  multicastAddress: string;
  isTransmitter: boolean;
  hdmiInputs: Record<string, HdmiInputState>;
  hdmiOutputs: Record<string, HdmiOutputState>;
}