import { useGetDevice } from 'src/lib/store';
import { IEssentialsRoomCombinerState } from 'src/lib/types/state/state/IEssentialsRoomCombinerState';
import { useWebsocketContext } from 'src/lib/utils';

/**
 * hook to control a device that implements the IEssentialsRoomCombiner interface
 * @param key key of the device
 * @returns 
 */
export function useIEssentialsRoomCombiner(key: string): IEssentialsRoomCombinerReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const roomCombinerState = useGetDevice(key) as IEssentialsRoomCombinerState | undefined;

  if (!roomCombinerState) return undefined;

  const setAutoMode = () => {
    sendMessage(`/device/${key}/setAutoMode`, null);
  };

  const setManualMode = () => {
    sendMessage(`/device/${key}/setManualMode`, null);
  };

  const toggleMode = () => {
    sendMessage(`/device/${key}/toggleMode`, null);
  };

  const togglePartitionState = (partitionKey: string) => {
    sendMessage(`/device/${key}/togglePartitionState`, partitionKey);
  }

  const setRoomCombinationScenario = (scenarioKey: string) => {
    sendMessage(`/device/${key}/setRoomCombinationScenario`, scenarioKey);
  };

  return { roomCombinerState, setAutoMode, setManualMode, toggleMode, togglePartitionState, setRoomCombinationScenario };
}

export interface IEssentialsRoomCombinerReturn {
  roomCombinerState: IEssentialsRoomCombinerState;
  setAutoMode: () => void;
  setManualMode: () => void;
  toggleMode: () => void;
  togglePartitionState: (partitionKey: string) => void;
  setRoomCombinationScenario: (scenarioKey: string) => void;
}

