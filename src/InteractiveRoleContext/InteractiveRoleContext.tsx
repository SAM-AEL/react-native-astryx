import { createContext, useContext, type ReactNode } from 'react';

export type InteractiveRole = 'button' | 'link' | 'menuitem' | 'tab';

const InteractiveRoleContext = createContext<InteractiveRole | null>(null);

/** Announces the interactive role of the nearest composite control. */
export function InteractiveRoleProvider({
  role,
  children,
}: {
  role: InteractiveRole;
  children: ReactNode;
}) {
  return (
    <InteractiveRoleContext.Provider value={role}>
      {children}
    </InteractiveRoleContext.Provider>
  );
}

export function useInteractiveRole(): InteractiveRole | null {
  return useContext(InteractiveRoleContext);
}
