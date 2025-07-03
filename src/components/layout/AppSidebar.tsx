import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Target, 
  Calendar, 
  BookOpen, 
  CheckSquare,
  Users,
  Settings,
  BarChart3,
  UserPlus,
  Briefcase,
  MessageSquare,
  FileText,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/hooks/useSupabaseAuth';
import { useRolePreview } from '@/hooks/useRolePreview';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { getEffectiveRole } = useRolePreview();
  const { state } = useSidebar();

  const adminNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, badge: null },
    { name: 'Groups', href: '/groups', icon: Users, badge: null },
    { name: 'Users', href: '/users', icon: UserPlus, badge: null },
    { name: 'Resources', href: '/resources', icon: BookOpen, badge: null },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, badge: null },
    { name: 'Surveys', href: '/surveys', icon: MessageSquare, badge: null },
    { name: 'Settings', href: '/settings', icon: Settings, badge: null }
  ];

  const mentorNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, badge: null },
    { name: 'My Group', href: '/group', icon: Users, badge: null },
    { name: 'Group Chat', href: '/group-chat', icon: MessageSquare, badge: null },
    { name: 'Communication', href: '/communication', icon: MessageSquare, badge: null },
    { name: 'Mentor Kit', href: '/mentor-kit', icon: Briefcase, badge: null },
    { name: 'Meetings', href: '/meetings', icon: Calendar, badge: null },
    { name: 'Goals & Progress', href: '/goals', icon: Target, badge: null },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare, badge: null },
    { name: 'Resources', href: '/resources', icon: BookOpen, badge: null },
    { name: 'Feedback', href: '/feedback', icon: Star, badge: null }
  ];

  const menteeNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, badge: null },
    { name: 'My Goals', href: '/goals', icon: Target, badge: null },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare, badge: null },
    { name: 'Group Chat', href: '/group-chat', icon: MessageSquare, badge: null },
    { name: 'Communication', href: '/communication', icon: MessageSquare, badge: null },
    { name: 'Meetings', href: '/meetings', icon: Calendar, badge: null },
    { name: 'Group', href: '/group', icon: Users, badge: null },
    { name: 'Resources', href: '/resources', icon: BookOpen, badge: null },
    { name: 'Progress', href: '/progress', icon: TrendingUp, badge: null }
  ];

  const effectiveRole = getEffectiveRole(profile?.role);
  const navItems = 
    effectiveRole === 'admin' ? adminNavItems :
    effectiveRole === 'mentor' ? mentorNavItems :
    menteeNavItems;

  const isCollapsed = state === 'collapsed';

  const handleNextMeetingClick = () => {
    navigate('/meetings');
  };

  const handleTasksClick = () => {
    navigate('/tasks');
  };

  return (
    <Sidebar variant="inset" className="border-r border-border">
      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-3 p-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
            <span className="text-primary-foreground font-bold text-lg">T</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-bold text-foreground text-lg">Torc Mentorship</h1>
              <p className="text-sm text-muted-foreground">
                {effectiveRole === 'admin' ? 'Admin Panel' : 
                 effectiveRole === 'mentor' ? 'Mentor Portal' : 'Mentee Portal'}
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink to={item.href} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        {!isCollapsed && (
                          <>
                            <span className="flex-1">{item.name}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs h-5 px-2">
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupContent className="px-4 space-y-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs hover:bg-secondary/80 transition-colors"
                onClick={handleNextMeetingClick}
              >
                <Clock className="w-4 h-4 mr-2" />
                Next Meeting: Wed 6PM
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start text-xs hover:bg-secondary/80 transition-colors"
                onClick={handleTasksClick}
              >
                <FileText className="w-4 h-4 mr-2" />
                2 Tasks Due Soon
              </Button>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-border">
        <div className="p-4">
          <div className={cn(
            "flex items-center gap-3",
            isCollapsed && "justify-center"
          )}>
            <img
              src={profile?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
              alt={profile?.display_name || user?.email || 'User'}
              className="w-10 h-10 rounded-full border-2 border-primary/30 shadow-card"
            />
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {profile?.display_name || user?.email}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {profile?.role}
                </p>
              </div>
            )}
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}