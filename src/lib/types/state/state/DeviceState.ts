import { InterfaceNames } from '../../../shared';
import { IKeyName } from '../../interfaces/IKeyName';
import { CommunicationMonitorState } from './CommunicationMonitorState';

/** Base device state class */
export interface DeviceState extends IKeyName {
  /**
   * The key of the device
   */
  key: string;

  /** The name of the device */
  name: string;

  /**
   * The object type of the message for state messages
   */
  messageType?: string;

  /**
   * The event type of the message for stateless messages
   */
  eventType?: string;

  /** Optional object to contain message content of unknown type */
  content?: unknown;

  /**
   * The interfaces implmented on this instance of the device
   */
  interfaces: InterfaceNames[];

  commMonitor?: CommunicationMonitorState;

  /**
   * For future use
   * @deprecated This property is deprecated and will be removed in future versions.
   */
  state: unknown;

  /**
   * For future use
   */
  // configuration: unknown;
}
