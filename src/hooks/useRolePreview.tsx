import { createContext, useContext, useState, ReactNode } from 'react';

type Role = 'admin' | 'mentor' | 'mentee';

interface RolePreviewContextType {
  previewRole: Role | null;
  setPreviewRole: (role: Role | null) => void;
  getEffectiveRole: (actualRole: string | null) => Role;
  isPreviewMode: boolean;
}

const RolePreviewContext = createContext<RolePreviewContextType | null>(null);

export function useRolePreview() {
  const context = useContext(RolePreviewContext);
  if (!context) {
    throw new Error('useRolePreview must be used within a RolePreviewProvider');
  }
  return context;
}

interface RolePreviewProviderProps {
  children: ReactNode;
}

export function RolePreviewProvider({ children }: RolePreviewProviderProps) {
  const [previewRole, setPreviewRole] = useState<Role | null>(null);

  const getEffectiveRole = (actualRole: string | null): Role => {
    if (previewRole && actualRole === 'admin') {
      return previewRole;
    }
    return (actualRole as Role) || 'mentee';
  };

  const isPreviewMode = previewRole !== null;

  return (
    <RolePreviewContext.Provider value={{
      previewRole,
      setPreviewRole,
      getEffectiveRole,
      isPreviewMode
    }}>
      {children}
    </RolePreviewContext.Provider>
  );
}