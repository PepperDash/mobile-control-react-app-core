import { RefObject, useLayoutEffect, useState } from "react";

export function useOverflow<T extends HTMLElement | undefined>(ref:RefObject<T | undefined>, callback?:(hasOverflowVertical: boolean, hasOverflowHorizontal: boolean) => void):UseIsOverflowProps {
  const [overflowHorizontal, setOverflowHorizontal] = useState(false);
  const [overflowVertical, setOverflowVertical] = useState(false);


  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflowVertical = current && current.scrollHeight > current.clientHeight;
      const hasOverflowHorizontal = current && current.scrollWidth > current.clientWidth;

      setOverflowVertical(hasOverflowVertical ?? false);
      setOverflowHorizontal(hasOverflowHorizontal ?? false);

      if (!callback) return;

      callback(hasOverflowVertical ?? false, hasOverflowHorizontal ?? false);
    }

    if (!current) return;

    trigger();
  }, [ref, callback])

  return { overflowHorizontal, overflowVertical };
}

export interface UseIsOverflowProps {
  overflowHorizontal: boolean;
  overflowVertical: boolean;
}

export default useOverflow;