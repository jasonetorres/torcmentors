import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import RolePreviewBanner from '@/components/admin/RolePreviewBanner';
import { useAuth } from '@/hooks/useSupabaseAuth';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { profile } = useAuth();
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {profile?.role === 'admin' && <RolePreviewBanner />}
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}