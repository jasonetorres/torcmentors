import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
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


export default function Analytics() {
  const { toast } = useToast();

  const handleFilter = () => {
    toast({
      title: "Filters",
      description: "Filter functionality coming soon",
    });
  };

  const handleRefresh = () => {
    toast({
      title: "Refreshed",
      description: "Analytics data has been refreshed",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your analytics report is being generated",
    });
  };
  const overviewStats = [
    { 
      title: "Program Completion Rate", 
      value: "0%", 
      change: "", 
      icon: Award, 
      color: "text-success" 
    },
    { 
      title: "Average Engagement Score", 
      value: "0", 
      change: "", 
      icon: TrendingUp, 
      color: "text-primary" 
    },
    { 
      title: "Goals Achieved", 
      value: "0", 
      change: "", 
      icon: Target, 
      color: "text-accent" 
    },
    { 
      title: "Mentor Satisfaction", 
      value: "0/5", 
      change: "", 
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
          <Button variant="outline" size="sm" onClick={handleFilter}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" className="bg-gradient-primary" onClick={handleExport}>
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
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">No Groups Data</p>
              <p className="text-muted-foreground">Group progress will appear here once mentoring groups are created</p>
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
            <CardContent className="p-12 text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">No Phase Data</p>
              <p className="text-muted-foreground">Phase completion analytics will appear here as groups progress</p>
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
            <CardContent className="p-12 text-center">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">No Engagement Data</p>
              <p className="text-muted-foreground">Mentee engagement metrics will appear here once activities begin</p>
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
            <CardContent className="p-12 text-center">
              <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">No Goal Data</p>
              <p className="text-muted-foreground">Goal achievement statistics will appear here as mentees set and complete goals</p>
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
            <CardContent className="p-12 text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">No Resource Usage Data</p>
              <p className="text-muted-foreground">Resource usage statistics will appear here as resources are accessed</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}