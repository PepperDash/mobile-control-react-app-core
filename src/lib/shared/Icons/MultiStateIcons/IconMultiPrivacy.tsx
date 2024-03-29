import { IconProps, MultiStateIconContainer } from "../../Buttons";

export const IconMultiPrivacy = ({
  active,
  className = "",
  disabled,
}: IconProps) => (
  <MultiStateIconContainer
    ActiveImage={
      /* icon-privacy-active.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M143.32,27.14L27.14,143.32c14.61,13.22,33.96,21.28,55.17,21.28,45.38,0,82.3-36.92,82.3-82.3,0-21.21-8.06-40.56-21.28-55.17ZM99.14,83.96c-.75,2.91-2.24,5.51-4.5,7.78-2.26,2.26-4.86,3.75-7.78,4.5l12.28-12.28ZM113.05,106.09c-6.58,7.64-14.89,12.14-24.95,13.49v17.84h-11.6v-17.84c-3.65-.49-7.07-1.4-10.27-2.72l9.2-9.2c2.18.5,4.47.76,6.86.76,8.03,0,14.87-2.83,20.52-8.49s8.49-12.5,8.49-20.52h11.6c0,10.15-3.29,19.05-9.86,26.69ZM137.47,21.28C122.86,8.06,103.51,0,82.3,0,36.92,0,0,36.92,0,82.3c0,21.21,8.06,40.56,21.28,55.17L137.47,21.28ZM64.9,44.59c0-4.83,1.69-8.94,5.08-12.33,3.38-3.38,7.49-5.08,12.33-5.08s8.94,1.69,12.33,5.08c3.38,3.38,5.08,7.49,5.08,12.33v1.82l-34.73,34.73c-.05-.57-.08-1.15-.08-1.74v-34.81ZM53.29,79.4c0,4.06.72,7.81,2.17,11.26l-8.67,8.67c-3.39-6-5.1-12.64-5.1-19.93h11.6Z" />
        </g>
      </svg>
    }
    DisabledImage={
      /* icon-privacy-disabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM82.3,5c19.83,0,37.93,7.51,51.63,19.83L24.82,133.93c-12.32-13.7-19.82-31.8-19.82-51.63C5,39.68,39.68,5,82.3,5ZM82.3,159.61c-19.83,0-37.93-7.51-51.63-19.83L139.78,30.68c12.32,13.7,19.83,31.8,19.83,51.63,0,42.63-34.68,77.3-77.3,77.3ZM94.63,91.73c-2.26,2.26-4.86,3.75-7.78,4.5l12.28-12.28c-.75,2.91-2.24,5.51-4.5,7.78ZM64.98,81.15c-.05-.57-.08-1.15-.08-1.74v-34.81c0-4.83,1.69-8.94,5.08-12.33s7.49-5.08,12.33-5.08,8.94,1.69,12.33,5.08,5.08,7.49,5.08,12.33v1.82l-34.73,34.73ZM111.31,79.4h11.6c0,10.15-3.29,19.05-9.86,26.69-6.58,7.64-14.89,12.14-24.95,13.49v17.84h-11.6v-17.84c-3.65-.49-7.07-1.4-10.27-2.72l9.2-9.2c2.18.5,4.47.76,6.86.76,8.03,0,14.87-2.83,20.52-8.49s8.49-12.5,8.49-20.52ZM46.79,99.33c-3.39-6-5.1-12.64-5.1-19.93h11.6c0,4.06.72,7.81,2.17,11.26l-8.67,8.67Z" />
        </g>
      </svg>
    }
    EnabledImage={
      /* icon-privacy-enabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM82.3,5c19.83,0,37.93,7.51,51.63,19.83L24.82,133.93c-12.32-13.7-19.82-31.8-19.82-51.63C5,39.68,39.68,5,82.3,5ZM82.3,159.61c-19.83,0-37.93-7.51-51.63-19.83L139.78,30.68c12.32,13.7,19.83,31.8,19.83,51.63,0,42.63-34.68,77.3-77.3,77.3ZM94.63,91.73c-2.26,2.26-4.86,3.75-7.78,4.5l12.28-12.28c-.75,2.91-2.24,5.51-4.5,7.78ZM64.98,81.15c-.05-.57-.08-1.15-.08-1.74v-34.81c0-4.83,1.69-8.94,5.08-12.33s7.49-5.08,12.33-5.08,8.94,1.69,12.33,5.08,5.08,7.49,5.08,12.33v1.82l-34.73,34.73ZM111.31,79.4h11.6c0,10.15-3.29,19.05-9.86,26.69-6.58,7.64-14.89,12.14-24.95,13.49v17.84h-11.6v-17.84c-3.65-.49-7.07-1.4-10.27-2.72l9.2-9.2c2.18.5,4.47.76,6.86.76,8.03,0,14.87-2.83,20.52-8.49s8.49-12.5,8.49-20.52ZM46.79,99.33c-3.39-6-5.1-12.64-5.1-19.93h11.6c0,4.06.72,7.81,2.17,11.26l-8.67,8.67Z" />
        </g>
      </svg>
    }
    active={active}
    disabled={disabled}
  />
);
