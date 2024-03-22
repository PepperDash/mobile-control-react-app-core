export interface Volume {
  key: string;

  level: number;

  muted: boolean;

  hasMute?: boolean;

  hasPrivacyMute?: boolean;

  privacyMuted: boolean;

  muteIconName?: string;

  label: string;

  rawValue: string;

  units: VolumeLevelUnits;
}

export type VolumeCommand = 'level' | 'muteOn' | 'muteOff' | 'muteToggle' | 'privacyMuteToggle';

export type VolumeLevelUnits = 'Decibels' | 'Percent' | 'Absolute' | 'Relative';
