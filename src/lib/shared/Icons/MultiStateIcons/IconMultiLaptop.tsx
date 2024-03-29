import { IconProps, MultiStateIconContainer } from "../../Buttons";

export const IconMultiLaptop = ({
  active,
  className = "",
  disabled,
}: IconProps) => (
  <MultiStateIconContainer
    ActiveImage={
      /* icon-laptop-active.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M114.35,100.33H50.26v-44.07h64.1v44.07ZM82.3,104.34c-1.14,0-2.09.38-2.85,1.15s-1.15,1.72-1.15,2.85.38,2.09,1.15,2.85,1.72,1.15,2.85,1.15,2.09-.38,2.85-1.15,1.15-1.72,1.15-2.85-.38-2.09-1.15-2.85-1.72-1.15-2.85-1.15ZM164.61,82.3c0,45.38-36.92,82.3-82.3,82.3S0,127.69,0,82.3,36.92,0,82.3,0s82.3,36.92,82.3,82.3ZM130.38,108.34h-16.02c2.2,0,4.09-.78,5.66-2.35s2.35-3.46,2.35-5.66v-44.07c0-2.2-.78-4.09-2.35-5.66-1.57-1.57-3.46-2.35-5.66-2.35H50.26c-2.2,0-4.09.78-5.66,2.35-1.57,1.57-2.35,3.46-2.35,5.66v44.07c0,2.2.78,4.09,2.35,5.66s3.46,2.35,5.66,2.35h-16.02c0,2.2.78,4.09,2.35,5.66,1.57,1.57,3.46,2.35,5.66,2.35h80.12c2.2,0,4.09-.78,5.66-2.35,1.57-1.57,2.35-3.46,2.35-5.66Z" />
        </g>
      </svg>
    }
    DisabledImage={
      /* icon-laptop-disabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM82.3,5c19.83,0,37.93,7.51,51.63,19.83L24.82,133.93c-12.32-13.7-19.82-31.8-19.82-51.63C5,39.68,39.68,5,82.3,5ZM82.3,159.61c-19.83,0-37.93-7.51-51.63-19.83L139.78,30.68c12.32,13.7,19.83,31.8,19.83,51.63,0,42.63-34.68,77.3-77.3,77.3ZM42.8,103.32c-.37-.92-.56-1.92-.56-2.99v-44.07c0-2.2.78-4.09,2.35-5.66,1.57-1.57,3.46-2.35,5.66-2.35h47.62l-8.01,8.01h-39.6v39.6l-7.45,7.45ZM120.01,105.99c1.57-1.57,2.35-3.46,2.35-5.66v-39.6l-8.01,8.01v31.59h-31.59l-16.02,16.02h55.63c2.2,0,4.09-.78,5.66-2.35,1.57-1.57,2.35-3.46,2.35-5.66h-16.02c2.2,0,4.09-.78,5.66-2.35ZM85.16,111.2c-.77.77-1.72,1.15-2.85,1.15s-2.09-.38-2.85-1.15-1.15-1.72-1.15-2.85.38-2.09,1.15-2.85,1.72-1.15,2.85-1.15,2.09.38,2.85,1.15,1.15,1.72,1.15,2.85-.38,2.09-1.15,2.85Z" />
        </g>
      </svg>
    }
    EnabledImage={
      /* icon-laptop-enabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M114.35,108.34c2.2,0,4.09-.78,5.66-2.35,1.57-1.57,2.35-3.46,2.35-5.66v-44.07c0-2.2-.78-4.09-2.35-5.66-1.57-1.57-3.46-2.35-5.66-2.35H50.26c-2.2,0-4.09.78-5.66,2.35-1.57,1.57-2.35,3.46-2.35,5.66v44.07c0,2.2.78,4.09,2.35,5.66,1.57,1.57,3.46,2.35,5.66,2.35h-16.02c0,2.2.78,4.09,2.35,5.66,1.57,1.57,3.46,2.35,5.66,2.35h80.12c2.2,0,4.09-.78,5.66-2.35,1.57-1.57,2.35-3.46,2.35-5.66h-16.02ZM50.26,56.26h64.1v44.07H50.26v-44.07ZM85.16,111.2c-.77.77-1.72,1.15-2.85,1.15s-2.09-.38-2.85-1.15-1.15-1.72-1.15-2.85.38-2.09,1.15-2.85,1.72-1.15,2.85-1.15,2.09.38,2.85,1.15,1.15,1.72,1.15,2.85-.38,2.09-1.15,2.85ZM82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM82.3,159.61c-42.63,0-77.3-34.68-77.3-77.3S39.68,5,82.3,5s77.3,34.68,77.3,77.3-34.68,77.3-77.3,77.3Z" />
        </g>
      </svg>
    }
    active={active}
    disabled={disabled}
  />
);
