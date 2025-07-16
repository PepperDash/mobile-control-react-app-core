import { useGetDevice, useWebsocketContext } from '../../..';
import { ITemperatureSensorState } from '../../../types/state/state/ITemperatureSensorState';

/**
 * A hook that provides access to the temperature sensor state
 * @param key the key of the temperature sensor
 * @returns 
 */
export function useITemperatureSensor(key: string): ITemperatureSensorReturn | undefined {
  const { sendMessage } = useWebsocketContext();

  const state = useGetDevice<ITemperatureSensorState>(key);

  if (!state) return undefined;

  const setTemperatureUnitsToCelcius = () => sendMessage(`${key}/setTemperatureUnitsToCelcius`, null);

  const setTemperatureUnitsToFahrenheit = () => sendMessage(`${key}/setTemperatureUnitsToFahrenheit`, null);

  return { state, setTemperatureUnitsToCelcius, setTemperatureUnitsToFahrenheit };
}

export interface ITemperatureSensorReturn {
  state: ITemperatureSensorState;
  setTemperatureUnitsToCelcius: () => void;
  setTemperatureUnitsToFahrenheit: () => void;
}