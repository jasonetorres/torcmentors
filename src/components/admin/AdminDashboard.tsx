import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
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

import { Group, User, Resource } from '@/types';
import { useToast } from '@/hooks/use-toast';

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [isProgramSettingsOpen, setIsProgramSettingsOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'guide',
    phase: 'phase1',
    estimatedReadTime: 10
  });
  const [programSettings, setProgramSettings] = useState({
    programName: 'Torc Mentorship Program',
    programDuration: '12',
    autoAssignGroups: true,
    maxGroupSize: '6',
    emailNotifications: true,
    allowMenteeGroupSwitch: false
  });
  const { toast } = useToast();

  const handleAddResource = () => {
    if (!newResource.title.trim() || !newResource.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to database
    toast({
      title: "Resource Added",
      description: `${newResource.title} has been added to the resource library.`,
    });

    // Reset form
    setNewResource({
      title: '',
      description: '',
      type: 'guide',
      phase: 'phase1',
      estimatedReadTime: 10
    });
    setIsAddResourceOpen(false);
  };

  const handleSaveProgramSettings = () => {
    // Here you would typically save to database
    toast({
      title: "Settings Saved",
      description: "Program settings have been updated successfully.",
    });
    setIsProgramSettingsOpen(false);
  };

  const stats = [
    {
      title: "Total Mentors",
      value: "0",
      change: "",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Mentees", 
      value: "0",
      change: "",
      icon: UserPlus,
      color: "text-accent"
    },
    {
      title: "Program Completion",
      value: "0%",
      change: "",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Resource Library",
      value: "0",
      change: "",
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
          <Dialog open={isProgramSettingsOpen} onOpenChange={setIsProgramSettingsOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-primary">
                <Settings className="w-4 h-4 mr-2" />
                Program Settings
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Program Settings</DialogTitle>
                <DialogDescription>
                  Configure your mentorship program settings
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="programName">Program Name</Label>
                  <Input 
                    id="programName" 
                    value={programSettings.programName}
                    onChange={(e) => setProgramSettings({...programSettings, programName: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="programDuration">Duration (weeks)</Label>
                    <Input 
                      id="programDuration" 
                      type="number"
                      value={programSettings.programDuration}
                      onChange={(e) => setProgramSettings({...programSettings, programDuration: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxGroupSize">Max Group Size</Label>
                    <Input 
                      id="maxGroupSize" 
                      type="number"
                      value={programSettings.maxGroupSize}
                      onChange={(e) => setProgramSettings({...programSettings, maxGroupSize: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="autoAssign">Auto-assign groups</Label>
                    <Switch 
                      id="autoAssign"
                      checked={programSettings.autoAssignGroups}
                      onCheckedChange={(checked) => setProgramSettings({...programSettings, autoAssignGroups: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="emailNotifs">Email notifications</Label>
                    <Switch 
                      id="emailNotifs"
                      checked={programSettings.emailNotifications}
                      onCheckedChange={(checked) => setProgramSettings({...programSettings, emailNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="groupSwitch">Allow mentee group switching</Label>
                    <Switch 
                      id="groupSwitch"
                      checked={programSettings.allowMenteeGroupSwitch}
                      onCheckedChange={(checked) => setProgramSettings({...programSettings, allowMenteeGroupSwitch: checked})}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-primary" onClick={handleSaveProgramSettings}>
                    Save Settings
                  </Button>
                  <Button variant="outline" onClick={() => setIsProgramSettingsOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No recent activity</p>
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
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming deadlines</p>
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
          
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No Groups Yet</p>
            <p className="text-muted-foreground mb-4">Create your first mentor group to get started</p>
            <Button className="bg-gradient-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              Create First Group
            </Button>
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
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium text-foreground mb-2">No Users Yet</p>
              <p className="text-muted-foreground mb-4">Start by inviting mentors and mentees to the program</p>
              <Button className="bg-gradient-primary">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite First User
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Resource Library</h2>
            <Dialog open={isAddResourceOpen} onOpenChange={setIsAddResourceOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-primary">
                  <FileText className="w-4 h-4 mr-2" />
                  Add Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Resource</DialogTitle>
                  <DialogDescription>
                    Add a new resource to the program library
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="resourceTitle">Title</Label>
                    <Input 
                      id="resourceTitle" 
                      placeholder="Resource title"
                      value={newResource.title}
                      onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="resourceDescription">Description</Label>
                    <Textarea 
                      id="resourceDescription" 
                      placeholder="Brief description of the resource"
                      value={newResource.description}
                      onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="resourceType">Type</Label>
                      <Select value={newResource.type} onValueChange={(value) => setNewResource({...newResource, type: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="guide">Guide</SelectItem>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="case-study">Case Study</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="article">Article</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="resourcePhase">Phase</Label>
                      <Select value={newResource.phase} onValueChange={(value) => setNewResource({...newResource, phase: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="phase1">Phase 1</SelectItem>
                          <SelectItem value="phase2">Phase 2</SelectItem>
                          <SelectItem value="phase3">Phase 3</SelectItem>
                          <SelectItem value="phase4">Phase 4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="readTime">Estimated Read Time (minutes)</Label>
                    <Input 
                      id="readTime" 
                      type="number"
                      placeholder="10"
                      value={newResource.estimatedReadTime}
                      onChange={(e) => setNewResource({...newResource, estimatedReadTime: parseInt(e.target.value) || 10})}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-primary" onClick={handleAddResource}>
                      Add Resource
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddResourceOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No Resources Yet</p>
            <p className="text-muted-foreground mb-4">Add your first resource to the library</p>
            <Button className="bg-gradient-primary" onClick={() => setIsAddResourceOpen(true)}>
              <FileText className="w-4 h-4 mr-2" />
              Add First Resource
            </Button>
          </div>
          
          {/* Future: Replace with real resources */}
          <div className="hidden grid-cols-1 lg:grid-cols-2 gap-6">
            {[].map((resource: Resource) => (
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
              <div className="text-center py-8">
                <p className="text-muted-foreground">No analytics data available yet</p>
              </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}