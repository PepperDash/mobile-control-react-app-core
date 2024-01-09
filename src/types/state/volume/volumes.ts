import { Dictionary } from '../collections.ts';
import { Volume } from './volume.ts';

export class Volumes {
  master!: Volume;

  auxFaders!: Dictionary<Volume>;

  set numberOfAuxFaders(value: number) {
    if (this.auxFaders) {
      const countDiff = this._numberOfAuxFaders - value;
      // example, start with 5, value 3
      // start at value + 1 = 4, through old number delete volume level-4
      if (countDiff > 0) {
        for (let i = value + 1; i < this._numberOfAuxFaders; i += 1) {
          delete this.auxFaders[`level-${i}`];
        }
      }
      // example start with 2, value 5
      // start at _numberOfAuxFaders + 1, through value. Add level
      else if (countDiff < 0) {
        for (let i = this._numberOfAuxFaders + 1; i < value; i += 1) {
          const key = `level-${i}`;
          const v = new Volume();
          v.key = key;
          this.auxFaders[key] = v;
        }
      }
      this._numberOfAuxFaders = value;
    }
  }

  private _numberOfAuxFaders!: number;

  constructor() {
    this.master = new Volume();
    this.master.key = 'master';
    this.auxFaders = {};

    // for (let i = 2; i <= 5; i++) {
    //   const key = 'level-' + i;
    //   const v = new Volume();
    //   v.key = key;
    //   this.auxFaders[key] = v;
    // }
  }
}
