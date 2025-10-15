import { SignalType } from '../../shared';

/**
 * Represents a destination item in a routing/switching system's destination list.
 * This interface defines the structure for display destinations that can receive audio/video signals.
 *
 * @interface DestinationListItem
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const destination: DestinationListItem = {
 *   sinkKey: 'display-001',
 *   preferredName: 'Main Display',
 *   name: 'Conference Room Display',
 *   includeInDestinationList: true,
 *   isCodecContentDestination: false,
 *   isProgramAudioDestination: false,
 *   order: 1,
 *   surfaceLocation: 0,
 *   verticalLocation: 0,
 *   horizontalLocation: 0,
 *   sinkType: SignalType.Video
 * };
 * ```
 */
export interface DestinationListItem {
  /**
   * The unique identifier key of the sink device.
   * This should match the device key in the system configuration.
   *
   * @type {string}
   * @example 'display-001', 'projector-main', 'speaker-zone-1'
   */
  sinkKey: string;

  /**
   * The computed display name for this destination.
   * This is determined from either the name property of this object or the name property of the sink object.
   * Takes precedence over the regular name for display purposes.
   *
   * @type {string}
   * @example 'Main Conference Display', 'Projector Screen'
   */
  preferredName: string;

  /**
   * The name of the item in the context of the destination list.
   * This is the specific name used when this item appears in selection lists.
   *
   * @type {string}
   * @example 'Conference Room Display', 'Presentation Screen'
   */
  name: string;

  /**
   * Determines whether this item should be shown in the destination list.
   * When false, the destination exists but is hidden from user selection.
   *
   * @type {boolean}
   * @default true
   */
  includeInDestinationList: boolean;

  /**
   * Indicates if this item is a codec content destination.
   * Content destinations are typically used for sharing presentation content.
   *
   * @type {boolean}
   * @default false
   */
  isCodecContentDestination: boolean;

  /**
   * Indicates if this item is a codec program audio destination.
   * Program audio destinations handle the main audio feed from video codecs.
   *
   * @type {boolean}
   * @default false
   */
  isProgramAudioDestination: boolean;

  /**
   * The display order of this item in the destination list.
   * Lower numbers appear first in the list. Used for sorting destinations.
   *
   * @type {number}
   * @example 1, 2, 3
   */
  order: number;

  /**
   * The surface location identifier of the sink.
   * Used for grouping purposes when multiple displays are mounted on the same physical surface.
   * Destinations with the same surfaceLocation are considered to be on the same wall/surface.
   *
   * @type {number}
   * @example 0, 1, 2 (representing different walls or surfaces)
   */
  surfaceLocation: number;

  /**
   * The vertical position of the sink relative to the surface.
   * Used for grouping and positioning when multiple displays are arranged vertically.
   * Lower numbers typically represent higher positions.
   *
   * @type {number}
   * @example 0 (top), 1 (middle), 2 (bottom)
   */
  verticalLocation: number;

  /**
   * The horizontal position of the sink relative to the surface.
   * Used for grouping and positioning when multiple displays are arranged horizontally.
   * Lower numbers typically represent leftmost positions.
   *
   * @type {number}
   * @example 0 (left), 1 (center), 2 (right)
   */
  horizontalLocation: number;

  /**
   * The signal type that this sink accepts.
   * Determines what kind of audio/video signals can be routed to this destination.
   *
   * @type {SignalType}
   * @example SignalType.Video, SignalType.Audio, SignalType.AudioVideo
   */
  sinkType: SignalType;

  /**
   * Indicates if this destination supports USB connections.
   * This is useful for devices that can also handle USB video/audio input/output.
   *
   * @type {boolean}
   * @default false
   */
  supportsUsb: boolean;
}
