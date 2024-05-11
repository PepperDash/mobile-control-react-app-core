import { IKeyName } from '../../interfaces';
import { DeviceState } from './DeviceState';


export interface IEssentialsRoomCombinerState extends DeviceState {
  isInAutoMode: boolean;
  currentScenario: RoomCombinationScenario;
  rooms: IKeyName[];
  roomCombinationScenarios: RoomCombinationScenario[];
  partitions: Partition[];
}


export interface RoomCombinationScenario extends IKeyName {
  partitionStates: PartitionState[];
  uiMap: Record<string, string>;
  isActive: boolean;
}

export interface Partition {
  partitionPresent: boolean;
  adjacentRoomKeys: string[];
  Name: string;
  Key: string;
}

export interface PartitionState {
  partitionKey: string;
  partitionSensedState: boolean;
}