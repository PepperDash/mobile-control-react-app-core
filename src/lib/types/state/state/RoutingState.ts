import { SourceListItem } from '../sourceListItem';
import { DeviceState } from './DeviceState';

export interface RoutingState extends DeviceState {
  selectedSourceKey: string;

  selectedSourceItem: SourceListItem;
}
