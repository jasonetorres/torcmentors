import { ReactNode } from 'react';
import { AppSidebar } from './AppSidebar';
import Header from './Header';
import RolePreviewBanner from '@/components/admin/RolePreviewBanner';
import { useAuth } from '@/hooks/useSupabaseAuth';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { profile } = useAuth();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            {profile?.role === 'admin' && <RolePreviewBanner />}
            <div className="ml-auto">
              <Header />
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 overflow-hidden">
            <div className="max-w-full overflow-hidden">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}