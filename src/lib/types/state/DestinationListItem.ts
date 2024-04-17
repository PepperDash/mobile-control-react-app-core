import { SignalType } from 'src/lib/shared';


export interface DestinationListItem {
  sinkKey: string;
  preferredName: string;
  name: string;
  includeInDestinationList: boolean;
  order: number;
  surfaceLocation: number;
  vertialLocation: number;
  horizontalLocation: number;
  sinkType: SignalType;
}