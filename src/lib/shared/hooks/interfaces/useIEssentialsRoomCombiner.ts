import { useGetDevice } from '../../../store';
import { IEssentialsRoomCombinerState } from '../../../types/state/state/IEssentialsRoomCombinerState';
import { useWebsocketContext } from '../../../utils';

/**
 * hook to control a device that implements the IEssentialsRoomCombiner interface
 * @param key key of the device
 * @returns 
 */
export function useIEssentialsRoomCombiner(key: string): IEssentialsRoomCombinerReturn | undefined {
  const { sendMessage } = useWebsocketContext();
  const roomCombinerState = useGetDevice<IEssentialsRoomCombinerState>(key);

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

