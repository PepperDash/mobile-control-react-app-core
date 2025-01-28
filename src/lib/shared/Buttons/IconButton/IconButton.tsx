import { DetailedHTMLProps, ReactNode, useState } from 'react';
import classes from './IconButton.module.scss';

/**
 * This component wraps a native button element, removing native styling
 * @property {JSX.Element} multiIcon - The icon to display
 * @property {ReactNode} other - Additional content to display
 * @property {boolean} vert - Whether to display the icon and other content vertically
 * @property {string} className - Additional classes to apply to the button
 * @property {string} iconClassName - Additional classes to apply to the icon
 * @property {string} contentClassName - Additional classes to apply to the content
 * @property {boolean} disabled - Whether the button is disabled
 * @property {function} onPointerDown - Function to call when the button is pressed
 * @property {function} onPointerUp - Function to call when the button is released
 * @property {function} onPointerLeave - Function to call when the pointer leaves the button
 * @property {object} otherProps - Additional props to apply to the button
 * @property {boolean} feedback - Whether to display feedback state
 * @property {string} feedbackClassName - Additional classes to apply to the feedback state
 */
export const IconButton = ({
  multiIcon: MultiIcon,
  otherContent = null,
  vert = false,
  className,
  iconClassName = '',
  otherContentClassName = '',
  disabled,
  feedback,
  feedbackClassName,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  ...otherProps
}: IconButtonProps) => {
  const [active, setActive] = useState(false);

  const buttonFeedbackClass = !disabled && feedback ? feedbackClassName : '';
  const showActive = !disabled && ( active || feedback );

  return (
    <button
      type="button"
      className={`${classes.iconbtn} ${vert ? classes.iconbtnvert : ''} ${className} ${buttonFeedbackClass}`}
      {...otherProps}
      disabled={disabled}
      onPointerDown={(e) => {
        setActive(true);
        onPointerDown?.(e);
      }}
      onPointerUp={(e) => {
        setActive(false);
        onPointerUp?.(e);
      }}
      onPointerLeave={(e) => {
        setActive(false);
        onPointerLeave?.(e);
      }}
    >
      {MultiIcon && <MultiIcon
        className={`${iconClassName || classes.iconsm}`}
        {...{ active: showActive, disabled }}
      />}
      {otherContentClassName ? <div className={otherContentClassName}>{otherContent}</div> : <div>{otherContent}</div>}
      
    </button>
  );
};

export interface IconButtonProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  iconClassName?: string;
  otherContentClassName?: string;
  multiIcon: MultiIconFC;
  otherContent?: ReactNode;
  vert?: boolean;
  feedback?: boolean;
  feedbackClassName?: string;
}

export interface IconProps {
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

export type MultiIconFC = (props: IconProps) => JSX.Element;
