import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageSquare, 
  Github,
  Calendar,
  Target,
  TrendingUp
} from 'lucide-react';

export default function Group() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Frontend Focus Group</h1>
          <p className="text-muted-foreground mt-2">
            Your mentorship group for career development and growth
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <MessageSquare className="w-4 h-4 mr-2" />
          Group Chat
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Group Members
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b5c6e3d8?w=48&h=48&fit=crop&crop=face"
                    alt="Sarah Chen"
                    className="w-12 h-12 rounded-full border-2 border-border"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">Sarah Chen</h4>
                    <p className="text-sm text-muted-foreground">Mentor • Senior Software Engineer</p>
                  </div>
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                    Mentor
                  </Badge>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
                    alt="Alex Rivera"
                    className="w-12 h-12 rounded-full border-2 border-border"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">Alex Rivera</h4>
                    <p className="text-sm text-muted-foreground">Mentee • Transitioning from marketing</p>
                  </div>
                  <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                    Mentee
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Next Meeting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-lg font-semibold text-foreground">Wednesday, Jan 15</p>
                <p className="text-sm text-muted-foreground">6:00 PM EST</p>
                <Button className="w-full mt-4 bg-gradient-primary">
                  Join Meeting
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                Group Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">45%</p>
                <p className="text-sm text-muted-foreground">Phase 1 Complete</p>
                <div className="w-full bg-secondary rounded-full h-2 mt-3">
                  <div className="bg-gradient-primary h-2 rounded-full w-[45%]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}