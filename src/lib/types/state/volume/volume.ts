export interface Volume {
  key: string;

  level: number;

  muted: boolean;

  hasMute?: boolean;

  hasPrivacyMute?: boolean;

  privacyMuted: boolean;

  muteIconName?: string;

  label: string;
}

export type VolumeCommand = 'level' | 'muteOn' | 'muteOff' | 'muteToggle' | 'privacyMuteToggle';
