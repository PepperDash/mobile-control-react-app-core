import { SourceListItem } from '../sourceListItem';
import { IHasCurrentSourceInfoChangeState } from './IHasCurrentSourceInfoChangeState';

/**
 * Interface representing the state of current sources in the system.
 * Extends IHasCurrentSourceInfoChangeState to include current source information.
 */
export interface ICurrentSourcesState extends IHasCurrentSourceInfoChangeState {
  /**
   * A record of all current sources keyed by their unique source key.
   * This allows quick access to the source information.
   */
  currentSources?: Record<string, SourceListItem>;

  /**
   * A record of current source keys, mapping device keys to their corresponding source keys.
   * This is useful for tracking which sources are currently active on each device.
   */
  currentSourceKeys?: Record<string, string>;
}
