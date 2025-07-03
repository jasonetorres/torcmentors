import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Target, 
  Calendar,
  CheckCircle,
  Clock,
  Star,
  Award,
  BarChart3,
  Activity,
  Zap
} from 'lucide-react';
import { useAuth } from '@/hooks/useSupabaseAuth';

export default function Progress() {
  const { user, profile } = useAuth();

  const stats = [
    { 
      title: "Goals Completed", 
      value: "3", 
      change: "+1 this month", 
      icon: Target, 
      color: "text-primary" 
    },
    { 
      title: "Total Progress", 
      value: "67%", 
      change: "+12% this quarter", 
      icon: TrendingUp, 
      color: "text-success" 
    },
    { 
      title: "Meeting Streak", 
      value: "8", 
      change: "consecutive weeks", 
      icon: Calendar, 
      color: "text-accent" 
    },
    { 
      title: "Skill Points", 
      value: "245", 
      change: "+45 this month", 
      icon: Star, 
      color: "text-warning" 
    }
  ];

  const achievements = [
    {
      id: '1',
      title: 'Goal Crusher',
      description: 'Completed your first development goal',
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      date: '2 weeks ago',
      earned: true
    },
    {
      id: '2',
      title: 'Consistent Learner',
      description: 'Attended 5 consecutive meetings',
      icon: Calendar,
      color: 'text-success',
      bgColor: 'bg-success/20',
      date: '1 week ago',
      earned: true
    },
    {
      id: '3',
      title: 'Team Player',
      description: 'Actively participated in group discussions',
      icon: Star,
      color: 'text-accent',
      bgColor: 'bg-accent/20',
      date: 'In progress',
      earned: false
    },
    {
      id: '4',
      title: 'Skill Master',
      description: 'Complete 5 technical goals',
      icon: Award,
      color: 'text-warning',
      bgColor: 'bg-warning/20',
      date: 'Not started',
      earned: false
    }
  ];

  const progressData = [
    { month: 'Jul', value: 20 },
    { month: 'Aug', value: 35 },
    { month: 'Sep', value: 45 },
    { month: 'Oct', value: 52 },
    { month: 'Nov', value: 58 },
    { month: 'Dec', value: 67 }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'goal_completed',
      title: 'Completed "Master React Hooks"',
      description: 'Successfully finished all milestones',
      timestamp: '2 days ago',
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      id: '2',
      type: 'meeting_attended',
      title: 'Attended Group Meeting',
      description: 'Phase 1: Goal Setting Workshop',
      timestamp: '3 days ago',
      icon: Calendar,
      color: 'text-primary'
    },
    {
      id: '3',
      type: 'milestone_reached',
      title: 'Milestone Completed',
      description: 'Built first React component',
      timestamp: '1 week ago',
      icon: Star,
      color: 'text-accent'
    },
    {
      id: '4',
      type: 'feedback_received',
      title: 'Mentor Feedback',
      description: 'Great progress on communication skills',
      timestamp: '1 week ago',
      icon: Star,
      color: 'text-warning'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Progress</h1>
          <p className="text-muted-foreground mt-2">
            Track your development journey and celebrate achievements
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <BarChart3 className="w-4 h-4 mr-2" />
          View Detailed Report
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Chart */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Progress Over Time
              </CardTitle>
              <CardDescription>
                Your development progress across all goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between gap-4">
                {progressData.map((data, index) => (
                  <div key={data.month} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-gradient-primary rounded-t-lg transition-all duration-500"
                      style={{ height: `${data.value * 2}px` }}
                    />
                    <div className="text-xs text-muted-foreground mt-2 font-medium">
                      {data.month}
                    </div>
                    <div className="text-xs text-foreground font-semibold">
                      {data.value}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-accent" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Goals worked on</span>
                <span className="font-semibold text-foreground">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Tasks completed</span>
                <span className="font-semibold text-foreground">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Time invested</span>
                <span className="font-semibold text-foreground">8.5h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Feedback received</span>
                <span className="font-semibold text-foreground">2</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-primary/10 border-primary/30">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-3 shadow-glow">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Keep It Up!</h3>
              <p className="text-sm text-muted-foreground">
                You're 33% ahead of schedule on your development goals. Amazing progress!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Achievements and Activities */}
      <Tabs defaultValue="achievements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement) => (
              <Card 
                key={achievement.id} 
                className={`bg-gradient-card border-border shadow-card ${
                  achievement.earned ? 'ring-2 ring-primary/30' : 'opacity-60'
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${achievement.bgColor}`}>
                        <achievement.icon className={`w-6 h-6 ${achievement.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{achievement.title}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                    </div>
                    {achievement.earned && (
                      <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                        Earned
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{achievement.date}</span>
                    {achievement.earned && (
                      <div className="flex items-center gap-1 text-success">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Completed</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest accomplishments and interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-secondary/30">
                    <div className={`p-2 rounded-lg bg-secondary ${activity.color}`}>
                      <activity.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{activity.title}</h4>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}