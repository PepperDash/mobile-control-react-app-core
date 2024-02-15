import { IconProps } from '../../Buttons/IconButton/IconButton';
import { MultiStateIconContainer } from '../../Buttons/MultiStateIconContainer/MultiStateIconContainer';

export const IconMultiCamera = ({
  active,
  className = '',
  disabled,
}: IconProps) => (
  <MultiStateIconContainer
    ActiveImage={
      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM99.38,108.04h-59.68c-4.58,0-8.3-3.71-8.3-8.3v-43.17h59.43c4.72,0,8.54,3.83,8.54,8.54v42.92ZM133.2,106.05c0,2.29-2.58,3.63-4.46,2.31l-22.73-16.02c-.75-.53-1.2-1.39-1.2-2.31v-15.45c0-.92.45-1.78,1.2-2.31l22.73-16.02c1.87-1.32,4.46.02,4.46,2.31v47.49Z" />
        </g>
      </svg>
    }
    DisabledImage={
      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,0C36.92,0,0,36.92,0,82.3s36.92,82.3,82.3,82.3,82.3-36.92,82.3-82.3S127.69,0,82.3,0ZM82.3,5c19.83,0,37.93,7.51,51.63,19.83L24.82,133.93c-12.32-13.7-19.82-31.8-19.82-51.63C5,39.68,39.68,5,82.3,5ZM82.3,159.61c-19.83,0-37.93-7.51-51.63-19.83L139.78,30.68c12.32,13.7,19.83,31.8,19.83,51.63,0,42.63-34.68,77.3-77.3,77.3ZM31.41,99.74v-43.17h58.14l-51.33,51.33c-3.87-.7-6.82-4.08-6.82-8.16ZM133.2,58.56v47.49c0,2.29-2.58,3.63-4.46,2.31l-22.73-16.02c-.75-.53-1.2-1.39-1.2-2.31v-11.75l17.5-17.5,6.43-4.53c1.87-1.32,4.46.02,4.46,2.31ZM75.05,108.04l24.33-24.33v24.33h-24.33Z" />
        </g>
      </svg>
    }
    EnabledImage={
      <svg
        className={className}
        fill="currentcolor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 164.61 164.61"
      >
        <g>
          <path d="M82.3,164.61C36.92,164.61,0,127.69,0,82.3S36.92,0,82.3,0s82.3,36.92,82.3,82.3-36.92,82.3-82.3,82.3ZM82.3,5C39.68,5,5,39.68,5,82.3s34.68,77.3,77.3,77.3,77.3-34.68,77.3-77.3S124.93,5,82.3,5ZM99.38,108.04h-59.68c-4.58,0-8.3-3.71-8.3-8.3v-43.17h59.43c4.72,0,8.55,3.83,8.55,8.55v42.92ZM133.2,106.05v-47.49c0-2.29-2.58-3.63-4.46-2.31l-22.73,16.02c-.75.53-1.2,1.39-1.2,2.31v15.45c0,.92.45,1.78,1.2,2.31l22.73,16.02c1.87,1.32,4.46-.02,4.46-2.31Z" />
        </g>
      </svg>
    }

    active={active}
    disabled={disabled}
  />
);
