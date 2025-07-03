import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useSupabaseAuth';
import { useRolePreview } from '@/hooks/useRolePreview';
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

  const stats = isMentor ? [
    { title: "Group Members", value: "3", change: "mentees", icon: Users, color: "text-primary" },
    { title: "Completed Sessions", value: "2/12", change: "this phase", icon: Calendar, color: "text-accent" },
    { title: "Active Goals", value: "8", change: "across group", icon: Target, color: "text-success" },
    { title: "Next Meeting", value: "2 days", change: "Wednesday 6PM", icon: Clock, color: "text-warning" }
  ] : [
    { title: "Active Goals", value: "3", change: "+1 this week", icon: Target, color: "text-primary" },
    { title: "Tasks Due", value: "2", change: "this week", icon: CheckSquare, color: "text-warning" },
    { title: "Progress Score", value: "85%", change: "+5% this month", icon: TrendingUp, color: "text-success" },
    { title: "Next Meeting", value: "2 days", change: "Wednesday 6PM", icon: Clock, color: "text-accent" }
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
                // Mentor view - Group progress
                <>
                  <div className="p-4 rounded-lg bg-secondary/50 border-l-4 border-primary">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">Alex Rivera</h4>
                      <Badge variant="outline" className="border-success text-success">On Track</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Full-stack development goals • 2/3 milestones complete
                    </p>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full w-2/3" />
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-secondary/50 border-l-4 border-warning">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">Jordan Kim</h4>
                      <Badge variant="outline" className="border-warning text-warning">Needs Support</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      React specialization • 1/3 milestones complete
                    </p>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-gradient-accent h-2 rounded-full w-1/3" />
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-secondary/50 border-l-4 border-accent">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">Sam Taylor</h4>
                      <Badge variant="outline" className="border-primary text-primary">Excelling</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      System design mastery • 3/3 milestones complete
                    </p>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full w-full" />
                    </div>
                  </div>
                </>
              ) : (
                // Mentee view - Personal goals
                <>
                  <div className="p-4 rounded-lg bg-secondary/50 border-l-4 border-primary">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">Build Full-Stack Application</h4>
                      <Badge variant="outline" className="border-primary text-primary">In Progress</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Create a complete web app using React and Node.js
                    </p>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-gradient-primary h-2 rounded-full w-1/3" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">2/6 milestones complete</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-secondary/50 border-l-4 border-success">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">Master React Fundamentals</h4>
                      <Badge variant="outline" className="border-success text-success">Completed</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Learn core React concepts and hooks
                    </p>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-gradient-accent h-2 rounded-full w-full" />
                    </div>
                    <p className="text-xs text-success mt-2">Completed 2 weeks ago</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-secondary/50 border-l-4 border-accent">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">Improve Communication Skills</h4>
                      <Badge variant="outline" className="border-accent text-accent">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Practice technical presentations and feedback
                    </p>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div className="bg-gradient-accent h-2 rounded-full w-1/2" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">1/2 milestones complete</p>
                  </div>
                </>
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