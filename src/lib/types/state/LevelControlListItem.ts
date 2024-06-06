import { AudioControlPointListItemBase } from '.';

export interface LevelControlListItem extends AudioControlPointListItemBase {
  type: LevelControlType;
}

export type LevelControlType = 'Level' | 'Mute' | 'LevelAndMute';