import { useState } from 'react';
import { NamedIconButton } from "../Buttons";
import { iconsDictionary } from "./iconsDictionary";

const IconLibrary = () => {
  const [active, setActive] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const icons = iconsDictionary;

  const keys = Object.keys(icons) as Array<keyof typeof icons>;

  return (
      <div className="icon-library">
        <button onClick={() => setActive(!active)}>Active</button>
        <button onClick={() => setDisabled(!disabled)}>Disabled</button>
        {keys.map((key) => {
          return <NamedIconButton name={key} key={key} disabled={disabled} />;
        })}
      </div>
  );
};

export default IconLibrary;
