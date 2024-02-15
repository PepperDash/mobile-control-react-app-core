import { IconProps, MultiStateIconContainer } from '../../Buttons';

export const IconMultiTemplate = ({
  active,
  // Just to shut up the linter on this template. Prefer deleting this lint rule
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  className = '',
  disabled,
}: IconProps) => (
  <MultiStateIconContainer
    ActiveImage={undefined
    }
    DisabledImage={undefined}
    EnabledImage={undefined}
    active={active}
    disabled={disabled}
  />
);
