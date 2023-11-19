import { useEffect, useRef } from "react";




// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useClickOutside = <T extends HTMLElement>(handler: () => void) => {
   const domNode = useRef<T | null>(null);

   useEffect(() => {
      const maybeHandler = (event: MouseEvent) => {
         if (!domNode.current?.contains(event.target as Node)) {
            handler();
         }
      };

      document.addEventListener("mousedown", maybeHandler);

      return () => {
         document.removeEventListener("mousedown", maybeHandler);
      };
   });

   return domNode;
};

export default useClickOutside;