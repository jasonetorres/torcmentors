import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Send, 
  Users,
  Plus,
  Search,
  Pin,
  Paperclip,
  Smile,
  MoreVertical,
  Hash,
  Volume2,
  Video
} from 'lucide-react';
import { useAuth } from '@/hooks/useSupabaseAuth';

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  isSystem?: boolean;
}

interface Channel {
  id: string;
  name: string;
  description: string;
  type: 'group' | 'general' | 'announcements';
  memberCount: number;
  lastMessage?: Message;
  unreadCount: number;
}

export default function Communication() {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [selectedChannel, setSelectedChannel] = useState<string>('general');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateChannel = () => {
    toast({
      title: "Create Channel",
      description: "Channel creation feature coming soon",
    });
  };

  const isMentor = profile?.role === 'mentor';

  // Mock channels
  const channels: Channel[] = [
    {
      id: 'general',
      name: 'General',
      description: 'Main discussion channel for everyone',
      type: 'general',
      memberCount: 52,
      unreadCount: 3,
      lastMessage: {
        id: '1',
        userId: '1',
        userName: 'Sarah Chen',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b5c6e3d8?w=32&h=32&fit=crop&crop=face',
        content: 'Welcome everyone to the mentorship program! 🎉',
        timestamp: new Date('2025-01-02T10:30:00')
      }
    },
    {
      id: 'announcements',
      name: 'Announcements',
      description: 'Important program updates and announcements',
      type: 'announcements',
      memberCount: 52,
      unreadCount: 1,
      lastMessage: {
        id: '2',
        userId: 'admin',
        userName: 'Program Admin',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        content: 'Phase 1 kickoff meetings start next week. Check your calendars!',
        timestamp: new Date('2025-01-01T14:00:00')
      }
    },
    {
      id: 'group-1',
      name: 'Frontend Focus Group',
      description: 'Sarah Chen + 3 mentees',
      type: 'group',
      memberCount: 4,
      unreadCount: 0,
      lastMessage: {
        id: '3',
        userId: '3',
        userName: 'Alex Rivera',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        content: 'Thanks for the React resources, very helpful!',
        timestamp: new Date('2025-01-01T16:20:00')
      }
    }
  ];

  // Mock messages for selected channel
  const messages: Message[] = [
    {
      id: '1',
      userId: 'admin',
      userName: 'Program Admin',
      userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      content: 'Welcome to the Torc Mentorship Program! This is where we\'ll communicate throughout the program.',
      timestamp: new Date('2025-01-01T09:00:00'),
      isSystem: true
    },
    {
      id: '2',
      userId: '1',
      userName: 'Sarah Chen',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b5c6e3d8?w=32&h=32&fit=crop&crop=face',
      content: 'Hi everyone! I\'m excited to be your mentor for this cohort. Looking forward to working with you all! 🚀',
      timestamp: new Date('2025-01-01T10:15:00')
    },
    {
      id: '3',
      userId: '3',
      userName: 'Alex Rivera',
      userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      content: 'Thank you Sarah! Really excited to start this journey. I\'ve been working on my goals and can\'t wait to share them.',
      timestamp: new Date('2025-01-01T10:30:00')
    },
    {
      id: '4',
      userId: '4',
      userName: 'Jordan Kim',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face',
      content: 'Same here! Quick question - when is our first group meeting scheduled?',
      timestamp: new Date('2025-01-01T11:00:00')
    },
    {
      id: '5',
      userId: '1',
      userName: 'Sarah Chen',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b5c6e3d8?w=32&h=32&fit=crop&crop=face',
      content: 'Great question Jordan! Our first meeting is scheduled for Wednesday, January 15th at 6:00 PM EST. I\'ll send out calendar invites today.',
      timestamp: new Date('2025-01-01T11:15:00')
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const getCurrentChannel = () => {
    return channels.find(c => c.id === selectedChannel) || channels[0];
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Sidebar - Channels */}
      <div className="w-80 bg-gradient-card border border-border rounded-lg shadow-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Channels</h2>
            {isMentor && (
              <Button size="sm" variant="outline" onClick={handleCreateChannel}>
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search channels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-2">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors mb-1 ${
                  selectedChannel === channel.id
                    ? 'bg-primary/20 text-primary border border-primary/30'
                    : 'hover:bg-secondary/80 text-foreground'
                }`}
                onClick={() => setSelectedChannel(channel.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {channel.type === 'group' ? (
                        <Users className="w-4 h-4" />
                      ) : (
                        <Hash className="w-4 h-4" />
                      )}
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    {channel.unreadCount > 0 && (
                      <Badge variant="destructive" className="h-5 min-w-5 text-xs">
                        {channel.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {channel.memberCount}
                  </span>
                </div>
                {channel.lastMessage && (
                  <div className="mt-1 text-xs text-muted-foreground line-clamp-1">
                    <span className="font-medium">{channel.lastMessage.userName}:</span>{' '}
                    {channel.lastMessage.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-gradient-card border border-border rounded-lg shadow-card flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {getCurrentChannel().type === 'group' ? (
                  <Users className="w-5 h-5 text-primary" />
                ) : (
                  <Hash className="w-5 h-5 text-primary" />
                )}
                <h1 className="text-xl font-semibold text-foreground">
                  {getCurrentChannel().name}
                </h1>
              </div>
              <Badge variant="secondary">
                {getCurrentChannel().memberCount} members
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Volume2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {getCurrentChannel().description}
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src={message.userAvatar} alt={message.userName} />
                <AvatarFallback>{message.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground">{message.userName}</span>
                  {message.isSystem && (
                    <Badge variant="outline" className="text-xs">System</Badge>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
                <p className="text-sm text-foreground">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-end gap-3">
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder={`Message ${getCurrentChannel().name}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  Press Enter to send, Shift+Enter for new line
                </div>
              </div>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-primary"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Online Members */}
      <div className="w-64 bg-gradient-card border border-border rounded-lg shadow-card">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Online Now</h3>
        </div>
        <div className="p-2">
          {[
            { name: 'Sarah Chen', role: 'Mentor', status: 'online' },
            { name: 'Alex Rivera', role: 'Mentee', status: 'online' },
            { name: 'Jordan Kim', role: 'Mentee', status: 'away' },
            { name: 'Sam Taylor', role: 'Mentee', status: 'offline' }
          ].map((member, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
              <div className="relative">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${
                  member.status === 'online' ? 'bg-success' :
                  member.status === 'away' ? 'bg-warning' : 'bg-muted'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}