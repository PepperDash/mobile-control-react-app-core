import { useGetDevice } from 'src/lib';
import { EndpointState } from 'src/lib/types/state/state/endpointState/endpointState';


export function useEndpoint(key: string): IEndpointReturn | undefined {

    const endpointState = useGetDevice<EndpointState>(key);
  
    if (!endpointState) return undefined;

    return { endpointState };
}

export interface IEndpointReturn {
    endpointState: EndpointState;
}