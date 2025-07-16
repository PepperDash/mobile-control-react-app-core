import { DeviceState } from './DeviceState';
import { SourceListItem } from '../sourceListItem';

export interface RoutingState extends DeviceState {
  selectedSourceKey: string;

  selectedSourceItem: SourceListItem;
}
