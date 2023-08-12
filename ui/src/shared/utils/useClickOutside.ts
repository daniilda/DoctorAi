import { RefObject, useEffect } from "react";

export const useClickOutside = <T extends HTMLElement>(
  deps: RefObject<T>[],
  handler: (event: Event) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        deps.every(
          (ref) => ref.current && !ref.current.contains(event.target as Node)
        )
      ) {
        handler(event);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("touchstart", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
    };
  }, [deps, handler]);
};
