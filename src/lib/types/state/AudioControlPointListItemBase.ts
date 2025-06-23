export interface AudioControlPointListItemBase {
  parentDeviceKey: string;
  itemKey: string;
  deviceKey: string;
  name: string;
  preferredName: string;
  includeInUserList: boolean;
  order: number;
  isMic?: boolean;
  showRawLevel?: boolean;
}
