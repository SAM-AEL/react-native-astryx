import * as React from 'react';

/**
 * Native-relevant hooks barrel. Upstream ships more (focus traps,
 * hotkeys, overflow measurement); those are web-only concerns.
 */

/** Debounces a callback; the trailing call wins. */
export function useDebouncedCallback<C extends (...args: never[]) => void>(
  callback: C,
  wait: number
): (...args: Parameters<C>) => void {
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  React.useEffect(
    () => () => {
      if (timer.current != null) clearTimeout(timer.current);
    },
    []
  );
  return React.useCallback(
    (...args: Parameters<C>) => {
      if (timer.current != null) clearTimeout(timer.current);
      timer.current = setTimeout(() => callback(...args), wait);
    },
    [callback, wait]
  );
}

/** Returns the previous render's value. */
export function usePrevious<T>(value: T): T | undefined {
  const ref = React.useRef<T | undefined>(undefined);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/** Boolean toggle helper. */
export function useToggle(initial = false): [boolean, () => void] {
  const [on, setOn] = React.useState(initial);
  return [on, React.useCallback(() => setOn((v) => !v), [])];
}
