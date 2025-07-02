import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Calendar, 
  CheckSquare,
  Clock,
  Download,
  Star,
  Users,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { MentorKitViewer } from '@/components/mentor/MentorKitViewer';
import { ProgramPhase } from '@/types';

export default function MentorKit() {
  const [selectedPhase, setSelectedPhase] = useState<ProgramPhase>('phase1');

  const phases = [
    {
      phase: 'phase1' as ProgramPhase,
      title: 'Launch & Goal Setting',
      description: 'Establish rapport and define mentee goals',
      duration: 'July',
      status: 'active',
      sessions: 2,
      completedSessions: 1
    },
    {
      phase: 'phase2' as ProgramPhase,
      title: 'Foundation & Exploration',
      description: 'Work on goals and explore professional topics',
      duration: 'August - September',
      status: 'upcoming',
      sessions: 4,
      completedSessions: 0
    },
    {
      phase: 'phase3' as ProgramPhase,
      title: 'Deep Dive & Review',
      description: 'Advanced scenarios and mid-program review',
      duration: 'October - November',
      status: 'locked',
      sessions: 4,
      completedSessions: 0
    },
    {
      phase: 'phase4' as ProgramPhase,
      title: 'Reflection & Planning',
      description: 'Celebrate progress and plan future growth',
      duration: 'December',
      status: 'locked',
      sessions: 2,
      completedSessions: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'upcoming':
        return 'bg-accent/20 text-accent border-accent/30';
      case 'locked':
        return 'bg-muted text-muted-foreground border-muted-foreground/30';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mentor Kit</h1>
          <p className="text-muted-foreground mt-2">
            Everything you need to facilitate meaningful mentoring sessions
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download All
          </Button>
          <Button size="sm" className="bg-gradient-primary">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Session
          </Button>
        </div>
      </div>

      {/* Program Overview */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-primary" />
            Program Overview
          </CardTitle>
          <CardDescription>
            Your role as a mentor is to facilitate discussions and share your experience. 
            We provide all the content and structure you need.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Minimal Prep Time</h3>
              <p className="text-sm text-muted-foreground mt-1">
                60-90 minutes preparation per phase
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-accent/20 rounded-lg flex items-center justify-center mb-3">
                <BookOpen className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Pre-Built Content</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Discussion points, activities, and templates
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto bg-success/20 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-6 h-6 text-success" />
              </div>
              <h3 className="font-semibold text-foreground">Proven Framework</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Structured approach for maximum impact
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phase Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {phases.map((phase) => (
          <Card 
            key={phase.phase}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedPhase === phase.phase 
                ? 'bg-gradient-primary/10 border-primary shadow-glow' 
                : 'bg-gradient-card border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedPhase(phase.phase)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className={getStatusColor(phase.status)}>
                  {phase.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{phase.duration}</span>
              </div>
              <CardTitle className="text-lg">{phase.title}</CardTitle>
              <CardDescription className="text-sm">
                {phase.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress:</span>
                  <span className="font-medium">
                    {phase.completedSessions}/{phase.sessions} sessions
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(phase.completedSessions / phase.sessions) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Phase Content */}
      <MentorKitViewer 
        phase={selectedPhase} 
        onMarkComplete={(activityId) => {
          console.log('Activity completed:', activityId);
          // Handle activity completion
        }}
      />
    </div>
  );
}