import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckSquare, 
  Clock, 
  Calendar,
  User,
  Flag,
  Plus,
  Check,
  X
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'in-progress';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignee: string;
}

export default function Tasks() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete Goal Setting Worksheet',
      description: 'Use the provided SMART Goal Guide to define 2-3 development goals',
      status: 'completed',
      priority: 'high',
      dueDate: 'Jan 10, 2025',
      assignee: 'Alex Rivera'
    },
    {
      id: '2',
      title: 'Review React Best Practices',
      description: 'Study the React documentation and complete the exercises',
      status: 'in-progress',
      priority: 'medium',
      dueDate: 'Jan 20, 2025',
      assignee: 'Alex Rivera'
    },
    {
      id: '3',
      title: 'Build Portfolio Project',
      description: 'Create a full-stack application showcasing your skills',
      status: 'pending',
      priority: 'high',
      dueDate: 'Feb 15, 2025',
      assignee: 'Alex Rivera'
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    dueDate: '',
    assignee: 'Alex Rivera'
  });

  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a task title.",
        variant: "destructive"
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'pending',
      priority: newTask.priority,
      dueDate: newTask.dueDate || 'No due date',
      assignee: newTask.assignee
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      assignee: 'Alex Rivera'
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Task Created",
      description: "New task has been added successfully.",
    });
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' as Task['status'] }
        : task
    ));

    toast({
      title: "Task Updated",
      description: "Task status has been updated.",
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: "Task has been removed.",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-destructive text-destructive';
      case 'medium': return 'border-warning text-warning';
      case 'low': return 'border-success text-success';
      default: return 'border-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/20 text-success border-success/30';
      case 'in-progress': return 'bg-primary/20 text-primary border-primary/30';
      case 'pending': return 'bg-warning/20 text-warning border-warning/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks & Activities</h1>
          <p className="text-muted-foreground mt-2">
            Track your assignments and mentorship activities
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>
                Add a new task or assignment to track progress
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Complete React Tutorial"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe what needs to be done..."
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newTask.priority} onValueChange={(value: 'high' | 'medium' | 'low') => setNewTask({...newTask, priority: value})}>
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
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input 
                    id="dueDate" 
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-primary" onClick={handleCreateTask}>
                  Create Task
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-primary" />
                {task.title}
              </CardTitle>
              <CardDescription>
                {task.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className={getStatusColor(task.status)}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
                </Badge>
                <Badge variant="outline" className={getPriorityColor(task.priority)}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  Due: {task.dueDate}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  {task.assignee}
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCompleteTask(task.id)}
                  className={task.status === 'completed' ? 'bg-success/20 text-success' : ''}
                >
                  <Check className="w-4 h-4 mr-2" />
                  {task.status === 'completed' ? 'Completed' : 'Mark Complete'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-destructive hover:bg-destructive/20"
                >
                  <X className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
