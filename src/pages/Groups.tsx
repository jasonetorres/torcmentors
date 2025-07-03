import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
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
  UserCog,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import MenteeManagement from '@/components/admin/MenteeManagement';

interface Group {
  id: string;
  name: string;
  description: string;
  phase: string;
  status: 'active' | 'forming' | 'completed';
  mentorId: string;
  mentorName: string;
  menteeCount: number;
  maxSize: number;
  schedule: string;
  createdAt: Date;
}

export default function Groups() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 'group-1',
      name: 'Frontend Focus Group',
      description: 'Intensive frontend development mentorship focusing on React, TypeScript, and modern web development practices',
      phase: 'phase1',
      status: 'active',
      mentorId: 'mentor-1',
      mentorName: 'Sarah Chen',
      menteeCount: 3,
      maxSize: 4,
      schedule: 'Wednesdays 6:00 PM EST',
      createdAt: new Date('2025-01-01')
    },
    {
      id: 'group-2', 
      name: 'Backend Builders',
      description: 'Server-side development mentorship covering Node.js, databases, and API design',
      phase: 'phase2',
      status: 'active',
      mentorId: 'mentor-2',
      mentorName: 'Mike Rodriguez',
      menteeCount: 4,
      maxSize: 5,
      schedule: 'Thursdays 7:00 PM EST',
      createdAt: new Date('2025-01-05')
    },
    {
      id: 'group-3',
      name: 'Career Transition Support',
      description: 'Support group for professionals transitioning into tech careers',
      phase: 'phase1',
      status: 'forming',
      mentorId: 'mentor-3',
      mentorName: 'Jessica Park',
      menteeCount: 2,
      maxSize: 4,
      schedule: 'Fridays 5:30 PM EST',
      createdAt: new Date('2025-01-10')
    }
  ]);

  const [newGroup, setNewGroup] = useState({
    name: '',
    description: '',
    phase: 'phase1',
    mentorId: '',
    maxSize: '4',
    schedule: ''
  });

  const handleCreateGroup = () => {
    if (!newGroup.name.trim() || !newGroup.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const group: Group = {
      id: `group-${Date.now()}`,
      name: newGroup.name,
      description: newGroup.description,
      phase: newGroup.phase,
      status: 'forming',
      mentorId: newGroup.mentorId || 'unassigned',
      mentorName: newGroup.mentorId ? 'Assigned Mentor' : 'Unassigned',
      menteeCount: 0,
      maxSize: parseInt(newGroup.maxSize),
      schedule: newGroup.schedule,
      createdAt: new Date()
    };

    setGroups([...groups, group]);
    setNewGroup({
      name: '',
      description: '',
      phase: 'phase1',
      mentorId: '',
      maxSize: '4',
      schedule: ''
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Group Created",
      description: "New mentorship group has been created successfully.",
    });
  };

  const handleDeleteGroup = (groupId: string) => {
    setGroups(groups.filter(group => group.id !== groupId));
    toast({
      title: "Group Deleted",
      description: "Group has been removed successfully.",
    });
  };

  const stats = [
    { title: "Total Groups", value: groups.length.toString(), change: "+2 this month", icon: Users, color: "text-primary" },
    { title: "Active Mentors", value: groups.filter(g => g.status === 'active').length.toString(), change: "100% engagement", icon: Star, color: "text-success" },
    { title: "Total Mentees", value: groups.reduce((sum, g) => sum + g.menteeCount, 0).toString(), change: "+8 this month", icon: UserPlus, color: "text-accent" },
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

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.mentorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Group Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage mentorship groups and track their progress
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              Create New Group
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
              <DialogDescription>
                Set up a new mentorship group with mentor and mentees
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="groupName">Group Name</Label>
                <Input 
                  id="groupName" 
                  placeholder="e.g., Frontend Focus Group"
                  value={newGroup.name}
                  onChange={(e) => setNewGroup({...newGroup, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the group's focus and goals..."
                  value={newGroup.description}
                  onChange={(e) => setNewGroup({...newGroup, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phase">Phase</Label>
                  <Select value={newGroup.phase} onValueChange={(value) => setNewGroup({...newGroup, phase: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phase1">Phase 1</SelectItem>
                      <SelectItem value="phase2">Phase 2</SelectItem>
                      <SelectItem value="phase3">Phase 3</SelectItem>
                      <SelectItem value="phase4">Phase 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="maxSize">Max Size</Label>
                  <Select value={newGroup.maxSize} onValueChange={(value) => setNewGroup({...newGroup, maxSize: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 people</SelectItem>
                      <SelectItem value="4">4 people</SelectItem>
                      <SelectItem value="5">5 people</SelectItem>
                      <SelectItem value="6">6 people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="schedule">Meeting Schedule</Label>
                <Input 
                  id="schedule" 
                  placeholder="e.g., Wednesdays 6:00 PM EST"
                  value={newGroup.schedule}
                  onChange={(e) => setNewGroup({...newGroup, schedule: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-primary" onClick={handleCreateGroup}>
                  Create Group
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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

      {/* Search */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search groups by name or mentor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Groups List */}
      <div className="grid gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{group.name}</CardTitle>
                  <CardDescription>Mentor: {group.mentorName}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={getStatusColor(group.status)}>
                    {group.status}
                  </Badge>
                  <Badge variant="outline" className={getPhaseColor(group.phase)}>
                    {group.phase}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{group.description}</p>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Mentees</p>
                  <p className="font-medium text-foreground">{group.menteeCount}/{group.maxSize}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Schedule</p>
                  <p className="font-medium text-foreground">{group.schedule}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created</p>
                  <p className="font-medium text-foreground">{group.createdAt.toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteGroup(group.id)}
                  className="text-destructive hover:bg-destructive/20"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for additional management */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="active">Active Management</TabsTrigger>
          <TabsTrigger value="mentees">Mentee Assignment</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Group Management</h3>
            <p className="text-muted-foreground">Use the controls above to manage your groups</p>
          </div>
        </TabsContent>

        <TabsContent value="mentees">
          <MenteeManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}