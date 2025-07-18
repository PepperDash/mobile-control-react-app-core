import { Volume } from '../volume/volume';
import { DeviceState } from './DeviceState';
import { ICurrentSourcesState } from './ICurrentSourcesState';

/**
 * Represents the state of an individual display device in the AV system.
 * This interface extends DeviceState and ICurrentSourcesState to provide
 * comprehensive display-specific functionality including power management,
 * input selection, volume control, and thermal state monitoring.
 *
 * @interface DisplayState
 * @extends {DeviceState}
 * @extends {ICurrentSourcesState}
 * @since 1.0.0
 *
 * @example
 * ```typescript
 * const displayState: DisplayState = {
 *   // DeviceState properties
 *   key: 'main-display',
 *   name: 'Conference Room Display',
 *   isOnline: true,
 *
 *   // DisplayState-specific properties
 *   hasFeedback: true,
 *   powerState: true,
 *   isWarming: false,
 *   isCooling: false,
 *   currentInput: 'hdmi-1',
 *   volume: {
 *     level: 75,
 *     isMuted: false
 *   },
 *   inputKeys: ['hdmi-1', 'hdmi-2', 'vga', 'usb-c']
 * };
 * ```
 */
export interface DisplayState extends DeviceState, ICurrentSourcesState {
  /**
   * Indicates whether the display provides feedback about its current state.
   * When true, the system can receive status updates from the display device.
   * When false, the system operates in "blind" mode without confirmation.
   *
   * @type {boolean}
   * @example true // Display sends status updates
   * @example false // Display operates without feedback
   */
  hasFeedback: boolean;

  /**
   * The current power state of the display.
   * True indicates the display is powered on and operational.
   * False indicates the display is powered off or in standby mode.
   *
   * @type {boolean}
   * @example true // Display is on
   * @example false // Display is off or in standby
   */
  powerState: boolean;

  /**
   * Indicates whether the display is currently in a warming-up phase.
   * Many displays require a warm-up period after power-on before they
   * can display content or accept input changes.
   *
   * @type {boolean}
   * @example true // Display is warming up after power-on
   * @example false // Display is ready for normal operation
   */
  isWarming: boolean;

  /**
   * Indicates whether the display is currently in a cooling-down phase.
   * Some displays enter a cooling period after power-off to protect
   * internal components before fully shutting down.
   *
   * @type {boolean}
   * @example true // Display is cooling down after power-off
   * @example false // Display is not in cooling phase
   */
  isCooling: boolean;

  /**
   * The identifier of the currently selected input on the display.
   * This should match one of the keys in the inputKeys array.
   *
   * @type {string}
   * @example 'hdmi-1', 'hdmi-2', 'vga', 'usb-c', 'displayport'
   */
  currentInput: string;

  /**
   * The current volume state of the display's built-in audio system.
   * Optional as not all displays have audio capabilities.
   *
   * @type {Volume | undefined}
   * @optional
   * @example { level: 75, isMuted: false }
   * @example undefined // Display has no audio capabilities
   */
  volume?: Volume;

  /**
   * Array of available input identifiers that can be selected on this display.
   * Each key represents a physical input port or connection type.
   * Optional as some displays may not expose their input list.
   *
   * @type {string[] | undefined}
   * @optional
   * @example ['hdmi-1', 'hdmi-2', 'vga', 'usb-c']
   * @example ['displayport-1', 'displayport-2', 'dvi']
   * @example undefined // Input list not available
   */
  inputKeys?: string[];
}
