import { IconNames, iconsDictionary } from '../../Icons/iconsDictionary';
import { IconButton, IconButtonProps } from '../IconButton/IconButton';

export function NamedIconButton({
  name,
  ...otherProps
}: NamedIconButtonProps) {
  const multiIcon = iconsDictionary[name] ?? null;

  if(!multiIcon) console.error(`Icon ${name} not found in dictionary`);

  return <IconButton multiIcon={multiIcon} {...otherProps} />;
}

type NamedIconButtonProps = Omit<IconButtonProps, 'multiIcon'> & {
  name: IconNames;
};