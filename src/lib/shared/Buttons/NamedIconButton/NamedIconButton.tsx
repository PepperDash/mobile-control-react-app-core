import { IconNames, iconsDictionary as defaultIconsDictionary } from '../../Icons/iconsDictionary';
import { IconButton, IconButtonProps, MultiIconFC } from '../IconButton/IconButton';

export function NamedIconButton({
  name,
  iconsDictionary = defaultIconsDictionary,
  ...otherProps
}: NamedIconButtonProps) {
  const multiIcon = iconsDictionary[name] ?? null;

  if(!multiIcon) console.error(`Icon ${name} not found in dictionary`);

  return <IconButton multiIcon={multiIcon} {...otherProps} />;
}

type NamedIconButtonProps = Omit<IconButtonProps, 'multiIcon'> & {
  name: IconNames;

  /**
   * Optional dictionary of icons to use for the button if the default is not desired.
   */
  iconsDictionary?: Record<IconNames, MultiIconFC>;
};