import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  UserPlus,
  FileText,
  Settings,
  MessageSquare,
  BarChart3,
  Clock
} from 'lucide-react';
import { mockAnalytics, mockGroups, mockUsers, mockResources } from '@/data/mockData';
import { Group, User, Resource } from '@/types';

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');

  const stats = [
    {
      title: "Total Mentors",
      value: "10",
      change: "+2 this month",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Mentees", 
      value: "42",
      change: "+8 this month",
      icon: UserPlus,
      color: "text-accent"
    },
    {
      title: "Program Completion",
      value: "78%",
      change: "+5% this month",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Resource Library",
      value: "156",
      change: "+12 this week",
      icon: BookOpen,
      color: "text-warning"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage the Torc Mentorship Program
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <Settings className="w-4 h-4 mr-2" />
            Program Settings
          </Button>
        </div>
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
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New mentee joined Frontend Focus Group</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Phase 2 materials uploaded</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Group meeting completed</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-warning" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium">Mid-program survey due</p>
                    <p className="text-xs text-muted-foreground">3 groups pending</p>
                  </div>
                  <Badge variant="outline" className="border-warning text-warning">
                    2 days
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium">Phase 3 kick-off</p>
                    <p className="text-xs text-muted-foreground">All groups</p>
                  </div>
                  <Badge variant="outline" className="border-accent text-accent">
                    1 week
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium">Mentor feedback session</p>
                    <p className="text-xs text-muted-foreground">Individual meetings</p>
                  </div>
                  <Badge variant="outline" className="border-primary text-primary">
                    2 weeks
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="groups" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Mentor Groups</h2>
            <Button className="bg-gradient-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockGroups.map((group: Group) => (
              <Card key={group.id} className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <Badge 
                      variant="secondary"
                      className="bg-success/20 text-success border-success/30"
                    >
                      {group.status}
                    </Badge>
                  </div>
                  <CardDescription>
                    Mentor: {mockUsers.find(u => u.id === group.mentorId)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Current Phase:</span>
                    <Badge variant="outline" className="border-primary text-primary">
                      {group.currentPhase}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Mentees:</span>
                    <span className="font-medium">{group.menteeIds.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress:</span>
                    <span className="font-medium">
                      {group.completedSessions}/{group.totalSessions} sessions
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">User Management</h2>
            <Button className="bg-gradient-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              Invite User
            </Button>
          </div>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 gap-0 divide-y divide-border">
                {mockUsers.map((user: User) => (
                  <div key={user.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-10 h-10 rounded-full border-2 border-border"
                        />
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant="secondary"
                          className={
                            user.role === 'admin' ? 'bg-primary/20 text-primary border-primary/30' :
                            user.role === 'mentor' ? 'bg-accent/20 text-accent border-accent/30' :
                            'bg-secondary text-secondary-foreground'
                          }
                        >
                          {user.role}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={
                            user.isOnboardingComplete 
                              ? 'border-success text-success' 
                              : 'border-warning text-warning'
                          }
                        >
                          {user.isOnboardingComplete ? 'Complete' : 'Pending'}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Resource Library</h2>
            <Button className="bg-gradient-primary">
              <FileText className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockResources.map((resource: Resource) => (
              <Card key={resource.id} className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <Badge variant="outline" className="border-primary text-primary">
                      {resource.phase}
                    </Badge>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <Badge variant="secondary">{resource.type}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Read Time:</span>
                    <span className="font-medium">{resource.estimatedReadTime}m</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Program Analytics</h2>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Phase Completion */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Phase Completion Rates</CardTitle>
                <CardDescription>
                  Success rates across all program phases
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mockAnalytics.phaseCompletion.map((phase) => (
                  <div key={phase.phase} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{phase.phase}</span>
                      <span className="font-medium">{phase.successRate}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${phase.successRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Goal Achievement */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Goal Achievement</CardTitle>
                <CardDescription>
                  Completion rates by goal category
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mockAnalytics.goalAchievement.map((goal) => (
                  <div key={goal.category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="capitalize">{goal.category}</span>
                      <span className="font-medium">{goal.successRate}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-gradient-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${goal.successRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}