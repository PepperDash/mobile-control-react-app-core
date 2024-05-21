export interface LevelControlListItem {
  deviceKey: string;
  preferredName: string;
  name: string;
  includeInUserList: boolean;
  order: number;
  type: LevelControlType;
}

export type LevelControlType = 'Level' | 'Mute' | 'LevelAndMute';