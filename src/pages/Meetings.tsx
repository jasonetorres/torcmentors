import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useSupabaseAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  Calendar, 
  Clock, 
  Users,
  Video,
  Plus,
  MessageSquare,
  Edit,
  Trash2
} from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  attendees: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingUrl?: string;
  assignedTo?: string;
}

export default function Meetings() {
  const { toast } = useToast();
  const { profile } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      title: 'Phase 1: Goal Setting Workshop',
      description: 'SMART goals discussion and action planning',
      date: 'Wednesday, Jan 15',
      time: '6:00 PM EST',
      duration: '60 minutes',
      attendees: 4,
      status: 'upcoming',
      meetingUrl: 'https://meet.google.com/abc-defg-hij'
    },
    {
      id: '2',
      title: 'Resume Review Session',
      description: 'One-on-one feedback on resume and LinkedIn profile',
      date: 'Friday, Jan 17',
      time: '5:30 PM EST',
      duration: '45 minutes',
      attendees: 2,
      status: 'upcoming'
    },
    {
      id: '3',
      title: 'Technical Interview Prep',
      description: 'Mock interviews and coding practice',
      date: 'Monday, Jan 13',
      time: '7:00 PM EST',
      duration: '90 minutes',
      attendees: 4,
      status: 'completed'
    }
  ]);

  const [newMeeting, setNewMeeting] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    duration: '60',
    assignedTo: '' // Add this for group member assignment
  });

  // Mock group members - in real app, fetch from backend
  const groupMembers = [
    { id: '1', name: 'Alice Johnson', role: 'mentee', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', role: 'mentee', email: 'bob@example.com' },
    { id: '3', name: 'Sarah Chen', role: 'mentor', email: 'sarah@example.com' },
    { id: '4', name: 'Mike Rodriguez', role: 'mentor', email: 'mike@example.com' }
  ];

  const sendNotificationEmail = async (type: string, recipientEmail: string, recipientName: string, data: any) => {
    try {
      await supabase.functions.invoke('send-notification', {
        body: {
          type,
          recipient_email: recipientEmail,
          recipient_name: recipientName,
          sender_name: profile?.display_name || 'Team Member',
          data
        }
      });
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  const handleCreateMeeting = async () => {
    if (!newMeeting.title.trim() || !newMeeting.date || !newMeeting.time) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const meeting: Meeting = {
      id: Date.now().toString(),
      title: newMeeting.title,
      description: newMeeting.description,
      date: new Date(newMeeting.date).toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'short', 
        day: 'numeric' 
      }),
      time: newMeeting.time,
      duration: `${newMeeting.duration} minutes`,
      attendees: 2,
      status: 'upcoming',
      meetingUrl: `https://meet.google.com/${Math.random().toString(36).substr(2, 12)}`,
      assignedTo: newMeeting.assignedTo
    };

    setMeetings([...meetings, meeting]);

    // Send email notification if meeting is assigned to someone
    if (newMeeting.assignedTo) {
      const assignedMember = groupMembers.find(m => m.id === newMeeting.assignedTo);
      if (assignedMember) {
        await sendNotificationEmail('meeting_assigned', assignedMember.email, assignedMember.name, {
          title: newMeeting.title,
          message: newMeeting.description,
          meeting_date: newMeeting.date,
          meeting_time: newMeeting.time,
          group_name: 'Your Mentorship Group'
        });
      }
    }

    setNewMeeting({
      title: '',
      description: '',
      date: '',
      time: '',
      duration: '60',
      assignedTo: ''
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Meeting Created",
      description: newMeeting.assignedTo ? "Meeting created and notification sent!" : "Meeting created successfully.",
    });
  };

  const handleJoinMeeting = (meeting: Meeting) => {
    if (meeting.meetingUrl) {
      window.open(meeting.meetingUrl, '_blank');
      toast({
        title: "Joining Meeting",
        description: `Opening ${meeting.title} in Google Meet...`,
      });
    } else {
      toast({
        title: "Meeting Link Not Available",
        description: "Meeting link will be provided closer to the meeting time.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteMeeting = (meetingId: string) => {
    setMeetings(meetings.filter(meeting => meeting.id !== meetingId));
    toast({
      title: "Meeting Cancelled",
      description: "Meeting has been removed from your schedule.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-primary/20 text-primary border-primary/30';
      case 'completed': return 'bg-success/20 text-success border-success/30';
      case 'cancelled': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meetings & Sessions</h1>
          <p className="text-muted-foreground mt-2">
            Manage your mentorship meetings and group sessions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Schedule Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
              <DialogDescription>
                Create a new meeting or session for your group
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Meeting Title</Label>
                <Input 
                  id="title" 
                  placeholder="e.g., Weekly Check-in"
                  value={newMeeting.title}
                  onChange={(e) => setNewMeeting({...newMeeting, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="What will be discussed in this meeting?"
                  value={newMeeting.description}
                  onChange={(e) => setNewMeeting({...newMeeting, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting({...newMeeting, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input 
                    id="time" 
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting({...newMeeting, time: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Select value={newMeeting.duration} onValueChange={(value) => setNewMeeting({...newMeeting, duration: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="assignTo">Assign to Group Member (Optional)</Label>
                <Select value={newMeeting.assignedTo} onValueChange={(value) => setNewMeeting({...newMeeting, assignedTo: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a group member" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name} ({member.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-primary" onClick={handleCreateMeeting}>
                  Schedule Meeting
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
        {meetings.map((meeting) => (
          <Card key={meeting.id} className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {meeting.title}
              </CardTitle>
              <CardDescription>
                {meeting.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className={getStatusColor(meeting.status)}>
                  {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {meeting.date} at {meeting.time}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  {meeting.attendees} attendees
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  Duration: {meeting.duration}
                </div>
              </div>
              <div className="flex gap-2">
                {meeting.status === 'upcoming' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleJoinMeeting(meeting)}
                    className="bg-primary/20 text-primary"
                  >
                    <Video className="w-4 h-4 mr-2" />
                    Join Meeting
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('/group-chat', '_blank')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteMeeting(meeting.id)}
                  className="text-destructive hover:bg-destructive/20"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}