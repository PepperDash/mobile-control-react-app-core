import { RefObject, useLayoutEffect, useState } from "react";

export function useScroll<T extends HTMLElement | undefined>(ref: RefObject<T | undefined>): UseScrollProps {  
  
  const [horizontalScrollPosition, setHorizontalScrollPosition] = useState(ref?.current?.scrollLeft ?? 0);
  const [verticalScrollPosition, setVerticalScrollPosition] = useState(ref?.current?.scrollTop ?? 0);

  const scrollHorizontal = (increment: number) => {
    const { current } = ref;

    if (!current) return;

    console.log(current.scrollLeft);

    current.scrollLeft += increment;

    console.log(current.scrollLeft);
  }

  const scrollVertical = (increment: number) => {
    const { current } = ref;

    if (!current) return;

    console.log(current.scrollTop);

    current.scrollTop += increment;

    console.log(current.scrollTop);
  }

  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {           
      setHorizontalScrollPosition(current?.scrollLeft ?? 0);
      setVerticalScrollPosition(current?.scrollTop ?? 0); 
    }

    if (!current) return;

    trigger();
  }, [ref])

  return {horizontalScrollPosition, verticalScrollPosition, scrollHorizontal, scrollVertical};
}

export default useScroll;

export interface UseScrollProps {
  scrollHorizontal: (increment: number) => void;
  scrollVertical: (increment: number) => void;
  horizontalScrollPosition: number;
  verticalScrollPosition: number;
}