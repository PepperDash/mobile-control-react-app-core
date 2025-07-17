import { SourceListItem } from '../sourceListItem';
import { DeviceState } from './DeviceState';

/**
 * Interface representing the state of current source information changes.
 * This interface extends DeviceState to include properties related to the current source.
 */
export interface IHasCurrentSourceInfoChangeState extends DeviceState {
  /**
   * The key of the current source.
   * This is used to identify which source is currently active.
   */
  currentSourceKey: string;

  /**
   * The current source item.
   * This provides detailed information about the currently active source.
   */
  currentSource: SourceListItem;
}
