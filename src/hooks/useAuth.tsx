import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
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
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    const mockUser: User = {
      id: '1',
      name: 'Jason Torres',
      email: email,
      role: email === 'admin@torc.dev' ? 'admin' : email === 'mentee@torc.dev' ? 'mentee' : 'mentor',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      createdAt: new Date(),
      lastActive: new Date(),
      onboardingStep: 'completed',
      isOnboardingComplete: true,
      groupId: email !== 'admin@torc.dev' ? 'group-1' : undefined,
      bio: 'Community Evangelist and Program Coordinator at Torc',
      skills: ['Leadership', 'Mentorship', 'Community Building'],
      experience: '5+ years',
      linkedinUrl: 'https://linkedin.com/in/jasontorres',
      githubUrl: 'https://github.com/jasontorres',
      discordUsername: 'jason#1234',
      preferredVideoTool: 'Google Meet'
    };

    localStorage.setItem('torc-user', JSON.stringify(mockUser));
    setUser(mockUser);
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
    login,
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