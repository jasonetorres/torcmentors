import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  Download, 
  CheckSquare, 
  MessageSquare,
  Users,
  Target,
  FileText,
  Play,
  ArrowRight,
  Star,
  Lightbulb,
  Calendar
} from 'lucide-react';
import { MentorKit, ProgramPhase } from '@/types';
import { mentorKits } from '@/data/mentorKits';

interface MentorKitViewerProps {
  phase: ProgramPhase;
  onMarkComplete?: (activityId: string) => void;
}

export function MentorKitViewer({ phase, onMarkComplete }: MentorKitViewerProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const mentorKit = mentorKits.find(kit => kit.phase === phase);

  if (!mentorKit) {
    return (
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-8 text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Kit Available</h3>
          <p className="text-muted-foreground">
            The mentor kit for this phase is not yet available.
          </p>
        </CardContent>
      </Card>
    );
  }

  const toggleCheck = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const phaseColors = {
    phase1: 'bg-primary/20 text-primary border-primary/30',
    phase2: 'bg-accent/20 text-accent border-accent/30',
    phase3: 'bg-warning/20 text-warning border-warning/30',
    phase4: 'bg-success/20 text-success border-success/30'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">{mentorKit.title}</CardTitle>
                <CardDescription className="text-base mt-1">
                  {mentorKit.description}
                </CardDescription>
              </div>
            </div>
            <Badge variant="secondary" className={phaseColors[phase]}>
              {phase}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Prep Time</p>
                <p className="text-xs text-muted-foreground">{mentorKit.prepTime} minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-foreground">Activities</p>
                <p className="text-xs text-muted-foreground">{mentorKit.activities.length} included</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-foreground">Resources</p>
                <p className="text-xs text-muted-foreground">{mentorKit.resources.length} materials</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Objectives */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mentorKit.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm text-foreground">{objective}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-accent" />
                  Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mentorKit.nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckSquare className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <p className="text-sm text-foreground">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-gradient-accent/10 border-accent/30">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" size="sm" className="justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message Group
                </Button>
                <Button variant="outline" size="sm" className="justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Download Kit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussion" className="space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Discussion Points
              </CardTitle>
              <CardDescription>
                Use these talking points to guide meaningful conversations with your mentees
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mentorKit.discussionPoints.map((point, index) => (
                <div key={index} className="p-4 rounded-lg bg-secondary/50 border-l-4 border-primary">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-primary-foreground">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground font-medium mb-2">{point}</p>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>💡 <strong>Tip:</strong> Share personal experiences to make this relatable</p>
                        <p>⏱️ <strong>Time:</strong> Allow 10-15 minutes for discussion</p>
                        <p>🎯 <strong>Goal:</strong> Encourage open sharing and peer learning</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          {mentorKit.activities.map((activity, index) => (
            <Card key={activity.id} className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{activity.title}</CardTitle>
                      <CardDescription>{activity.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-accent text-accent">
                      {activity.type}
                    </Badge>
                    <Badge variant="outline">
                      {activity.duration}m
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Instructions */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-primary" />
                    Instructions
                  </h4>
                  <div className="space-y-2">
                    {activity.instructions.map((instruction, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-primary">{idx + 1}</span>
                        </div>
                        <p className="text-sm text-foreground">{instruction}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Expected Outcomes */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-success" />
                    Expected Outcomes
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activity.expectedOutcomes.map((outcome, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-success/10 border border-success/30">
                        <p className="text-sm text-foreground">{outcome}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Materials */}
                {activity.materials && activity.materials.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Materials Needed</h4>
                    <div className="flex flex-wrap gap-2">
                      {activity.materials.map((material, idx) => (
                        <Badge key={idx} variant="secondary">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4 border-t border-border">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onMarkComplete?.(activity.id)}
                  >
                    Mark as Completed
                  </Button>
                  <Button variant="outline" size="sm">
                    Add Notes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Templates */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Templates & Worksheets
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mentorKit.templates.map((template, index) => (
                  <div key={template.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">{template.title}</p>
                      <p className="text-xs text-muted-foreground">Ready-to-use template</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Additional Resources */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-accent" />
                  Additional Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mentorKit.resources.map((resource, index) => (
                  <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div>
                      <p className="text-sm font-medium text-foreground">{resource.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {resource.estimatedReadTime}m read • {resource.type}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-primary" />
                Session Preparation Checklist
              </CardTitle>
              <CardDescription>
                Complete these items to ensure a successful mentoring session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                'Review mentor kit objectives and discussion points',
                'Download and prepare any required templates',
                'Set up meeting room/video conference',
                'Prepare personal examples to share',
                'Review mentee progress from previous sessions',
                'Prepare questions to gauge understanding',
                'Plan follow-up tasks and next steps'
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                  <button
                    onClick={() => toggleCheck(`checklist-${index}`)}
                    className="flex-shrink-0"
                  >
                    {checkedItems.has(`checklist-${index}`) ? (
                      <CheckSquare className="w-5 h-5 text-success" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-border rounded" />
                    )}
                  </button>
                  <span className={`text-sm ${
                    checkedItems.has(`checklist-${index}`) 
                      ? 'text-muted-foreground line-through' 
                      : 'text-foreground'
                  }`}>
                    {item}
                  </span>
                </div>
              ))}
              
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Completion: {checkedItems.size}/7 items
                  </p>
                  <Button size="sm" className="bg-gradient-primary">
                    Mark Session Ready
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}