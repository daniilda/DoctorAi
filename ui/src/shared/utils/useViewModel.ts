import { useCallback, useRef, useSyncExternalStore } from "react";

export interface DisposableVm {
  dispose(): void;
}

export function useViewModel<T extends DisposableVm>(factory: () => T): T {
  const ref = useRef<T | null>(null);
  const onStoreChange = useCallback(() => {
    if (!ref.current) {
      ref.current = factory();
    }
    return () => {
      ref.current?.dispose();
      ref.current = null;
    };
  }, []);
  const getFromRef = useCallback(() => {
    if (!ref.current) {
      ref.current = factory();
    }

    return ref.current;
  }, []);

  return useSyncExternalStore(onStoreChange, getFromRef);
}
