import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, MessageSquare, Users, Calendar, TrendingUp, Trash2, BarChart3, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useSupabaseAuth';
import { useRolePreview } from '@/hooks/useRolePreview';

export default function Surveys() {
  const { toast } = useToast();
  const { profile } = useAuth();
  const { getEffectiveRole } = useRolePreview();
  const isAdmin = getEffectiveRole(profile?.role) === 'admin';
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
  const [editingSurvey, setEditingSurvey] = useState<any>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [takingSurvey, setTakingSurvey] = useState<any>(null);
  const [isTakingSurveyOpen, setIsTakingSurveyOpen] = useState(false);
  const [surveyResponses, setSurveyResponses] = useState<{[key: string]: string}>({});

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

  const handleEditSurvey = (survey: any) => {
    setEditingSurvey(survey);
    setNewSurvey({
      title: survey.title,
      description: survey.description,
      type: survey.type,
      deadline: survey.deadline
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateSurvey = () => {
    if (!newSurvey.title || !newSurvey.description || !newSurvey.type || !newSurvey.deadline) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const updatedSurveys = surveys.map(survey => 
      survey.id === editingSurvey.id 
        ? { ...survey, ...newSurvey }
        : survey
    );

    setSurveys(updatedSurveys);
    setNewSurvey({ title: '', description: '', type: '', deadline: '' });
    setEditingSurvey(null);
    setIsEditDialogOpen(false);
    
    toast({
      title: "Survey Updated",
      description: "Your survey has been successfully updated",
    });
  };

  const handleDeleteSurvey = (surveyId: number) => {
    const updatedSurveys = surveys.filter(survey => survey.id !== surveyId);
    setSurveys(updatedSurveys);
    
    toast({
      title: "Survey Deleted",
      description: "The survey has been successfully deleted",
    });
  };

  const handleViewResults = (survey: any) => {
    toast({
      title: "Survey Results",
      description: `Viewing results for "${survey.title}" - ${survey.responses}/${survey.totalParticipants} responses`,
    });
  };
  
  const handleTakeSurvey = (survey: any) => {
    setTakingSurvey(survey);
    setSurveyResponses({});
    setIsTakingSurveyOpen(true);
  };

  const handleSubmitSurvey = () => {
    if (Object.keys(surveyResponses).length === 0) {
      toast({
        title: "Error",
        description: "Please answer at least one question",
        variant: "destructive"
      });
      return;
    }

    // Update survey response count
    const updatedSurveys = surveys.map(survey => 
      survey.id === takingSurvey.id 
        ? { ...survey, responses: survey.responses + 1 }
        : survey
    );
    setSurveys(updatedSurveys);
    
    setIsTakingSurveyOpen(false);
    setTakingSurvey(null);
    setSurveyResponses({});
    
    toast({
      title: "Survey Submitted",
      description: "Thank you for your response!",
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
            <p className="text-muted-foreground">
              {isAdmin ? 'Manage surveys and collect feedback from participants' : 'View and respond to available surveys'}
            </p>
          </div>
          {isAdmin && (
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
          )}
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
                    {isAdmin ? (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewResults(survey)}
                        >
                          <BarChart3 className="w-4 h-4 mr-1" />
                          View Results
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditSurvey(survey)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTakeSurvey(survey)}
                      >
                        Take Survey
                      </Button>
                    )}
                    {isAdmin && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Survey</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{survey.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteSurvey(survey.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
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

        {/* Edit Survey Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Survey</DialogTitle>
              <DialogDescription>
                Update the details for this survey.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Survey Title</Label>
                <Input
                  id="edit-title"
                  value={newSurvey.title}
                  onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
                  placeholder="Enter survey title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={newSurvey.description}
                  onChange={(e) => setNewSurvey({ ...newSurvey, description: e.target.value })}
                  placeholder="Describe the purpose of this survey"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-type">Survey Type</Label>
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
                <Label htmlFor="edit-deadline">Deadline</Label>
                <Input
                  id="edit-deadline"
                  type="date"
                  value={newSurvey.deadline}
                  onChange={(e) => setNewSurvey({ ...newSurvey, deadline: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateSurvey}>
                Update Survey
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Take Survey Dialog */}
        <Dialog open={isTakingSurveyOpen} onOpenChange={setIsTakingSurveyOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Take Survey: {takingSurvey?.title}</DialogTitle>
              <DialogDescription>
                {takingSurvey?.description}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* Sample survey questions based on survey type */}
              {takingSurvey?.type === 'feedback' && (
                <>
                  <div className="space-y-2">
                    <Label>How would you rate your overall experience with the mentorship program?</Label>
                    <Select onValueChange={(value) => setSurveyResponses({...surveyResponses, q1: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="average">Average</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>What aspects of the program could be improved?</Label>
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={surveyResponses.q2 || ''}
                      onChange={(e) => setSurveyResponses({...surveyResponses, q2: e.target.value})}
                      rows={3}
                    />
                  </div>
                </>
              )}
              
              {takingSurvey?.type === 'assessment' && (
                <>
                  <div className="space-y-2">
                    <Label>What are your primary career goals?</Label>
                    <Textarea
                      placeholder="Describe your career aspirations..."
                      value={surveyResponses.q1 || ''}
                      onChange={(e) => setSurveyResponses({...surveyResponses, q1: e.target.value})}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Which skills would you like to develop most?</Label>
                    <Select onValueChange={(value) => setSurveyResponses({...surveyResponses, q2: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select primary skill focus" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Skills</SelectItem>
                        <SelectItem value="leadership">Leadership</SelectItem>
                        <SelectItem value="communication">Communication</SelectItem>
                        <SelectItem value="project-management">Project Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              {takingSurvey?.type === 'satisfaction' && (
                <>
                  <div className="space-y-2">
                    <Label>How satisfied are you with your mentor?</Label>
                    <Select onValueChange={(value) => setSurveyResponses({...surveyResponses, q1: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select satisfaction level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-satisfied">Very Satisfied</SelectItem>
                        <SelectItem value="satisfied">Satisfied</SelectItem>
                        <SelectItem value="neutral">Neutral</SelectItem>
                        <SelectItem value="dissatisfied">Dissatisfied</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Would you recommend this program to others?</Label>
                    <Select onValueChange={(value) => setSurveyResponses({...surveyResponses, q2: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recommendation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="definitely">Definitely</SelectItem>
                        <SelectItem value="probably">Probably</SelectItem>
                        <SelectItem value="maybe">Maybe</SelectItem>
                        <SelectItem value="probably-not">Probably Not</SelectItem>
                        <SelectItem value="definitely-not">Definitely Not</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              
              {/* Generic questions for other survey types */}
              {!['feedback', 'assessment', 'satisfaction'].includes(takingSurvey?.type) && (
                <div className="space-y-2">
                  <Label>Please share your thoughts about this topic:</Label>
                  <Textarea
                    placeholder="Your response..."
                    value={surveyResponses.q1 || ''}
                    onChange={(e) => setSurveyResponses({...surveyResponses, q1: e.target.value})}
                    rows={4}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsTakingSurveyOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitSurvey}>
                Submit Response
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}