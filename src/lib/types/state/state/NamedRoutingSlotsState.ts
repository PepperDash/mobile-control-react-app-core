import { SignalType } from '../../../shared';
import { IKeyName } from '../../interfaces';
import { DeviceState } from './DeviceState';

/**
 * Device state for a device implementing the Essentials Core `IHasNamedRoutingSlots` interface -
 * an optional extension to matrix routing devices (`IRoutingMidpointWithFeedback`) that expose
 * named input/output slots with per-signal-type current-route feedback, which the bare
 * `IRoutingMidpointWithFeedback` message (see `MatrixRoutingState`) does not carry.
 */
export interface NamedRoutingSlotsState extends DeviceState {
  inputSlots: Record<string, RoutingSlotInfo>;
  outputSlots: Record<string, RoutingOutputSlotInfo>;
}

export interface RoutingSlotInfo extends IKeyName {
  slotNumber: number;
  supportedSignalTypes: string;
}

export interface RoutingOutputSlotInfo extends RoutingSlotInfo {
  /** The key of the input slot currently routed to this output, per signal type. */
  currentRouteInputKeys: Partial<Record<SignalType, string>>;
}
