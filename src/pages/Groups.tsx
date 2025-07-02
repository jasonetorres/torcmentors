import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  UserPlus, 
  Search,
  Calendar,
  MessageSquare,
  TrendingUp,
  Clock,
  Star,
  Settings,
  MoreVertical,
  UserCog
} from 'lucide-react';
import MenteeManagement from '@/components/admin/MenteeManagement';
import { mockGroups, mockUsers } from '@/data/mockData';

export default function Groups() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock additional groups data
  const allGroups = [
    ...mockGroups,
    {
      id: 'group-2',
      name: 'Backend Masters',
      mentorId: '10',
      menteeIds: ['11', '12', '13', '14'],
      currentPhase: 'phase2' as const,
      status: 'active' as const,
      createdAt: new Date('2025-01-05'),
      discordChannel: '#backend-masters',
      githubRepo: 'torc-mentorship/backend-masters',
      meetingSchedule: 'Fridays 7PM EST',
      nextMeeting: new Date('2025-01-17T19:00:00'),
      completedSessions: 3,
      totalSessions: 12
    },
    {
      id: 'group-3',
      name: 'Career Transitions',
      mentorId: '15',
      menteeIds: ['16', '17'],
      currentPhase: 'phase1' as const,
      status: 'active' as const,
      createdAt: new Date('2025-01-08'),
      discordChannel: '#career-transitions',
      githubRepo: 'torc-mentorship/career-transitions',
      meetingSchedule: 'Thursdays 6:30PM EST',
      nextMeeting: new Date('2025-01-16T18:30:00'),
      completedSessions: 1,
      totalSessions: 12
    }
  ];

  const stats = [
    { title: "Total Groups", value: "10", change: "+2 this month", icon: Users, color: "text-primary" },
    { title: "Active Mentors", value: "10", change: "100% engagement", icon: Star, color: "text-success" },
    { title: "Total Mentees", value: "42", change: "+8 this month", icon: UserPlus, color: "text-accent" },
    { title: "Completion Rate", value: "95%", change: "+3% this quarter", icon: TrendingUp, color: "text-warning" }
  ];

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'phase1': return 'bg-primary/20 text-primary border-primary/30';
      case 'phase2': return 'bg-accent/20 text-accent border-accent/30';
      case 'phase3': return 'bg-warning/20 text-warning border-warning/30';
      case 'phase4': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-success/20 text-success border-success/30';
      case 'forming': return 'bg-warning/20 text-warning border-warning/30';
      case 'completed': return 'bg-muted text-muted-foreground border-muted-foreground/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mentor Groups</h1>
          <p className="text-muted-foreground mt-2">
            Manage all mentorship groups and track their progress
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <UserPlus className="w-4 h-4 mr-2" />
          Create New Group
        </Button>
      </div>

      {/* Stats */}
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

      {/* Search and Filters */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search groups by name, mentor, or technology focus..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Groups Management */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-secondary">
          <TabsTrigger value="active">Active Groups</TabsTrigger>
          <TabsTrigger value="forming">Forming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="manage">Manage Mentees</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {allGroups.map((group) => (
              <Card key={group.id} className="bg-gradient-card border-border shadow-card hover:shadow-lg transition-shadow mb-6 p-1 bg-gradient-to-br from-background to-secondary/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{group.name}</CardTitle>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    Mentor: {mockUsers.find(u => u.id === group.mentorId)?.name || 'Unknown'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className={getStatusColor(group.status)}>
                      {group.status}
                    </Badge>
                    <Badge variant="outline" className={getPhaseColor(group.currentPhase)}>
                      {group.currentPhase}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Mentees</p>
                      <p className="font-medium text-foreground">{group.menteeIds.length}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Progress</p>
                      <p className="font-medium text-foreground">
                        {group.completedSessions}/{group.totalSessions}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completion</span>
                      <span className="font-medium">
                        {Math.round((group.completedSessions / group.totalSessions) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(group.completedSessions / group.totalSessions) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{group.meetingSchedule}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Next: {group.nextMeeting?.toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Group Chat Preview */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">Latest Activity</span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
                        Open Chat
                      </Button>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-primary rounded-full"></div>
                        <span className="text-xs font-medium">{mockUsers.find(u => u.id === group.mentorId)?.name}</span>
                        <span className="text-xs text-muted-foreground">2 min ago</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        "Don't forget our meeting tomorrow at {group.meetingSchedule}"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forming" className="space-y-6">
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Groups Forming</h3>
            <p className="text-muted-foreground mb-6">
              All groups have been successfully launched and are currently active.
            </p>
            <Button className="bg-gradient-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              Create New Group
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="text-center py-12">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Completed Groups Yet</h3>
            <p className="text-muted-foreground">
              Groups that complete the full 12-week program will appear here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="manage" className="space-y-6">
          <MenteeManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}