import { IconProps, MultiStateIconContainer } from "../../Buttons";

export const IconMultiGlass = ({
  active,
  className = "",
  disabled,
}: IconProps) => (
  <MultiStateIconContainer
    ActiveImage={
      /* icon-glass-active.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M79.55,85.06l5.51-5.51h32.39v5.51h-32.39v41.83h-5.51v-41.83ZM47.16,117.45l32.39-32.39h-32.39v32.39ZM79.55,37.72h-32.39v41.83h32.39v-41.83ZM85.06,79.55l32.39-32.39v-9.43h-32.39v41.83ZM164.61,82.3c0,45.38-36.92,82.3-82.3,82.3S0,127.69,0,82.3,36.92,0,82.3,0s82.3,36.92,82.3,82.3ZM122.99,32.18H41.61v100.25h81.38V32.18Z" />
        </g>
      </svg>
    }
    DisabledImage={
      /* icon-glass-disabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM82.3,5c19.83,0,37.93,7.51,51.63,19.83L24.82,133.93c-12.32-13.7-19.82-31.8-19.82-51.63C5,39.68,39.68,5,82.3,5ZM82.3,159.61c-19.83,0-37.93-7.51-51.63-19.83L139.78,30.68c12.32,13.7,19.83,31.8,19.83,51.63,0,42.63-34.68,77.3-77.3,77.3ZM41.61,104.51V32.18h72.33l-5.54,5.54h-23.34v23.34l-5.51,5.51v-28.85h-32.39v41.83h19.42l-5.51,5.51h-13.91v13.91l-5.54,5.54ZM122.99,60.1v72.33H50.66l28.89-28.89v23.34h5.51v-28.85l12.97-12.97h19.42v-5.51h-13.91l19.45-19.45Z" />
        </g>
      </svg>
    }
    EnabledImage={
      /* icon-glass-enabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M117.45,32.18H41.61v100.25h81.38V32.18h-5.54ZM117.45,47.16l-32.39,32.39h32.39v5.51h-32.39v41.83h-5.51v-41.83l-32.39,32.39v-32.39h32.39l5.51-5.51v-41.83h32.39v9.43ZM79.55,37.72v41.83h-32.39v-41.83h32.39ZM82.3,164.61C36.92,164.61,0,127.69,0,82.3S36.92,0,82.3,0s82.3,36.92,82.3,82.3-36.92,82.3-82.3,82.3ZM82.3,5C39.68,5,5,39.68,5,82.3s34.68,77.3,77.3,77.3,77.3-34.68,77.3-77.3S124.93,5,82.3,5Z" />
        </g>
      </svg>
    }
    active={active}
    disabled={disabled}
  />
);
