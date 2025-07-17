import { IconNames } from '../../shared/Icons/iconsDictionary';

export interface CameraListItem {
  deviceKey: string;
  name: string;
  preferredName: string;
  icon: IconNames;
  altIcon: IconNames;
  includeInUserList: boolean;
  order: number;
}