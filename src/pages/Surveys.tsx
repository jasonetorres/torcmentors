import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, MessageSquare, Users, Calendar, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Surveys() {
  const { toast } = useToast();
  const [surveys, setSurveys] = useState([
    {
      id: 1,
      title: 'Monthly Mentorship Feedback',
      description: 'Gather feedback on the mentorship experience and program effectiveness',
      status: 'active',
      responses: 42,
      totalParticipants: 52,
      deadline: '2024-01-31',
      type: 'feedback'
    },
    {
      id: 2,
      title: 'Career Goals Assessment',
      description: 'Understanding participant career aspirations and skill development needs',
      status: 'draft',
      responses: 0,
      totalParticipants: 52,
      deadline: '2024-02-15',
      type: 'assessment'
    },
    {
      id: 3,
      title: 'Program Satisfaction Survey',
      description: 'Overall satisfaction with the mentorship program structure and content',
      status: 'completed',
      responses: 48,
      totalParticipants: 50,
      deadline: '2024-01-15',
      type: 'satisfaction'
    }
  ]);

  const [newSurvey, setNewSurvey] = useState({
    title: '',
    description: '',
    type: '',
    deadline: ''
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateSurvey = () => {
    if (!newSurvey.title || !newSurvey.description || !newSurvey.type || !newSurvey.deadline) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const survey = {
      id: surveys.length + 1,
      title: newSurvey.title,
      description: newSurvey.description,
      status: 'draft',
      responses: 0,
      totalParticipants: 52,
      deadline: newSurvey.deadline,
      type: newSurvey.type
    };

    setSurveys([...surveys, survey]);
    setNewSurvey({ title: '', description: '', type: '', deadline: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "Survey Created",
      description: "Your survey has been successfully created",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary text-primary-foreground';
      case 'draft': return 'bg-secondary text-secondary-foreground';
      case 'completed': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Surveys</h1>
            <p className="text-muted-foreground">Manage surveys and collect feedback from participants</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-primary-foreground shadow-glow">
                <Plus className="w-4 h-4 mr-2" />
                Create Survey
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Survey</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new survey for participants.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Survey Title</Label>
                  <Input
                    id="title"
                    value={newSurvey.title}
                    onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
                    placeholder="Enter survey title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newSurvey.description}
                    onChange={(e) => setNewSurvey({ ...newSurvey, description: e.target.value })}
                    placeholder="Describe the purpose of this survey"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Survey Type</Label>
                  <Select value={newSurvey.type} onValueChange={(value) => setNewSurvey({ ...newSurvey, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select survey type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="assessment">Assessment</SelectItem>
                      <SelectItem value="satisfaction">Satisfaction</SelectItem>
                      <SelectItem value="evaluation">Evaluation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newSurvey.deadline}
                    onChange={(e) => setNewSurvey({ ...newSurvey, deadline: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateSurvey}>
                  Create Survey
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Survey Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Total Surveys</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">90</p>
                  <p className="text-sm text-muted-foreground">Total Responses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1</p>
                  <p className="text-sm text-muted-foreground">Active Surveys</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">87%</p>
                  <p className="text-sm text-muted-foreground">Avg Response Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Surveys List */}
        <div className="space-y-4">
          {surveys.map((survey) => (
            <Card key={survey.id} className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-foreground">{survey.title}</CardTitle>
                      <Badge className={getStatusColor(survey.status)}>
                        {survey.status}
                      </Badge>
                    </div>
                    <CardDescription className="max-w-2xl">
                      {survey.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      View Results
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <span>
                      Responses: <span className="font-medium text-foreground">{survey.responses}/{survey.totalParticipants}</span>
                    </span>
                    <span>
                      Deadline: <span className="font-medium text-foreground">{survey.deadline}</span>
                    </span>
                    <span>
                      Type: <span className="font-medium text-foreground capitalize">{survey.type}</span>
                    </span>
                  </div>
                  <div className="w-32 bg-secondary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(survey.responses / survey.totalParticipants) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}