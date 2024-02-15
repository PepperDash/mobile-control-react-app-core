import { IconNames, iconsDictionary } from '../../Icons/iconsDictionary';
import { IconButton, IconButtonProps } from '../IconButton/IconButton';

export function NamedIconButton({
  name,
  ...otherProps
}: NamedIconButtonProps) {
  return <IconButton multiIcon={iconsDictionary[name]} {...otherProps} />;
}

type NamedIconButtonProps = Omit<IconButtonProps, 'multiIcon'> & {
  name: IconNames;
};