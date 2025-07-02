import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  ChevronLeft,
  ChevronRight,
  BarChart3,
  UserPlus,
  Briefcase,
  MessageSquare,
  FileText,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const adminNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, badge: null },
    { name: 'Groups', href: '/groups', icon: Users, badge: '10' },
    { name: 'Users', href: '/users', icon: UserPlus, badge: '52' },
    { name: 'Resources', href: '/resources', icon: BookOpen, badge: null },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, badge: null },
    { name: 'Surveys', href: '/surveys', icon: MessageSquare, badge: '3' },
    { name: 'Settings', href: '/settings', icon: Settings, badge: null }
  ];

  const mentorNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, badge: null },
    { name: 'My Group', href: '/group', icon: Users, badge: '3' },
    { name: 'Communication', href: '/communication', icon: MessageSquare, badge: '5' },
    { name: 'Mentor Kit', href: '/mentor-kit', icon: Briefcase, badge: 'New' },
    { name: 'Meetings', href: '/meetings', icon: Calendar, badge: '2' },
    { name: 'Goals & Progress', href: '/goals', icon: Target, badge: null },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare, badge: '4' },
    { name: 'Resources', href: '/resources', icon: BookOpen, badge: null },
    { name: 'Feedback', href: '/feedback', icon: Star, badge: null }
  ];

  const menteeNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home, badge: null },
    { name: 'My Goals', href: '/goals', icon: Target, badge: '3' },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare, badge: '2' },
    { name: 'Communication', href: '/communication', icon: MessageSquare, badge: '3' },
    { name: 'Meetings', href: '/meetings', icon: Calendar, badge: '1' },
    { name: 'Group', href: '/group', icon: Users, badge: null },
    { name: 'Resources', href: '/resources', icon: BookOpen, badge: null },
    { name: 'Progress', href: '/progress', icon: TrendingUp, badge: null }
  ];

  const navItems = 
    user?.role === 'admin' ? adminNavItems :
    user?.role === 'mentor' ? mentorNavItems :
    menteeNavItems;

  return (
    <div className={cn(
      "h-screen bg-gradient-card border-r border-border transition-all duration-300 ease-in-out flex flex-col shadow-card",
      isCollapsed ? "w-16" : "w-72"
    )}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-primary-foreground font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="font-bold text-foreground text-lg">Torc Mentorship</h1>
                <p className="text-sm text-muted-foreground">
                  {user?.role === 'admin' ? 'Admin Panel' : 
                   user?.role === 'mentor' ? 'Mentor Portal' : 'Mentee Portal'}
                </p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0 hover:bg-secondary"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-gradient-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/80",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1">{item.name}</span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-xs h-5 px-2",
                            isActive 
                              ? "bg-primary-foreground/20 text-primary-foreground" 
                              : "bg-primary/20 text-primary"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 border-t border-border/50">
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-xs"
            >
              <Clock className="w-4 h-4 mr-2" />
              Next Meeting: Wed 6PM
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start text-xs"
            >
              <FileText className="w-4 h-4 mr-2" />
              2 Tasks Due Soon
            </Button>
          </div>
        </div>
      )}

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center gap-3",
          isCollapsed && "justify-center"
        )}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'}
            alt={user?.name || 'User'}
            className="w-10 h-10 rounded-full border-2 border-primary/30 shadow-card"
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {user?.name}
              </p>
              <p className="text-xs text-muted-foreground capitalize">
                {user?.role}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}