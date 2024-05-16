import { IconProps, MultiStateIconContainer } from "../../Buttons";

export const IconMultiController = ({
  active,
  // Just to shut up the linter on this template. Prefer deleting this lint rule
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className = "",
  disabled,
}: IconProps) => (
  <MultiStateIconContainer
    ActiveImage={
      /* icon-controller-active.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path
            d="M111.57,63.01c-.5-1.94-1.51-3.52-3.02-4.74-1.51-1.22-3.27-1.83-5.28-1.83h-42.04c-2.01,0-3.79.61-5.34,1.83-1.54,1.22-2.53,2.8-2.96,4.74l-9.06,36.11c-.14.43-.22,1.08-.22,1.94,0,2.01.74,3.7,2.21,5.07,1.47,1.37,3.25,2.05,5.34,2.05,1.37,0,2.6-.36,3.72-1.08,1.11-.72,1.96-1.69,2.53-2.91l3.02-6.14c1.08-2.23,2.66-3.97,4.74-5.23,2.08-1.26,4.35-1.89,6.79-1.89h20.48c2.44,0,4.71.65,6.79,1.94,2.08,1.29,3.7,3.02,4.85,5.17l3.02,6.14c.58,1.22,1.42,2.19,2.53,2.91,1.11.72,2.35,1.08,3.72,1.08,2.01,0,3.74-.66,5.17-1.99,1.44-1.33,2.19-3,2.26-5.01,0,.07-.07-.61-.22-2.05l-9.06-36.11ZM94.27,61.98c.83-.83,1.85-1.24,3.07-1.24s2.25.41,3.07,1.24c.83.83,1.24,1.85,1.24,3.07s-.41,2.25-1.24,3.07c-.83.83-1.85,1.24-3.07,1.24s-2.25-.41-3.07-1.24c-.83-.83-1.24-1.85-1.24-3.07s.41-2.25,1.24-3.07ZM77.02,76c-.61.61-1.38.92-2.32.92h-4.31v4.31c0,.93-.31,1.71-.92,2.32-.61.61-1.38.92-2.32.92s-1.71-.31-2.32-.92c-.61-.61-.92-1.38-.92-2.32v-4.31h-4.31c-.93,0-1.71-.31-2.32-.92-.61-.61-.92-1.38-.92-2.32s.31-1.71.92-2.32c.61-.61,1.38-.92,2.32-.92h4.31v-4.31c0-.93.31-1.71.92-2.32.61-.61,1.38-.92,2.32-.92s1.71.31,2.32.92c.61.61.92,1.38.92,2.32v4.31h4.31c.93,0,1.71.31,2.32.92s.92,1.38.92,2.32-.31,1.71-.92,2.32ZM91.79,76.75c-.83.83-1.85,1.24-3.07,1.24s-2.25-.41-3.07-1.24c-.83-.83-1.24-1.85-1.24-3.07s.41-2.25,1.24-3.07c.83-.83,1.85-1.24,3.07-1.24s2.25.41,3.07,1.24c.83.83,1.24,1.85,1.24,3.07s-.41,2.25-1.24,3.07ZM100.41,85.38c-.83.83-1.85,1.24-3.07,1.24s-2.25-.41-3.07-1.24c-.83-.83-1.24-1.85-1.24-3.07s.41-2.25,1.24-3.07c.83-.83,1.85-1.24,3.07-1.24s2.25.41,3.07,1.24c.83.83,1.24,1.85,1.24,3.07s-.41,2.25-1.24,3.07ZM109.04,76.75c-.83.83-1.85,1.24-3.07,1.24s-2.25-.41-3.07-1.24c-.83-.83-1.24-1.85-1.24-3.07s.41-2.25,1.24-3.07c.83-.83,1.85-1.24,3.07-1.24s2.25.41,3.07,1.24,1.24,1.85,1.24,3.07-.41,2.25-1.24,3.07ZM82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM124.89,112.22c-3.13,3.05-6.88,4.58-11.27,4.58-3.02,0-5.82-.79-8.41-2.37-2.59-1.58-4.53-3.74-5.82-6.47l-3.02-6.25c-.36-.72-.9-1.26-1.62-1.62-.72-.36-1.47-.54-2.26-.54h-20.48c-.79,0-1.55.18-2.26.54-.72.36-1.26.9-1.62,1.62l-3.02,6.25c-1.29,2.73-3.23,4.89-5.82,6.47-2.59,1.58-5.39,2.37-8.41,2.37-4.31,0-8-1.55-11.05-4.64-3.05-3.09-4.65-6.83-4.8-11.21,0-.65.04-1.29.11-1.94.07-.65.18-1.29.32-1.94l9.06-36.22c1.01-3.88,3.05-7.03,6.15-9.43,3.09-2.41,6.61-3.61,10.56-3.61h42.04c3.95,0,7.47,1.2,10.56,3.61,3.09,2.41,5.14,5.55,6.14,9.43l9.06,36.22c.14.65.27,1.31.38,1.99s.16,1.35.16,1.99c0,4.38-1.56,8.1-4.69,11.16Z"
            stroke-width="0"
          />
        </g>
      </svg>
    }
    DisabledImage={
      /* icon-controller-disabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path
            d="M96.54,86.55l5.04-5.04c.04.26.07.52.07.8,0,1.22-.41,2.25-1.24,3.07-.83.83-1.85,1.24-3.07,1.24-.28,0-.54-.03-.8-.07ZM105.97,77.99c1.22,0,2.25-.41,3.07-1.24.83-.83,1.24-1.85,1.24-3.07,0-.28-.03-.54-.07-.8l-5.04,5.04c.26.04.52.07.8.07ZM129.04,97.07l-8.6-34.41-7.15,7.15,7.35,29.31c.14,1.44.22,2.12.22,2.05-.07,2.01-.83,3.68-2.26,5.01-1.44,1.33-3.16,1.99-5.17,1.99-1.37,0-2.6-.36-3.72-1.08-1.11-.72-1.96-1.69-2.53-2.91l-3.02-6.14c-1.15-2.16-2.77-3.88-4.85-5.17-2.08-1.29-4.35-1.94-6.79-1.94h-.33l-8.62,8.62h8.95c.79,0,1.55.18,2.26.54.72.36,1.26.9,1.62,1.62l3.02,6.25c1.29,2.73,3.23,4.89,5.82,6.47,2.59,1.58,5.39,2.37,8.41,2.37,4.38,0,8.14-1.53,11.27-4.58,3.13-3.05,4.69-6.77,4.69-11.16,0-.65-.05-1.31-.16-1.99s-.23-1.35-.38-1.99ZM43.77,102.35c-.07-.42-.12-.84-.12-1.29,0-.86.07-1.51.22-1.94l9.06-36.11c.43-1.94,1.42-3.52,2.96-4.74,1.54-1.22,3.32-1.83,5.34-1.83h28.46l8.62-8.62h-37.09c-3.95,0-7.47,1.2-10.56,3.61-3.09,2.41-5.14,5.55-6.14,9.43l-9.06,36.22c-.14.65-.25,1.29-.32,1.94-.07.65-.11,1.29-.11,1.94.1,2.92.85,5.55,2.24,7.9l6.5-6.5ZM74.7,70.45h-4.31v-4.31c0-.93-.31-1.71-.92-2.32-.61-.61-1.38-.92-2.32-.92s-1.71.31-2.32.92c-.61.61-.92,1.38-.92,2.32v4.31h-4.31c-.93,0-1.71.31-2.32.92s-.92,1.38-.92,2.32.31,1.71.92,2.32c.61.61,1.38.92,2.32.92h4.31v4.31c0,.31.05.59.11.86l11.53-11.53c-.27-.07-.56-.11-.86-.11ZM164.61,82.3c0,45.38-36.92,82.3-82.3,82.3S0,127.69,0,82.3,36.92,0,82.3,0s82.3,36.92,82.3,82.3ZM5,82.3c0,19.83,7.51,37.93,19.82,51.63L133.93,24.83c-13.7-12.32-31.8-19.83-51.63-19.83C39.68,5,5,39.68,5,82.3ZM159.61,82.3c0-19.83-7.51-37.93-19.83-51.63L30.68,139.78c13.7,12.32,31.8,19.83,51.63,19.83,42.63,0,77.3-34.68,77.3-77.3Z"
            fill="#090a0e"
            stroke-width="0"
          />
        </g>
      </svg>
    }
    EnabledImage={
      /* icon-controller-enabled.svg */

      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path
            d="M50.88,116.8c-4.31,0-8-1.55-11.05-4.64-3.05-3.09-4.65-6.83-4.8-11.21,0-.65.04-1.29.11-1.94s.18-1.29.32-1.94l9.06-36.22c1.01-3.88,3.05-7.03,6.14-9.43s6.61-3.61,10.56-3.61h42.04c3.95,0,7.47,1.2,10.56,3.61s5.14,5.55,6.14,9.43l9.06,36.22c.14.65.27,1.31.38,1.99s.16,1.35.16,1.99c0,4.38-1.56,8.1-4.69,11.16s-6.88,4.58-11.27,4.58c-3.02,0-5.82-.79-8.41-2.37s-4.53-3.74-5.82-6.47l-3.02-6.25c-.36-.72-.9-1.26-1.62-1.62s-1.47-.54-2.26-.54h-20.48c-.79,0-1.55.18-2.26.54s-1.26.9-1.62,1.62l-3.02,6.25c-1.29,2.73-3.23,4.89-5.82,6.47s-5.39,2.37-8.41,2.37ZM51.2,108.18c1.37,0,2.61-.36,3.72-1.08,1.11-.72,1.96-1.69,2.53-2.91l3.02-6.14c1.08-2.23,2.66-3.97,4.74-5.23s4.35-1.89,6.79-1.89h20.48c2.44,0,4.71.65,6.79,1.94s3.7,3.02,4.85,5.17l3.02,6.14c.57,1.22,1.42,2.19,2.53,2.91,1.11.72,2.35,1.08,3.72,1.08,2.01,0,3.74-.66,5.17-1.99,1.44-1.33,2.19-3,2.26-5.01,0,.07-.07-.61-.22-2.05l-9.06-36.11c-.5-1.94-1.51-3.52-3.02-4.74s-3.27-1.83-5.28-1.83h-42.04c-2.01,0-3.79.61-5.34,1.83s-2.53,2.8-2.96,4.74l-9.06,36.11c-.14.43-.22,1.08-.22,1.94,0,2.01.74,3.7,2.21,5.07,1.47,1.37,3.25,2.05,5.34,2.05ZM88.72,77.99c1.22,0,2.25-.41,3.07-1.24s1.24-1.85,1.24-3.07-.41-2.25-1.24-3.07-1.85-1.24-3.07-1.24-2.25.41-3.07,1.24c-.83.83-1.24,1.85-1.24,3.07s.41,2.25,1.24,3.07c.83.83,1.85,1.24,3.07,1.24ZM97.34,69.37c1.22,0,2.25-.41,3.07-1.24s1.24-1.85,1.24-3.07-.41-2.25-1.24-3.07-1.85-1.24-3.07-1.24-2.25.41-3.07,1.24-1.24,1.85-1.24,3.07.41,2.25,1.24,3.07,1.85,1.24,3.07,1.24ZM97.34,86.62c1.22,0,2.25-.41,3.07-1.24s1.24-1.85,1.24-3.07-.41-2.25-1.24-3.07c-.83-.83-1.85-1.24-3.07-1.24s-2.25.41-3.07,1.24c-.83.83-1.24,1.85-1.24,3.07s.41,2.25,1.24,3.07,1.85,1.24,3.07,1.24ZM105.97,77.99c1.22,0,2.25-.41,3.07-1.24s1.24-1.85,1.24-3.07-.41-2.25-1.24-3.07-1.85-1.24-3.07-1.24-2.25.41-3.07,1.24-1.24,1.85-1.24,3.07.41,2.25,1.24,3.07,1.85,1.24,3.07,1.24ZM67.16,84.46c.93,0,1.71-.31,2.32-.92s.92-1.38.92-2.32v-4.31h4.31c.93,0,1.71-.31,2.32-.92s.92-1.38.92-2.32-.31-1.71-.92-2.32-1.38-.92-2.32-.92h-4.31v-4.31c0-.93-.31-1.71-.92-2.32s-1.38-.92-2.32-.92-1.71.31-2.32.92-.92,1.38-.92,2.32v4.31h-4.31c-.93,0-1.71.31-2.32.92s-.92,1.38-.92,2.32.31,1.71.92,2.32,1.38.92,2.32.92h4.31v4.31c0,.93.31,1.71.92,2.32s1.38.92,2.32.92ZM82.3,164.61C36.92,164.61,0,127.69,0,82.3S36.92,0,82.3,0s82.3,36.92,82.3,82.3-36.92,82.3-82.3,82.3ZM82.3,5C39.68,5,5,39.68,5,82.3s34.68,77.3,77.3,77.3,77.3-34.68,77.3-77.3S124.93,5,82.3,5Z"
            fill="#090a0e"
            stroke-width="0"
          />
        </g>
      </svg>
    }
    active={active}
    disabled={disabled}
  />
);
