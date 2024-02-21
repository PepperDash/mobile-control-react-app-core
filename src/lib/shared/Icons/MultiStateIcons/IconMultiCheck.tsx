import { IconProps, MultiStateIconContainer } from "../../Buttons";

export const IconMultiCheck = ({
  active,
  className = "",
  disabled,
}: IconProps) => (
  <MultiStateIconContainer
    ActiveImage={
      /* icon-check-active.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM67.33,128.97l-34.83-44.24,8.71-11.06,26.13,33.18,56.07-71.21,8.71,11.06-64.78,82.27Z" />
        </g>
      </svg>
    }
    DisabledImage={
      /* icon-check-disabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM82.3,5c19.83,0,37.93,7.51,51.63,19.83L24.82,133.93c-12.32-13.7-19.82-31.8-19.82-51.63C5,39.68,39.68,5,82.3,5ZM82.3,159.61c-19.83,0-37.93-7.51-51.63-19.83L139.78,30.68c12.32,13.7,19.83,31.8,19.83,51.63,0,42.63-34.68,77.3-77.3,77.3ZM45.23,100.9l-12.73-16.17,8.71-11.06,13.77,17.48-9.74,9.74ZM116.25,66.84l-48.92,62.13-5.82-7.39,54.74-54.74Z" />
        </g>
      </svg>
    }
    EnabledImage={
      /* icon-check-enabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM82.3,159.61c-42.63,0-77.3-34.68-77.3-77.3S39.68,5,82.3,5s77.3,34.68,77.3,77.3-34.68,77.3-77.3,77.3ZM132.11,46.7l-8.71-11.06-56.07,71.21-26.13-33.18-8.71,11.06,34.83,44.24,64.78-82.27Z" />
        </g>
      </svg>
    }
    active={active}
    disabled={disabled}
  />
);
