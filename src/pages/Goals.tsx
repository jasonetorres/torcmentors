import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Target, 
  Plus,
  Calendar,
  CheckCircle,
  Clock,
  TrendingUp,
  Star,
  MoreVertical,
  Edit,
  Trash2,
  Flag,
  User
} from 'lucide-react';
import { mockGoals } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';

export default function Goals() {
  const { user } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState('active');

  const isMentor = user?.role === 'mentor';

  // Mock additional goals for mentees
  const allGoals = [
    ...mockGoals,
    {
      id: 'goal-2',
      userId: '3',
      title: 'Learn Backend Development',
      description: 'Master Node.js, Express, and database design principles',
      category: 'technical' as const,
      priority: 'medium' as const,
      status: 'pending' as const,
      targetDate: new Date('2025-08-01'),
      createdAt: new Date('2025-01-05'),
      progress: 0,
      milestones: [
        {
          id: 'milestone-4',
          title: 'Set up Node.js environment',
          completed: false
        },
        {
          id: 'milestone-5',
          title: 'Build first REST API',
          completed: false
        }
      ]
    },
    {
      id: 'goal-3',
      userId: '4',
      title: 'Improve Code Review Skills',
      description: 'Learn to give and receive constructive code feedback',
      category: 'personal' as const,
      priority: 'high' as const,
      status: 'in-progress' as const,
      targetDate: new Date('2025-04-01'),
      createdAt: new Date('2025-01-07'),
      progress: 60,
      milestones: [
        {
          id: 'milestone-6',
          title: 'Review 10 pull requests',
          completed: true,
          completedAt: new Date('2025-01-12')
        },
        {
          id: 'milestone-7',
          title: 'Practice giving feedback',
          completed: false
        }
      ],
      mentorNotes: 'Great improvement in feedback quality. Focus on being more specific.'
    }
  ];

  const stats = [
    { 
      title: isMentor ? "Total Group Goals" : "My Goals", 
      value: isMentor ? "24" : "3", 
      change: isMentor ? "across all mentees" : "+1 this month", 
      icon: Target, 
      color: "text-primary" 
    },
    { 
      title: isMentor ? "Completed This Month" : "Completed", 
      value: isMentor ? "8" : "1", 
      change: isMentor ? "+3 from last month" : "this quarter", 
      icon: CheckCircle, 
      color: "text-success" 
    },
    { 
      title: isMentor ? "Needs Attention" : "In Progress", 
      value: isMentor ? "3" : "2", 
      change: isMentor ? "require support" : "on track", 
      icon: Clock, 
      color: "text-warning" 
    },
    { 
      title: isMentor ? "Avg Progress" : "Overall Progress", 
      value: isMentor ? "72%" : "85%", 
      change: isMentor ? "across group" : "this quarter", 
      icon: TrendingUp, 
      color: "text-accent" 
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'low': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/20 text-success border-success/30';
      case 'in-progress': return 'bg-primary/20 text-primary border-primary/30';
      case 'pending': return 'bg-warning/20 text-warning border-warning/30';
      case 'overdue': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-accent/20 text-accent border-accent/30';
      case 'career': return 'bg-primary/20 text-primary border-primary/30';
      case 'personal': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isMentor ? 'Group Goals Management' : 'My Development Goals'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isMentor 
              ? 'Track and support your mentees\' goal progress'
              : 'Set, track, and achieve your career development objectives'
            }
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              {isMentor ? 'Add Group Goal' : 'Create Goal'}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set a SMART goal to track your progress and achievements
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Goal Title</Label>
                <Input id="title" placeholder="e.g., Master React Hooks" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe what you want to achieve..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="career">Career</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="target-date">Target Date</Label>
                <Input id="target-date" type="date" />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-primary">Create Goal</Button>
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

      {/* Goals Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-secondary">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="all">All Goals</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid gap-6">
            {allGoals.filter(goal => goal.status === 'in-progress').map((goal) => (
              <Card key={goal.id} className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-xl">{goal.title}</CardTitle>
                        {isMentor && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <User className="w-4 h-4" />
                            <span>Alex Rivera</span>
                          </div>
                        )}
                      </div>
                      <CardDescription className="text-base">
                        {goal.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className={getCategoryColor(goal.category)}>
                        {goal.category}
                      </Badge>
                      <Badge variant="secondary" className={getPriorityColor(goal.priority)}>
                        <Flag className="w-3 h-3 mr-1" />
                        {goal.priority}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{goal.progress}%</div>
                        <div className="text-xs text-muted-foreground">Complete</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{goal.milestones.filter(m => m.completed).length}/{goal.milestones.length} milestones</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-3">
                          <div 
                            className="bg-gradient-primary h-3 rounded-full transition-all duration-300"
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    {goal.targetDate && (
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">
                          {goal.targetDate.toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Target Date</div>
                      </div>
                    )}
                  </div>

                  {/* Milestones */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Milestones
                    </h4>
                    <div className="space-y-2">
                      {goal.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            milestone.completed 
                              ? 'bg-success border-success' 
                              : 'border-border'
                          }`}>
                            {milestone.completed && (
                              <CheckCircle className="w-3 h-3 text-success-foreground" />
                            )}
                          </div>
                          <span className={`flex-1 ${
                            milestone.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                          }`}>
                            {milestone.title}
                          </span>
                          {milestone.completedAt && (
                            <span className="text-xs text-muted-foreground">
                              {milestone.completedAt.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mentor Notes */}
                  {goal.mentorNotes && (
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                      <h5 className="font-medium text-foreground mb-1 flex items-center gap-2">
                        <Star className="w-4 h-4 text-primary" />
                        Mentor Notes
                      </h5>
                      <p className="text-sm text-muted-foreground">{goal.mentorNotes}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Goal
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Add Milestone
                    </Button>
                    {isMentor && (
                      <Button variant="outline" size="sm">
                        <Star className="w-4 h-4 mr-2" />
                        Add Note
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid gap-6">
            {allGoals.filter(goal => goal.status === 'completed').map((goal) => (
              <Card key={goal.id} className="bg-gradient-card border-border shadow-card opacity-75">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-success" />
                        {goal.title}
                      </CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className={getStatusColor(goal.status)}>
                      Completed
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Completed all {goal.milestones.length} milestones
                    </span>
                    <span className="font-medium text-success">100% Complete</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid gap-6">
            {allGoals.filter(goal => goal.status === 'pending').map((goal) => (
              <Card key={goal.id} className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{goal.title}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                    <Badge variant="secondary" className={getStatusColor(goal.status)}>
                      Pending
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-gradient-primary">
                      Start Goal
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6">
            {allGoals.map((goal) => (
              <Card key={goal.id} className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{goal.title}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className={getStatusColor(goal.status)}>
                        {goal.status}
                      </Badge>
                      <Badge variant="secondary" className={getCategoryColor(goal.category)}>
                        {goal.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Progress: {goal.progress}% • Created {goal.createdAt.toLocaleDateString()}
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}