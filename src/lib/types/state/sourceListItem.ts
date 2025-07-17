import { IconNames } from '../../shared/Icons/iconsDictionary';
import { Device } from './device';

/**
 * Represents a source item in a routing/switching system's source list.
 * This interface defines the structure for input sources that can provide audio/video signals.
 *
 * @interface SourceListItem
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const source: SourceListItem = {
 *   disableCodecSharing: false,
 *   disableRoutedSharing: false,
 *   sourceKey: 'laptop-hdmi-1',
 *   order: 1,
 *   type: 'HDMI',
 *   icon: 'Laptop',
 *   sourceDevice: laptopDevice,
 *   name: 'Laptop HDMI',
 *   preferredName: 'Conference Laptop',
 *   includeInSourceList: true,
 *   isControllable: false,
 *   isAudioSource: true
 * };
 * ```
 */
export interface SourceListItem {
  /**
   * Determines whether codec sharing is disabled for this source.
   * When true, prevents this source from being shared through video codecs.
   *
   * @type {boolean}
   * @default false
   */
  disableCodecSharing: boolean;

  /**
   * Determines whether routed sharing is disabled for this source.
   * When true, prevents this source from being routed to shared destinations.
   *
   * @type {boolean}
   * @default false
   */
  disableRoutedSharing: boolean;

  /**
   * The unique identifier key of the source device.
   * This should match the device key in the system configuration.
   *
   * @type {string}
   * @example 'laptop-hdmi-1', 'camera-main', 'bluray-player'
   */
  sourceKey: string;

  /**
   * The display order of this item in the source list.
   * Lower numbers appear first in the list. Used for sorting sources.
   *
   * @type {number}
   * @example 1, 2, 3
   */
  order: number;

  /**
   * The type classification of the source.
   * Describes the connection type or source category.
   *
   * @type {string}
   * @example 'HDMI', 'USB-C', 'Wireless', 'Camera', 'Microphone'
   */
  type: string;

  /**
   * The icon identifier used to represent this source in the UI.
   * Must be a valid icon name from the icon dictionary.
   *
   * @type {IconNames}
   * @example 'Laptop', 'Camera', 'Wireless', 'Hdmi'
   */
  icon: IconNames;

  /**
   * The device object that represents the physical source device.
   * Contains detailed information about the source hardware.
   *
   * @type {Device}
   */
  sourceDevice: Device;

  /**
   * The name of the item in the context of the source list.
   * This is the specific name used when this item appears in selection lists.
   *
   * @type {string}
   * @example 'Laptop HDMI', 'Main Camera', 'Wireless Display'
   */
  name: string;

  /**
   * The computed display name for this source.
   * This is determined from either the name property of this object or the name property of the source device.
   * Takes precedence over the regular name for display purposes.
   *
   * @type {string}
   * @example 'Conference Laptop', 'Presentation Camera', 'Guest Device'
   */
  preferredName: string;

  /**
   * Determines whether this item should be shown in the source list.
   * When false, the source exists but is hidden from user selection.
   *
   * @type {boolean}
   * @default true
   */
  includeInSourceList: boolean;

  /**
   * Indicates whether this source device can be controlled remotely.
   * Controllable sources allow power, volume, and other remote operations.
   *
   * @type {boolean}
   * @default false
   */
  isControllable: boolean;

  /**
   * Indicates whether this source provides audio signals.
   * Audio sources can be routed to audio destinations and mixers.
   *
   * @type {boolean}
   * @default true
   */
  isAudioSource: boolean;

  /**
   * Indicates whether this source supports USB connections.
   * This is useful for devices that can also handle USB video/audio input/output.
   *
   * @type {boolean}
   * @default false
   */
  supportsUsb: boolean;

  /**
   * The device key of the sync provider for this source.
   * This is used to identify the device that provides synchronization for this source.
   *
   * @type {string}
   */
  syncProviderDeviceKey: string;
}

/**
 * Special constant representing the "off" or "no source" selection.
 * Used to indicate that no source is currently selected or to turn off a destination.
 *
 * @constant {string}
 * @example
 * ```typescript
 * // Turn off a display by selecting the off source
 * if (selectedSource === roomOffSourceKey) {
 *   // Handle turning off the destination
 * }
 * ```
 */
export const roomOffSourceKey = '$off';
