import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Users, 
  Calendar,
  Paperclip,
  Smile,
  MoreVertical,
  Pin
} from 'lucide-react';
import { mockUsers, mockGroups } from '@/data/mockData';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'system' | 'meeting-reminder';
  isPinned?: boolean;
}

export default function GroupChat() {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  
  // Mock messages for the group
  const [messages] = useState<Message[]>([
    {
      id: '1',
      userId: '2',
      content: 'Welcome everyone to the Frontend Focus Group chat! 🎉',
      timestamp: new Date('2025-01-13T10:00:00'),
      type: 'text',
      isPinned: true
    },
    {
      id: '2',
      userId: 'system',
      content: 'Alex Rivera joined the group',
      timestamp: new Date('2025-01-13T10:05:00'),
      type: 'system'
    },
    {
      id: '3',
      userId: '3',
      content: 'Hi everyone! Excited to be part of this group. Looking forward to learning together!',
      timestamp: new Date('2025-01-13T10:07:00'),
      type: 'text'
    },
    {
      id: '4',
      userId: '2',
      content: "Great to have you Alex! Don't forget we have our Goal Setting Workshop on Wednesday at 6PM EST",
      timestamp: new Date('2025-01-13T10:15:00'),
      type: 'text'
    },
    {
      id: '5',
      userId: 'system',
      content: 'Reminder: Goal Setting Workshop - Wednesday, January 15, 2025 at 6:00 PM EST',
      timestamp: new Date('2025-01-14T14:00:00'),
      type: 'meeting-reminder'
    },
    {
      id: '6',
      userId: '3',
      content: 'Quick question - should I bring anything specific to the workshop?',
      timestamp: new Date('2025-01-14T15:30:00'),
      type: 'text'
    },
    {
      id: '7',
      userId: '2',
      content: 'Just bring your current goals (even if they\'re rough drafts) and an open mind! We\'ll refine them together.',
      timestamp: new Date('2025-01-14T15:45:00'),
      type: 'text'
    }
  ]);

  const userGroup = mockGroups.find(g => g.menteeIds.includes(user?.id || '') || g.mentorId === user?.id);
  const groupMembers = mockUsers.filter(u => 
    userGroup && (u.id === userGroup.mentorId || userGroup.menteeIds.includes(u.id))
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // In real app, would send to backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const getUserName = (userId: string) => {
    if (userId === 'system') return 'System';
    return mockUsers.find(u => u.id === userId)?.name || 'Unknown';
  };

  const getUserAvatar = (userId: string) => {
    return mockUsers.find(u => u.id === userId)?.avatar;
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!userGroup) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Group Assigned</h3>
          <p className="text-muted-foreground">
            You need to be assigned to a mentor group to access group chat.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{userGroup.name}</h1>
          <p className="text-muted-foreground mt-2">
            Group chat and collaboration space
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
            {userGroup.status}
          </Badge>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader className="border-b border-border">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <span>#{userGroup.discordChannel?.replace('#', '') || 'group-chat'}</span>
                  <Badge variant="secondary" className="text-xs">
                    {groupMembers.length} members
                  </Badge>
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Messages */}
              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className="group">
                      {message.type === 'system' ? (
                        <div className="flex justify-center">
                          <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs">
                            {message.content}
                          </div>
                        </div>
                      ) : message.type === 'meeting-reminder' ? (
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                          <div className="flex items-center gap-2 text-primary mb-1">
                            <Calendar className="w-4 h-4" />
                            <span className="font-medium text-sm">Meeting Reminder</span>
                          </div>
                          <p className="text-sm text-foreground">{message.content}</p>
                        </div>
                      ) : (
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <img
                              src={getUserAvatar(message.userId) || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
                              alt={getUserName(message.userId)}
                              className="w-8 h-8 rounded-full border border-border"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-sm text-foreground">
                                {getUserName(message.userId)}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(message.timestamp)}
                              </span>
                              {message.isPinned && (
                                <Pin className="w-3 h-3 text-warning" />
                              )}
                            </div>
                            <p className="text-sm text-foreground break-words">
                              {message.content}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="border-t border-border p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder={`Message #${userGroup.discordChannel?.replace('#', '') || 'group-chat'}`}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="pr-16"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-gradient-primary"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Group Members */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="w-4 h-4" />
                Members ({groupMembers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {groupMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={member.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'}
                      alt={member.name}
                      className="w-8 h-8 rounded-full border border-border"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border border-background" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card className="bg-gradient-card border-border shadow-card">
            <CardHeader>
              <CardTitle className="text-sm">Group Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Meeting Schedule</p>
                <p className="font-medium text-foreground">{userGroup.meetingSchedule}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Current Phase</p>
                <Badge variant="outline" className="text-xs">
                  {userGroup.currentPhase}
                </Badge>
              </div>
              <div>
                <p className="text-muted-foreground">Progress</p>
                <div className="mt-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span>{userGroup.completedSessions} of {userGroup.totalSessions} sessions</span>
                    <span>{Math.round((userGroup.completedSessions / userGroup.totalSessions) * 100)}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full"
                      style={{ width: `${(userGroup.completedSessions / userGroup.totalSessions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}