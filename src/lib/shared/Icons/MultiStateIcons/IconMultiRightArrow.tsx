import { IconProps, MultiStateIconContainer } from "../../Buttons";

export const IconMultiRightArrow = ({
  active,
  className = "",
  disabled,
}: IconProps) => (
  <MultiStateIconContainer
    ActiveImage={
      /* icon-right-active.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM107.67,93.21l-40.12,35.78-10.84-12.15,38.72-34.53-38.72-34.53,10.84-12.15,40.12,35.78,12.23,10.91-12.23,10.91Z" />
        </g>
      </svg>
    }
    DisabledImage={
      /* icon-right-disabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M164.61,82.3C164.61,36.92,127.69,0,82.3,0S0,36.92,0,82.3c0,45.38,36.92,82.3,82.3,82.3,45.38,0,82.3-36.92,82.3-82.3ZM159.61,82.3c0,19.83-7.51,37.93-19.83,51.63L30.68,24.82c13.7-12.32,31.8-19.82,51.63-19.82,42.63,0,77.3,34.68,77.3,77.3ZM5,82.3c0-19.83,7.51-37.93,19.83-51.63l109.1,109.1c-13.7,12.32-31.8,19.82-51.63,19.82-42.63,0-77.3-34.68-77.3-77.3ZM93.25,111.73l-17.11,15.26-10.84-12.15,16.41-14.64,11.53,11.53ZM65.3,45.77l10.84-12.15,40.12,35.78,12.23,10.91-12.23,10.91-3.47,3.09-11.53-11.53,2.77-2.47-38.72-34.53Z" />
        </g>
      </svg>
    }
    EnabledImage={
      /* icon-right-enabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,164.61C36.92,164.61,0,127.69,0,82.3S36.92,0,82.3,0s82.3,36.92,82.3,82.3-36.92,82.3-82.3,82.3ZM82.3,5C39.68,5,5,39.68,5,82.3s34.68,77.3,77.3,77.3,77.3-34.68,77.3-77.3S124.93,5,82.3,5ZM95.44,82.3l-38.72,34.53,10.84,12.15,40.12-35.78,12.23-10.91-12.23-10.91-40.12-35.78-10.84,12.15,38.72,34.53Z" />
        </g>
      </svg>
    }
    active={active}
    disabled={disabled}
  />
);
