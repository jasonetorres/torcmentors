import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  loginWithEmailCode: (email: string, code: string) => Promise<void>;
  loginWithEmailPassword: (email: string, password: string) => Promise<void>;
  adminLogin: (password: string) => Promise<void>;
  completeAccountSetup: (setupData: any) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  isLoading: boolean;
  checkUserExists: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Pre-approved mentor emails
const APPROVED_MENTORS = [
  'giovannydeleon@gmail.com',
  'jacobjohntorres@gmail.com', 
  'ashish.ojha@aol.in',
  'brjedi@gmail.com',
  'moises.alejandro.serrano@gmail.com',
  'robertjcameron@yahoo.com',
  'pvmagacho@gmail.com',
  'pete@codeonthebeach.com',
  'me@dandigangi.com',
  'leeanahjames@gmail.com',
  'amcp.engineer@gmail.com'
];

// Pre-approved mentee emails  
const APPROVED_MENTEES = [
  'martina.berns@ingenieria.uner.edu.ar',
  'pranshuraj65536+torc@gmail.com',
  'jagrut.pratik@gmail.com',
  'danmndes@gmail.com',
  'philipminielly@gmail.com',
  'johnsonolaolu@gmail.com',
  'adetomiwaabdul@gmail.com',
  'vishalpawarr.git@gmail.com',
  'kiriaditi15@gmail.com',
  'jsprogramming.123@gmail.com',
  'gauravkalita.nlp@gmail.com',
  'umreutkarsh@gmail.com',
  'menyagah27@gmail.com',
  'hast.job@gmail.com',
  'teyenike1@gmail.com',
  'isaacscheff@gmail.com',
  'cjmooredev@gmail.com',
  'anjukaranji@gmail.com',
  'shittuidris45@gmail.com',
  'dassandrew3@gmail.com',
  'kpctyn@gmail.com',
  'enver.francisco@gmail.com',
  'mohhasbias@gmail.com',
  'tarsis1477@gmail.com',
  'olawalekareemdev@gmail.com',
  'merytpeters@gmail.com',
  'davonnejv@gmail.com',
  'luke.floden@gmail.com',
  'walterfurrer@proton.me',
  'michaeljohnraymond@gmail.com',
  'kelly.m.hill2115@gmail.com',
  'Luckyjoseph1996@gmail.com',
  'saiddetz@gmail.com',
  'ranhindavibhashana@gmail.com',
  'menezes.ecd@gmail.com',
  'brandon.hamilton.dev@gmail.com',
  'bryanfinesw@gmail.com',
  'mmebit@icloud.com',
  'cmelendezgp@gmail.com'
];

const MENTOR_CODE = 'mentor';
const MENTEE_CODE = 'mentee2025';
const ADMIN_PASSWORD = 'torc-admin-2024';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem('torc-user');
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Error parsing saved user, clearing localStorage:', error);
          localStorage.removeItem('torc-user');
        }
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const checkUserExists = (email: string): boolean => {
    const normalizedEmail = email.toLowerCase().trim();
    const storedUsers = localStorage.getItem('torc-registered-users');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      return users.some((user: any) => user.email === normalizedEmail);
    }
    return false;
  };

  const loginWithEmailPassword = async (email: string, password: string) => {
    setIsLoading(true);
    
    const normalizedEmail = email.toLowerCase().trim();
    const storedUsers = localStorage.getItem('torc-registered-users');
    
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const user = users.find((u: any) => u.email === normalizedEmail && u.password === password);
      
      if (user) {
        // Remove password from user object before setting
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('torc-user', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        setIsLoading(false);
        return;
      }
    }
    
    setIsLoading(false);
    throw new Error('Invalid email or password');
  };

  const loginWithEmailCode = async (email: string, code: string) => {
    setIsLoading(true);
    
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check mentor credentials
    if (code === MENTOR_CODE && APPROVED_MENTORS.includes(normalizedEmail)) {
      const tempUser: User = {
        id: `temp-mentor-${Date.now()}`,
        name: '',
        email: normalizedEmail,
        role: 'mentor',
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
        accessCode: code
      };

      localStorage.setItem('torc-user', JSON.stringify(tempUser));
      setUser(tempUser);
      setIsLoading(false);
      return;
    }
    
    // Check mentee credentials
    if (code === MENTEE_CODE && APPROVED_MENTEES.includes(normalizedEmail)) {
      const tempUser: User = {
        id: `temp-mentee-${Date.now()}`,
        name: '',
        email: normalizedEmail,
        role: 'mentee',
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
        accessCode: code
      };

      localStorage.setItem('torc-user', JSON.stringify(tempUser));
      setUser(tempUser);
      setIsLoading(false);
      return;
    }
    
    // Invalid credentials
    setIsLoading(false);
    throw new Error('Invalid email or access code');
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
      email: 'jason@torc.dev',
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
      email: user.email,
      bio: setupData.bio,
      linkedinUrl: setupData.linkedinUrl,
      githubUrl: setupData.githubUrl,
      discordUsername: setupData.discordUsername,
      onboardingStep: 'completed',
      isOnboardingComplete: true,
      // Auto-assign group based on role (admin can reassign later)
      groupId: user.role === 'mentor' ? undefined : 'unassigned',
      avatar: setupData.avatar,
    };

    // Store user with password for future logins
    const userWithPassword = { ...completedUser, password: setupData.password };
    const storedUsers = localStorage.getItem('torc-registered-users');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Remove any existing user with same email and add new one
    const filteredUsers = users.filter((u: any) => u.email !== user.email);
    filteredUsers.push(userWithPassword);
    localStorage.setItem('torc-registered-users', JSON.stringify(filteredUsers));

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
    loginWithEmailCode,
    loginWithEmailPassword,
    adminLogin,
    completeAccountSetup,
    logout,
    updateUser,
    isLoading,
    checkUserExists
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