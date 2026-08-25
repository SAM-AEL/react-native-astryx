import { createContext, useContext, useState, type ReactNode } from 'react';

export interface LayerValue {
  /** Highest active overlay layer id; null when none. */
  topLayer: string | null;
}

const LayerContext = createContext<LayerValue>({ topLayer: null });

/**
 * Tracks which overlay currently owns the top layer so apps can gate
 * gestures or back handling. A simplified native take on upstream's
 * LayerProvider.
 */
export function LayerProvider({ children }: { children: ReactNode }) {
  const [topLayer, setTopLayer] = useState<string | null>(null);
  const value = { topLayer, setTopLayer };

  return (
    <LayerContext.Provider value={value}>{children}</LayerContext.Provider>
  );
}

export function useLayer(id: string) {
  const ctx = useContext(LayerContext);
  if (!ctx || !('setTopLayer' in ctx)) {
    return { isTop: true, bringToFront: () => {} };
  }
  return {
    isTop: ctx.topLayer == null || ctx.topLayer === id,
    bringToFront: () =>
      (ctx as { setTopLayer: (id: string) => void }).setTopLayer(id),
  };
}
