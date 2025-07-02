import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Users,
  Target,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Award,
  Clock,
  MessageSquare
} from 'lucide-react';
import { mockAnalytics } from '@/data/mockData';

export default function Analytics() {
  const overviewStats = [
    { 
      title: "Program Completion Rate", 
      value: "95%", 
      change: "+3% this quarter", 
      icon: Award, 
      color: "text-success" 
    },
    { 
      title: "Average Engagement Score", 
      value: "87", 
      change: "+5 points this month", 
      icon: TrendingUp, 
      color: "text-primary" 
    },
    { 
      title: "Goals Achieved", 
      value: "142", 
      change: "+23 this month", 
      icon: Target, 
      color: "text-accent" 
    },
    { 
      title: "Mentor Satisfaction", 
      value: "4.8/5", 
      change: "+0.2 this quarter", 
      icon: MessageSquare, 
      color: "text-warning" 
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Program Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Track progress, engagement, and success across the mentorship program
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => (
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

      {/* Analytics Tabs */}
      <Tabs defaultValue="groups" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-secondary">
          <TabsTrigger value="groups">Group Progress</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="goals">Goal Achievement</TabsTrigger>
          <TabsTrigger value="resources">Resource Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Group Progress Overview
              </CardTitle>
              <CardDescription>
                Track completion rates and progress across all mentor groups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockAnalytics.groupProgress.map((group) => (
                <div key={group.groupId} className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-foreground">{group.groupName}</h4>
                      <p className="text-sm text-muted-foreground">Mentor: {group.mentor}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-primary text-primary">
                        {group.currentPhase}
                      </Badge>
                      <span className="text-lg font-bold text-foreground">
                        {group.completionPercentage}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Active Mentees</p>
                      <p className="font-medium text-foreground">{group.activeMentees}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Upcoming Deadlines</p>
                      <p className="font-medium text-foreground">{group.upcomingDeadlines}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Activity</p>
                      <p className="font-medium text-foreground">
                        {group.lastActivity.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="w-full bg-secondary rounded-full h-3">
                    <div 
                      className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
                      style={{ width: `${group.completionPercentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Phase Completion Rates */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-accent" />
                Phase Completion Rates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.phaseCompletion.map((phase) => (
                  <div key={phase.phase} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-foreground capitalize">
                          {phase.phase.replace('phase', 'Phase ')}
                        </span>
                        <p className="text-sm text-muted-foreground">
                          {phase.completedGroups}/{phase.totalGroups} groups completed
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-foreground">
                          {phase.successRate}%
                        </span>
                        <p className="text-sm text-muted-foreground">
                          Avg: {phase.averageCompletionTime} days
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-gradient-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${phase.successRate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Mentee Engagement Metrics
              </CardTitle>
              <CardDescription>
                Track individual mentee participation and activity levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.menteeEngagement.map((mentee) => (
                  <div key={mentee.userId} className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{mentee.userName}</h4>
                        <p className="text-sm text-muted-foreground">Group: {mentee.groupId}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Engagement Score</span>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                          mentee.engagementScore >= 80 
                            ? 'bg-success/20 text-success' 
                            : mentee.engagementScore >= 60 
                            ? 'bg-warning/20 text-warning' 
                            : 'bg-destructive/20 text-destructive'
                        }`}>
                          {mentee.engagementScore}/100
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Goals Completed</p>
                        <p className="font-medium text-foreground">{mentee.goalsCompleted}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Meetings Attended</p>
                        <p className="font-medium text-foreground">{mentee.meetingsAttended}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Tasks Completed</p>
                        <p className="font-medium text-foreground">{mentee.tasksCompleted}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-success" />
                Goal Achievement Analysis
              </CardTitle>
              <CardDescription>
                Success rates and completion times by goal category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockAnalytics.goalAchievement.map((category) => (
                  <div key={category.category} className="p-4 rounded-lg bg-secondary/50">
                    <h4 className="font-semibold text-foreground capitalize mb-3">
                      {category.category} Goals
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Total Goals</span>
                        <span className="font-medium text-foreground">{category.totalGoals}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Completed</span>
                        <span className="font-medium text-foreground">{category.completedGoals}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Success Rate</span>
                        <span className="font-medium text-success">{category.successRate}%</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Avg Completion</span>
                        <span className="font-medium text-foreground">{category.avgCompletionTime} days</span>
                      </div>
                      
                      <div className="w-full bg-secondary rounded-full h-2 mt-3">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full"
                          style={{ width: `${category.successRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-warning" />
                Resource Usage Statistics
              </CardTitle>
              <CardDescription>
                Track which resources are most popular and effective
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAnalytics.resourceUsage.map((resource) => (
                  <div key={resource.resourceId} className="p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground">{resource.resourceTitle}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          {resource.avgRating}/5
                        </span>
                        <div className="flex">
                          {[1,2,3,4,5].map((star) => (
                            <Clock 
                              key={star} 
                              className={`w-3 h-3 ${
                                star <= resource.avgRating ? 'text-warning' : 'text-muted-foreground'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Views</p>
                        <p className="font-medium text-foreground">{resource.viewCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Downloads</p>
                        <p className="font-medium text-foreground">{resource.downloadCount}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Accessed</p>
                        <p className="font-medium text-foreground">
                          {resource.lastAccessed.toLocaleDateString()}
                        </p>
                      </div>
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