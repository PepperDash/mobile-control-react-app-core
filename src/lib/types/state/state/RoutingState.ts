import { DeviceState } from 'src/lib';
import { SourceListItem } from '../sourceListItem';

export interface RoutingState extends DeviceState {
  selectedSourceKey: string;

  selectedSourceItem: SourceListItem;
}
