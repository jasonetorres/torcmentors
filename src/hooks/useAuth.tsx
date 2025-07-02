import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loginWithCode: (accessCode: string) => Promise<void>;
  adminLogin: (password: string) => Promise<void>;
  completeAccountSetup: (setupData: any) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Access codes for different roles
const ACCESS_CODES = {
  'MENTOR2024': 'mentor',
  'MENTEE2024': 'mentee',
  'COHORT1': 'mentee',
  'COHORT2': 'mentee',
  'COACH2024': 'mentor'
};

const ADMIN_PASSWORD = 'torc-admin-2024';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem('torc-user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const loginWithCode = async (accessCode: string) => {
    setIsLoading(true);
    
    const role = ACCESS_CODES[accessCode as keyof typeof ACCESS_CODES];
    if (!role) {
      setIsLoading(false);
      throw new Error('Invalid access code');
    }
    
    // Create temporary user for setup flow
    const tempUser: User = {
      id: `temp-${Date.now()}`,
      name: '',
      email: '',
      role: role as 'mentor' | 'mentee',
      avatar: '',
      createdAt: new Date(),
      lastActive: new Date(),
      onboardingStep: 'account-setup',
      isOnboardingComplete: false,
      groupId: undefined,
      bio: '',
      skills: [],
      experience: '',
      linkedinUrl: '',
      githubUrl: '',
      discordUsername: '',
      preferredVideoTool: 'Google Meet',
      accessCode: accessCode
    };

    localStorage.setItem('torc-user', JSON.stringify(tempUser));
    setUser(tempUser);
    setIsLoading(false);
  };

  const adminLogin = async (password: string) => {
    setIsLoading(true);
    
    if (password !== ADMIN_PASSWORD) {
      setIsLoading(false);
      throw new Error('Invalid admin password');
    }
    
    const adminUser: User = {
      id: 'admin-1',
      name: 'Program Administrator',
      email: 'admin@torc.dev',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      createdAt: new Date(),
      lastActive: new Date(),
      onboardingStep: 'completed',
      isOnboardingComplete: true,
      groupId: undefined,
      bio: 'Program Administrator',
      skills: ['Administration', 'Program Management'],
      experience: 'Admin',
      linkedinUrl: '',
      githubUrl: '',
      discordUsername: '',
      preferredVideoTool: 'Google Meet'
    };

    localStorage.setItem('torc-user', JSON.stringify(adminUser));
    setUser(adminUser);
    setIsLoading(false);
  };

  const completeAccountSetup = async (setupData: any) => {
    setIsLoading(true);
    
    if (!user) {
      throw new Error('No user session found');
    }
    
    const completedUser: User = {
      ...user,
      id: `${user.role}-${Date.now()}`,
      name: setupData.name,
      email: setupData.email,
      bio: setupData.bio,
      linkedinUrl: setupData.linkedinUrl,
      githubUrl: setupData.githubUrl,
      discordUsername: setupData.discordUsername,
      onboardingStep: 'completed',
      isOnboardingComplete: true,
      // Assign to groups based on access code
      groupId: user.accessCode?.includes('COHORT1') ? 'group-1' : 
               user.accessCode?.includes('COHORT2') ? 'group-2' : 
               user.role === 'mentor' ? 'group-1' : 'group-1',
      avatar: `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=32&h=32&fit=crop&crop=face`,
    };

    localStorage.setItem('torc-user', JSON.stringify(completedUser));
    setUser(completedUser);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('torc-user');
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('torc-user', JSON.stringify(updatedUser));
    }
  };

  return {
    user,
    loginWithCode,
    adminLogin,
    completeAccountSetup,
    logout,
    updateUser,
    isLoading
  };
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useAuthState();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}