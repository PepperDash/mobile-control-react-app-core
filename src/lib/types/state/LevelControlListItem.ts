import { AudioControlPointListItemBase } from './AudioControlPointListItemBase';

export interface LevelControlListItem extends AudioControlPointListItemBase {
  type: LevelControlType;
}

export type LevelControlType = 'Level' | 'Mute' | 'LevelAndMute';
