import { IconProps, MultiStateIconContainer } from "../../Buttons";

export const IconMultiRoomPC = ({
  active,
  // Just to shut up the linter on this template. Prefer deleting this lint rule
   
  className = "",
  disabled,
}: IconProps) => (
  <MultiStateIconContainer
    ActiveImage={
      /* icon-roomPC-active.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path
            d="M78.42,76.11v.67c0,1.66-1.34,3-3,3h-28.5c-1.66,0-3-1.34-3-3v-.67c0-1.66,1.34-3,3-3h28.5c1.66,0,3,1.34,3,3ZM75.42,63.11h-28.5c-1.66,0-3,1.34-3,3v.67c0,1.66,1.34,3,3,3h28.5c1.66,0,3-1.34,3-3v-.67c0-1.66-1.34-3-3-3ZM74.67,110.78c-2.07,0-3.75,1.68-3.75,3.75s1.68,3.75,3.75,3.75,3.75-1.68,3.75-3.75-1.68-3.75-3.75-3.75ZM164.61,82.3c0,45.38-36.92,82.3-82.3,82.3S0,127.69,0,82.3,36.92,0,82.3,0s82.3,36.92,82.3,82.3ZM82.63,60.68c0-2.15-1.74-3.89-3.89-3.89h-34.83c-2.15,0-3.89,1.74-3.89,3.89v59.64c0,2.15,1.74,3.89,3.89,3.89h34.83c2.15,0,3.89-1.74,3.89-3.89v-59.64ZM124.59,44.82c0-2.44-1.98-4.43-4.43-4.43H54.78c-2.44,0-4.43,1.98-4.43,4.43v6.96h6.06v-1.66c0-1.47,1.19-2.66,2.66-2.66h56.8c1.47,0,2.66,1.19,2.66,2.66v32.53c0,1.47-1.19,2.66-2.66,2.66h-28.24v20.48h21.98c0-4.6-5.41-11.57-13.23-13.41h23.77c2.44,0,4.43-1.98,4.43-4.43v-43.13Z"
            strokeWidth="0"
          />
        </g>
      </svg>
    }
    DisabledImage={
      /* icon-roomPC-disabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path
            d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM82.3,5c19.83,0,37.93,7.51,51.63,19.83L24.83,133.93c-12.32-13.7-19.83-31.8-19.83-51.63C5,39.68,39.68,5,82.3,5ZM82.3,159.61c-19.83,0-37.93-7.51-51.63-19.83L139.78,30.68c12.32,13.7,19.82,31.8,19.82,51.63,0,42.63-34.68,77.3-77.3,77.3ZM56.41,51.79h-6.06v-6.96c0-2.44,1.98-4.43,4.43-4.43h50.95l-7.07,7.07h-39.58c-1.47,0-2.66,1.19-2.66,2.66v1.66ZM40.02,106.1v-45.42c0-2.15,1.74-3.89,3.89-3.89h34.83c2.15,0,3.89,1.74,3.89,3.89v2.81l-4.45,4.45c.15-.36.23-.75.23-1.16v-.67c0-1.66-1.34-3-3-3h-28.5c-1.66,0-3,1.34-3,3v.67c0,1.66,1.34,3,3,3h28.5c.41,0,.8-.08,1.16-.23l-3.57,3.57h-26.09c-1.66,0-3,1.34-3,3v.67c0,1.66,1.34,3,3,3h19.43l-26.32,26.32ZM124.59,58.5v29.46c0,2.44-1.98,4.43-4.43,4.43h-23.77c7.81,1.84,13.23,8.81,13.23,13.41h-21.98v-10.34l10.15-10.15h18.09c1.47,0,2.66-1.19,2.66-2.66v-18.09l6.06-6.06ZM58.88,124.21h19.86c2.15,0,3.89-1.74,3.89-3.89v-19.86l-23.75,23.75ZM74.67,118.28c-2.07,0-3.75-1.68-3.75-3.75s1.68-3.75,3.75-3.75,3.75,1.68,3.75,3.75-1.68,3.75-3.75,3.75Z"            
            strokeWidth="0"
          />
        </g>
      </svg>
    }
    EnabledImage={
      /* icon-roomPC-enabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <g>
            <path
              d="M78.74,56.79h-34.83c-2.15,0-3.89,1.74-3.89,3.89v59.64c0,2.15,1.74,3.89,3.89,3.89h34.83c2.15,0,3.89-1.74,3.89-3.89v-59.64c0-2.15-1.74-3.89-3.89-3.89ZM74.67,118.28c-2.07,0-3.75-1.68-3.75-3.75s1.68-3.75,3.75-3.75,3.75,1.68,3.75,3.75-1.68,3.75-3.75,3.75ZM78.42,76.78c0,1.66-1.34,3-3,3h-28.5c-1.66,0-3-1.34-3-3v-.67c0-1.66,1.34-3,3-3h28.5c1.66,0,3,1.34,3,3v.67ZM78.42,66.78c0,1.66-1.34,3-3,3h-28.5c-1.66,0-3-1.34-3-3v-.67c0-1.66,1.34-3,3-3h28.5c1.66,0,3,1.34,3,3v.67ZM124.59,44.82v43.13c0,2.44-1.98,4.43-4.43,4.43h-23.77c7.81,1.84,13.23,8.81,13.23,13.41h-21.98v-20.48h28.24c1.47,0,2.66-1.19,2.66-2.66v-32.53c0-1.47-1.19-2.66-2.66-2.66h-56.8c-1.47,0-2.66,1.19-2.66,2.66v1.66h-6.06v-6.96c0-2.44,1.98-4.43,4.43-4.43h65.38c2.44,0,4.43,1.98,4.43,4.43ZM82.3,164.61C36.92,164.61,0,127.69,0,82.3S36.92,0,82.3,0s82.3,36.92,82.3,82.3-36.92,82.3-82.3,82.3ZM82.3,5C39.68,5,5,39.68,5,82.3s34.68,77.3,77.3,77.3,77.3-34.68,77.3-77.3S124.93,5,82.3,5Z"              
              strokeWidth="0"
            />
          </g>
        </g>
      </svg>
    }
    active={active}
    disabled={disabled}
  />
);
