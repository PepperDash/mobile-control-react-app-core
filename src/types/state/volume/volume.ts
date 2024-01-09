export class Volume {
  /**
   * Identifier for this level
   */
  key?: string;

  /**
   * Factor for fracLevel conversions.  Defaults to 65535
   */
  factor: number = 65535;

  /**
   * @deprecated can't be used in NGRX state
   */
  get fracLevel() {
    if (this.level) {
      return this.level / this.factor;
    }

    return 0;
  }

  /**
   * For recalling the last level set or sent
   * @deprecated
   */
  lastLevel: number = 0;

  // get level() {
  //   return this._level;
  // }

  // set level(val) {
  //   this._level = val;
  //   this.lastLevel = val;
  //   // console.log('vol set ', this.fracLevel);
  // }

  // private _level: number = 0;

  level?: number;

  muted?: boolean = false;

  hasMute?: boolean = true;

  hasPrivacyMute?: boolean = false;

  privacyMuted?: boolean;

  muteIconName?: string;

  label?: string = 'Volume';
}

export type VolumeCommand = 'level' | 'muteOn' | 'muteOff' | 'muteToggle' | 'privacyMuteToggle';
