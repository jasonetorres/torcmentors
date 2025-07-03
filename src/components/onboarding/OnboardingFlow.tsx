import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  Circle, 
  User, 
  Target, 
  Settings, 
  Users,
  ArrowRight,
  ArrowLeft,
  Star,
  Github,
  MessageCircle,
  Video,
  Calendar
} from 'lucide-react';
import { OnboardingStep, UserRole } from '@/types';
import { useAuth } from '@/hooks/useSupabaseAuth';

interface OnboardingFlowProps {
  userRole: UserRole;
  currentStep: OnboardingStep;
  onStepComplete: (step: OnboardingStep) => void;
  onComplete: () => void;
}

export function OnboardingFlow({ 
  userRole, 
  currentStep, 
  onStepComplete, 
  onComplete 
}: OnboardingFlowProps) {
  const { user, profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    bio: profile?.bio || '',
    skills: profile?.skills?.join(', ') || '',
    experience: profile?.experience || '',
    linkedinUrl: profile?.linkedin_url || '',
    githubUrl: profile?.github_url || '',
    discordUsername: profile?.discord_username || '',
    preferredVideoTool: profile?.preferred_video_tool || '',
    goals: '',
    expectations: ''
  });

  const steps: { step: OnboardingStep; title: string; description: string; icon: any }[] = [
    {
      step: 'welcome',
      title: 'Welcome to Torc Mentorship',
      description: 'Get started on your career development journey',
      icon: Star
    },
    {
      step: 'profile-setup',
      title: 'Complete Your Profile',
      description: 'Tell us about yourself and your background',
      icon: User
    },
    {
      step: 'goal-setting',
      title: 'Set Your Goals',
      description: 'Define what you want to achieve in this program',
      icon: Target
    },
    {
      step: 'tool-setup',
      title: 'Connect Your Tools',
      description: 'Set up Discord, GitHub, and video conferencing',
      icon: Settings
    },
    {
      step: 'group-assignment',
      title: 'Meet Your Group',
      description: 'Get introduced to your mentor and fellow mentees',
      icon: Users
    },
    {
      step: 'readiness-check',
      title: 'Readiness Check',
      description: 'Confirm you\'re ready to begin the program',
      icon: CheckCircle
    }
  ];

  const currentStepIndex = steps.findIndex(s => s.step === currentStep);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1].step;
      onStepComplete(nextStep);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1].step;
      onStepComplete(prevStep);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const saveProfileData = () => {
    updateProfile({
      bio: formData.bio,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
      experience: formData.experience,
      linkedin_url: formData.linkedinUrl,
      github_url: formData.githubUrl,
      discord_username: formData.discordUsername,
      preferred_video_tool: formData.preferredVideoTool
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow">
              <Star className="w-12 h-12 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Welcome to Torc Mentorship Program
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                {userRole === 'mentor' 
                  ? 'Thank you for volunteering to mentor the next generation of developers. Your experience and guidance will make a real difference.'
                  : 'You\'re about to embark on an exciting journey of growth and learning. Let\'s get you set up for success.'
                }
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="p-4 rounded-lg bg-secondary/50">
                <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Goal-Driven</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Set and achieve meaningful career goals
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Community</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Connect with like-minded professionals
                </p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Growth</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Develop skills and advance your career
                </p>
              </div>
            </div>
          </div>
        );

      case 'profile-setup':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Tell Us About Yourself</h2>
              <p className="text-muted-foreground">
                Help your {userRole === 'mentor' ? 'mentees' : 'mentor and peers'} get to know you better
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your background and interests..."
                    value={formData.bio}
                    onChange={(e) => updateFormData('bio', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="skills">Skills</Label>
                  <Input
                    id="skills"
                    placeholder="React, Node.js, Python, etc."
                    value={formData.skills}
                    onChange={(e) => updateFormData('skills', e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Separate multiple skills with commas
                  </p>
                </div>

                <div>
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select value={formData.experience} onValueChange={(value) => updateFormData('experience', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1 years">0-1 years</SelectItem>
                      <SelectItem value="1-3 years">1-3 years</SelectItem>
                      <SelectItem value="3-5 years">3-5 years</SelectItem>
                      <SelectItem value="5+ years">5+ years</SelectItem>
                      <SelectItem value="10+ years">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourname"
                    value={formData.linkedinUrl}
                    onChange={(e) => updateFormData('linkedinUrl', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/yourusername"
                    value={formData.githubUrl}
                    onChange={(e) => updateFormData('githubUrl', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="discord">Discord Username</Label>
                  <Input
                    id="discord"
                    placeholder="username#1234"
                    value={formData.discordUsername}
                    onChange={(e) => updateFormData('discordUsername', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'goal-setting':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {userRole === 'mentor' ? 'Your Mentoring Goals' : 'Your Development Goals'}
              </h2>
              <p className="text-muted-foreground">
                {userRole === 'mentor' 
                  ? 'What do you hope to achieve as a mentor in this program?'
                  : 'What do you want to accomplish during this mentorship program?'
                }
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="goals">
                  {userRole === 'mentor' ? 'Mentoring Objectives' : 'Learning Goals'}
                </Label>
                <Textarea
                  id="goals"
                  placeholder={
                    userRole === 'mentor' 
                      ? "What skills or knowledge do you want to share? How do you want to help mentees grow?"
                      : "What skills do you want to develop? What career goals are you working towards?"
                  }
                  value={formData.goals}
                  onChange={(e) => updateFormData('goals', e.target.value)}
                  className="mt-1 min-h-[120px]"
                />
              </div>

              <div>
                <Label htmlFor="expectations">Program Expectations</Label>
                <Textarea
                  id="expectations"
                  placeholder="What are you hoping to get out of this program? Any specific concerns or questions?"
                  value={formData.expectations}
                  onChange={(e) => updateFormData('expectations', e.target.value)}
                  className="mt-1 min-h-[120px]"
                />
              </div>
            </div>

            <div className="bg-secondary/50 rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">💡 Tips for Great Goals</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Be specific about what you want to achieve</li>
                <li>• Set measurable outcomes when possible</li>
                <li>• Consider both technical and soft skills</li>
                <li>• Think about realistic timelines</li>
              </ul>
            </div>
          </div>
        );

      case 'tool-setup':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Connect Your Tools</h2>
              <p className="text-muted-foreground">
                Set up the tools you'll use throughout the program
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Discord Setup
                  </CardTitle>
                  <CardDescription>
                    Join your group's private Discord channel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm">Discord account connected</span>
                    <Badge variant="outline" className="border-success text-success">
                      ✓ Connected
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Test Connection
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Github className="w-5 h-5 text-primary" />
                    GitHub Access
                  </CardTitle>
                  <CardDescription>
                    Access your group's repository for code sharing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <span className="text-sm">Repository access</span>
                    <Badge variant="outline" className="border-warning text-warning">
                      Pending
                    </Badge>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Request Access
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Video className="w-5 h-5 text-primary" />
                    Video Conferencing
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred meeting platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Select 
                    value={formData.preferredVideoTool} 
                    onValueChange={(value) => updateFormData('preferredVideoTool', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select video tool" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Google Meet">Google Meet</SelectItem>
                      <SelectItem value="Zoom">Zoom</SelectItem>
                      <SelectItem value="Discord Voice">Discord Voice</SelectItem>
                      <SelectItem value="Microsoft Teams">Microsoft Teams</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="w-5 h-5 text-primary" />
                    Meeting Schedule
                  </CardTitle>
                  <CardDescription>
                    Coordinate with your group's availability
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-secondary/50">
                    <p className="text-sm font-medium">Scheduled: Wednesdays 6PM EST</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Confirmed with your mentor
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'group-assignment':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Meet Your Group</h2>
              <p className="text-muted-foreground">
                You've been assigned to the Frontend Focus Group
              </p>
            </div>

            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="text-xl">Frontend Focus Group</CardTitle>
                <CardDescription>
                  A supportive community focused on frontend development and career growth
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {userRole === 'mentee' && (
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Your Mentor</h3>
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                      <img 
                        src="https://images.unsplash.com/photo-1494790108755-2616b5c6e3d8?w=48&h=48&fit=crop&crop=face"
                        alt="Sarah Chen"
                        className="w-12 h-12 rounded-full border-2 border-border"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">Sarah Chen</p>
                        <p className="text-sm text-muted-foreground">Senior Software Engineer</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          6+ years experience in React, Node.js, and system design
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-foreground mb-3">
                    {userRole === 'mentor' ? 'Your Mentees' : 'Fellow Mentees'}
                  </h3>
                  <div className="space-y-3">
                    {['Alex Rivera', 'Jordan Kim', 'Sam Taylor'].map((name, index) => (
                      <div key={name} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                          <span className="text-xs font-medium text-primary-foreground">
                            {name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{name}</p>
                          <p className="text-xs text-muted-foreground">
                            {index === 0 ? 'Transitioning from marketing' : 
                             index === 1 ? 'Recent bootcamp graduate' : 
                             'CS student, part-time developer'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">12</p>
                    <p className="text-xs text-muted-foreground">Weeks Together</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">4</p>
                    <p className="text-xs text-muted-foreground">Program Phases</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'readiness-check':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-2">Ready to Begin?</h2>
              <p className="text-muted-foreground">
                Let's make sure everything is set up correctly before you start
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Profile completed', completed: true },
                  { label: 'Goals defined', completed: true },
                  { label: 'Discord connected', completed: true },
                  { label: 'GitHub access granted', completed: false },
                  { label: 'Meeting scheduled', completed: true },
                  { label: 'Group introductions', completed: false }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    {item.completed ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <Circle className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className={`text-sm ${item.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Card className="bg-gradient-accent/10 border-accent/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-2">🎉 You're Almost Ready!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete the remaining items above, and you'll be ready to start your mentorship journey.
                  Your first group meeting is scheduled for Wednesday at 6PM EST.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Review Checklist
                  </Button>
                  <Button variant="outline" size="sm">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.step} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                index <= currentStepIndex 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'bg-background border-border text-muted-foreground'
              }`}>
                {index < currentStepIndex ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                  index < currentStepIndex ? 'bg-primary' : 'bg-border'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <h1 className="text-xl font-semibold text-foreground">
            {steps[currentStepIndex]?.title}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Step {currentStepIndex + 1} of {steps.length}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-8">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button 
          onClick={() => {
            if (currentStep === 'profile-setup') {
              saveProfileData();
            }
            handleNext();
          }}
          className="bg-gradient-primary"
        >
          {currentStepIndex === steps.length - 1 ? 'Complete Setup' : 'Continue'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}