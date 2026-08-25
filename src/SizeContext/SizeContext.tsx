import { createContext, useContext, useMemo, type ReactNode } from 'react';

export interface SizeScale {
  /** Multiplier applied to component default sizes. */
  multiplier: number;
}

const DEFAULT_SCALE: SizeScale = { multiplier: 1 };

const SizeContext = createContext<SizeScale>(DEFAULT_SCALE);

/** Adjusts the density of size-aware components in a subtree. */
export function SizeProvider({
  scale,
  children,
}: {
  scale: Partial<SizeScale>;
  children: ReactNode;
}) {
  const multiplier = scale.multiplier ?? DEFAULT_SCALE.multiplier;
  const value = useMemo<SizeScale>(() => ({ multiplier }), [multiplier]);
  return <SizeContext.Provider value={value}>{children}</SizeContext.Provider>;
}

export function useSizeScale(): SizeScale {
  return useContext(SizeContext);
}
