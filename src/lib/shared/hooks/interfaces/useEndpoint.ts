import { useGetDevice } from '../../..';
import { EndpointState } from '../../../types/state/state/endpointState/endpointState';

/**
 * A hook that provides access to the endpoint state
 * @param key the key of the endpoint
 * @returns
 */
export function useEndpoint(key: string): IEndpointReturn | undefined {
  const endpointState = useGetDevice<EndpointState>(key);

  if (!endpointState) return undefined;

  return { endpointState };
}

export interface IEndpointReturn {
  endpointState: EndpointState;
}
