// import { ReactComponent as IconMultiDownActive } from './icon-down-active.svg';

import { IconProps } from "../../Buttons/IconButton/IconButton";
import { MultiStateIconContainer } from "../../Buttons/MultiStateIconContainer/MultiStateIconContainer";

export const IconMultiDownArrow = ({
  active,
  className = "",
  disabled,
}: IconProps) => (
  <MultiStateIconContainer
    ActiveImage={
      /* icon-down-active.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM93.21,107.67l-10.91,12.23-10.91-12.23-35.78-40.12,12.15-10.84,34.53,38.72,34.53-38.72,12.15,10.84-35.78,40.12Z" />
        </g>
      </svg>
    }
    DisabledImage={
      /* icon-down-disabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,164.61c45.38,0,82.3-36.92,82.3-82.3S127.69,0,82.3,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3ZM82.3,159.61c-19.83,0-37.93-7.51-51.63-19.83L139.78,30.68c12.32,13.7,19.82,31.8,19.82,51.63,0,42.63-34.68,77.3-77.3,77.3ZM82.3,5c19.83,0,37.93,7.51,51.63,19.83L24.82,133.93c-12.32-13.7-19.82-31.8-19.82-51.63C5,39.68,39.68,5,82.3,5ZM52.88,93.25l-15.26-17.11,12.15-10.84,14.64,16.41-11.53,11.53ZM118.84,65.3l12.15,10.84-35.78,40.12-10.91,12.23-10.91-12.23-3.09-3.47,11.53-11.53,2.47,2.77,34.53-38.72Z" />
        </g>
      </svg>
    }
    EnabledImage={
      /* icon-down-enabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,164.61C36.92,164.61,0,127.69,0,82.3S36.92,0,82.3,0s82.3,36.92,82.3,82.3-36.92,82.3-82.3,82.3ZM82.3,5C39.68,5,5,39.68,5,82.3s34.68,77.3,77.3,77.3,77.3-34.68,77.3-77.3S124.93,5,82.3,5ZM47.77,56.71l-12.15,10.84,35.78,40.12,10.91,12.23,10.91-12.23,35.78-40.12-12.15-10.84-34.53,38.72-34.53-38.72Z" />
        </g>
      </svg>
    }
    active={active}
    disabled={disabled}
  />
);
