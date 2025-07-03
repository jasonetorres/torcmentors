import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useSupabaseAuth';
import { useRolePreview } from '@/hooks/useRolePreview';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  Calendar, 
  CheckSquare, 
  Users,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  Zap,
  BookOpen,
  FileText
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { getEffectiveRole } = useRolePreview();
  const [groupMembers, setGroupMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !profile) return;
      
      try {
        // Fetch all profiles to show real users
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .neq('user_id', user.id);

        if (error) {
          console.error('Error fetching profiles:', error);
        } else {
          setGroupMembers(profiles || []);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, profile]);

  const handleQuickResourceClick = (resource: string) => {
    if (resource === 'mentor-kit' || resource === 'goal-guide') {
      navigate('/mentor-kit');
    } else if (resource === 'group-management' || resource === 'group-chat') {
      navigate('/group-chat');
    } else if (resource === 'progress-templates' || resource === 'goals-workshop') {
      navigate('/goals');
    }
  };

  const effectiveRole = getEffectiveRole(profile?.role);

  if (effectiveRole === 'admin') {
    return <AdminDashboard />;
  }

  const isMentor = effectiveRole === 'mentor';

  const mentees = groupMembers.filter(member => member.role === 'mentee');
  const mentors = groupMembers.filter(member => member.role === 'mentor');
  
  const stats = isMentor ? [
    { title: "Total Users", value: groupMembers.length.toString(), change: "in system", icon: Users, color: "text-primary" },
    { title: "Mentees", value: mentees.length.toString(), change: "registered", icon: Calendar, color: "text-accent" },
    { title: "Mentors", value: mentors.length.toString(), change: "available", icon: Target, color: "text-success" },
    { title: "System Status", value: "Active", change: "running smoothly", icon: Clock, color: "text-warning" }
  ] : [
    { title: "Your Role", value: profile?.role || 'mentee', change: "current role", icon: Target, color: "text-primary" },
    { title: "Profile", value: profile?.display_name ? "Complete" : "Setup", change: "status", icon: CheckSquare, color: "text-warning" },
    { title: "Community", value: groupMembers.length.toString(), change: "total members", icon: TrendingUp, color: "text-success" },
    { title: "Welcome", value: "👋", change: "to Torc!", icon: Clock, color: "text-accent" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {profile?.display_name?.split(' ')[0] || 'there'}! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            {isMentor 
              ? "Your mentees are making great progress. Keep up the excellent mentoring!"
              : "You're doing amazing! Here's your current progress and upcoming activities."
            }
          </p>
        </div>
        <Button className="bg-gradient-primary shadow-glow">
          <Zap className="w-4 h-4 mr-2" />
          Quick Actions
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className={`text-xs ${stat.color} mt-1`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-secondary ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Goals / Group Progress */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  {isMentor ? 'Group Progress Overview' : 'Current Goals'}
                </CardTitle>
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <CardDescription>
                {isMentor 
                  ? 'Track your mentees\' progress across their development goals'
                  : 'Your active development goals and progress'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isMentor ? (
                // Mentor view - Real user profiles
                loading ? (
                  <div className="p-4 text-center text-muted-foreground">Loading user data...</div>
                ) : groupMembers.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">
                    <p>No other users registered yet.</p>
                    <p className="text-sm mt-1">Users will appear here as they join the platform.</p>
                  </div>
                ) : (
                  groupMembers.slice(0, 3).map((member) => (
                    <div key={member.id} className="p-4 rounded-lg bg-secondary/50 border-l-4 border-primary">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">
                          {member.display_name || 'New User'}
                        </h4>
                        <Badge variant="outline" className="border-primary text-primary">
                          {member.role || 'Member'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {member.bio || 'Profile being set up...'}
                      </p>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-gradient-primary h-2 rounded-full w-1/2" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Joined {new Date(member.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )
              ) : (
                // Mentee view - Your profile info
                <div className="p-4 rounded-lg bg-secondary/50 border-l-4 border-primary">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">Your Profile</h4>
                    <Badge variant="outline" className="border-primary text-primary">
                      {profile?.is_onboarding_complete ? 'Complete' : 'In Progress'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {profile?.bio || 'Complete your profile in Settings to get started'}
                  </p>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-primary h-2 rounded-full w-3/4" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Member since {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'recently'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Activities */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30">
                <Calendar className="w-4 h-4 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Group Meeting</p>
                  <p className="text-xs text-muted-foreground">Wednesday 6:00 PM EST</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-warning/10 border border-warning/30">
                <CheckSquare className="w-4 h-4 text-warning" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Task Due</p>
                  <p className="text-xs text-muted-foreground">GitHub setup - Friday</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-accent/10 border border-accent/30">
                <Star className="w-4 h-4 text-accent" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Milestone Review</p>
                  <p className="text-xs text-muted-foreground">Next week</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Resources */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-success" />
                Quick Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => handleQuickResourceClick(isMentor ? 'mentor-kit' : 'goal-guide')}
              >
                <FileText className="w-4 h-4 mr-2" />
                {isMentor ? 'Phase 2 Mentor Kit' : 'Goal Setting Guide'}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => handleQuickResourceClick(isMentor ? 'group-management' : 'group-chat')}
              >
                <Users className="w-4 h-4 mr-2" />
                {isMentor ? 'Group Management' : 'Study Group Chat'}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => handleQuickResourceClick(isMentor ? 'progress-templates' : 'goals-workshop')}
              >
                <Target className="w-4 h-4 mr-2" />
                {isMentor ? 'Progress Templates' : 'SMART Goals Workshop'}
              </Button>
            </CardContent>
          </Card>

          {/* Achievement */}
          <Card className="bg-gradient-primary/10 border-primary/30">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-3 shadow-glow">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {isMentor ? 'Great Mentoring!' : 'Keep It Up!'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isMentor 
                  ? 'Your mentees show 95% engagement rate this month'
                  : 'You\'ve completed 3 goals this month - amazing progress!'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}