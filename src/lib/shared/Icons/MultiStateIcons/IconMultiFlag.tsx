import { IconProps, MultiStateIconContainer } from "../../Buttons";

export const IconMultiFlag = ({
  active,
  className = "",
  disabled,
}: IconProps) => (
  <MultiStateIconContainer
    ActiveImage={
      /* icon-flag-active.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM124.95,102.2h-39.8l-2.27-11.37h-31.84v39.8h-11.37V33.98h51.17l2.27,11.37h31.84v56.86Z" />
        </g>
      </svg>
    }
    DisabledImage={
      /* icon-flag-disabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M124.95,58.15v44.06h-39.8l-.71-3.55,40.51-40.51ZM51.03,95.09v-4.26h4.26l45.48-45.48h-7.67l-2.27-11.37h-51.17v72.48l11.37-11.37ZM164.61,82.3c0,45.38-36.92,82.3-82.3,82.3S0,127.69,0,82.3,36.92,0,82.3,0s82.3,36.92,82.3,82.3ZM5,82.3c0,19.83,7.51,37.93,19.82,51.63L133.93,24.83c-13.7-12.32-31.8-19.83-51.63-19.83C39.68,5,5,39.68,5,82.3ZM159.61,82.3c0-19.83-7.51-37.93-19.83-51.63L30.68,139.78c13.7,12.32,31.8,19.83,51.63,19.83,42.63,0,77.3-34.68,77.3-77.3Z" />
        </g>
      </svg>
    }
    EnabledImage={
      /* icon-flag-enabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M39.66,130.63V33.98h51.17l2.27,11.37h31.84v56.86h-39.8l-2.27-11.37h-31.84v39.8h-11.37ZM82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM82.3,159.61c-42.63,0-77.3-34.68-77.3-77.3S39.68,5,82.3,5s77.3,34.68,77.3,77.3-34.68,77.3-77.3,77.3Z" />
        </g>
      </svg>
    }
    active={active}
    disabled={disabled}
  />
);
