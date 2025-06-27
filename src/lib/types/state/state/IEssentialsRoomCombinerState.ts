import { IKeyName } from '../../interfaces';
import { DeviceState } from './DeviceState';


export interface IEssentialsRoomCombinerState extends DeviceState {
  disableAutoMode: boolean;
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

export interface Partition extends IKeyName {
  partitionPresent: boolean;
  adjacentRoomKeys: string[];
}

export interface PartitionState {
  partitionKey: string;
  partitionSensedState: boolean;
}