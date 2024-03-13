import { SourceListItem } from '../sourceListItem';
import { DeviceState } from './DeviceState';

export interface IHasCurrentSourceInfoChangeState extends DeviceState {
  currentSourceKey: string;
  currentSource: SourceListItem;
}