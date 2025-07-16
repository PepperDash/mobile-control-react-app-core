import { SignalType } from '../../shared';


export interface DestinationListItem {
  // The key of the sink device
  sinkKey: string;
  // This is computed from either the name property of this object or the name property of the sink object
  preferredName: string; 
  // The name of the item in the context of the list
  name: string;
  // Should this item be shown in the list?
  includeInDestinationList: boolean;
  // Is this item a codec content destination?
  isCodecContentDestination: boolean;
  // Is this item a codec program audio destination?
  isProgramAudioDestination: boolean;
  // The order of this item in the list
  order: number;
  // The surface location of the sink.  For grouping purposes when multiple displays are on the same surface
  surfaceLocation: number;
  // The vertical location of the sink in orientation to the surface
  // This is used for grouping purposes when multiple displays are on the same surface
  verticalLocation: number;
  // The horizontal location of the sink in orientation to the surface
  // This is used for grouping purposes when multiple displays are on the same surface
  horizontalLocation: number;
  // The type of the sink
  sinkType: SignalType;
}