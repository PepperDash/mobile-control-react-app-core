import { SourceListItem } from '../sourceListItem';

export interface IHasCurrentSourceInfoChangeState {
  currentSourceKey: string;
  currentSource: SourceListItem;
}