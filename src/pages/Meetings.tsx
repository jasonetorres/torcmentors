import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Users,
  Video,
  Plus,
  MessageSquare
} from 'lucide-react';

export default function Meetings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meetings & Sessions</h1>
          <p className="text-muted-foreground mt-2">
            Manage your mentorship meetings and group sessions
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Phase 1: Goal Setting Workshop
            </CardTitle>
            <CardDescription>
              SMART goals discussion and action planning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                Upcoming
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                Wednesday, Jan 15 at 6:00 PM EST
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                4 attendees
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-gradient-primary">
                <Video className="w-4 h-4 mr-2" />
                Join Meeting
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                View Agenda
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}