import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import Login from "./pages/Login";
import AccountSetup from "./pages/AccountSetup";
import Dashboard from "./pages/Dashboard";
import Communication from "./pages/Communication";
import Progress from "./pages/Progress";
import Onboarding from "./pages/Onboarding";
import Groups from "./pages/Groups";
import Users from "./pages/Users";
import Resources from "./pages/Resources";
import Analytics from "./pages/Analytics";
import MentorKit from "./pages/MentorKit";
import Goals from "./pages/Goals";
import Tasks from "./pages/Tasks";
import Meetings from "./pages/Meetings";
import Group from "./pages/Group";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

function AppRoutes() {
  const { user, isLoading } = useAuth();

  // Show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // No user - show login
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // User not onboarded - show setup flow (except for admin)
  if (!user.isOnboardingComplete && user.role !== 'admin') {
    if (user.onboardingStep === 'account-setup') {
      return (
        <Routes>
          <Route path="/setup" element={<AccountSetup />} />
          <Route path="*" element={<Navigate to="/setup" replace />} />
        </Routes>
      );
    }
    return (
      <Routes>
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="*" element={<Navigate to="/onboarding" replace />} />
      </Routes>
    );
  }

  // User authenticated and onboarded - show main app
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Admin Routes */}
        {user.role === 'admin' && (
          <>
            <Route path="/groups" element={<Groups />} />
            <Route path="/users" element={<Users />} />
            <Route path="/analytics" element={<Analytics />} />
          </>
        )}
        
        {/* Mentor Routes */}
        {user.role === 'mentor' && (
          <>
            <Route path="/mentor-kit" element={<MentorKit />} />
          </>
        )}
        
        {/* Shared Routes */}
        <Route path="/communication" element={<Communication />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/meetings" element={<Meetings />} />
        <Route path="/group" element={<Group />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
