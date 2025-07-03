import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  MessageSquare, 
  Send, 
  Users,
  Plus,
  Paperclip,
  Smile,
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

export default function Communication() {
  const { toast } = useToast();
  const { user, profile } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Mock group data - in real app, would fetch user's assigned group
  const userGroup = {
    id: 'group-1',
    name: 'Frontend Focus Group',
    description: 'Frontend development mentorship group',
    memberCount: 2
  };

  const groupMembers = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Mentor',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5c6e3d8?w=32&h=32&fit=crop&crop=face',
      isOnline: true
    },
    {
      id: '2', 
      name: 'Alex Rivera',
      role: 'Mentee',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
      isOnline: true
    }
  ];

  const handleScheduleMeeting = () => {
    window.location.href = '/meetings';
  };

  const handleVideoCall = () => {
    // Open a new meeting room
    window.open('https://meet.google.com/', '_blank');
  };

  const handleVoiceCall = () => {
    // Open a voice call interface
    window.open('https://discord.com/', '_blank'); 
  };

  const handleMoreOptions = () => {
    toast({
      title: "Channel Options",
      description: "Channel settings and options",
    });
  };

  const handleAttachFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,document/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        toast({
          title: "File Selected",
          description: `Selected: ${file.name}`,
        });
      }
    };
    input.click();
  };

  const handleAddEmoji = () => {
    const emojis = ['👍', '❤️', '😊', '🎉', '👏', '🔥', '💯', '🚀'];
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    setNewMessage(prev => prev + randomEmoji);
  };

  const isMentor = profile?.role === 'mentor';

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: user?.id || '',
      userName: profile?.display_name || 'Anonymous',
      userAvatar: profile?.avatar_url || '',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages([...messages, message]);

    // Send email notification to group members
    try {
      await supabase.functions.invoke('send-notification', {
        body: {
          type: 'message_received',
          recipient_email: 'group-member@example.com',
          recipient_name: 'Group Member',
          sender_name: profile?.display_name || 'Team Member',
          data: {
            message: newMessage,
            group_name: userGroup.name
          }
        }
      });
    } catch (error) {
      console.error('Failed to send notification:', error);
    }

    setNewMessage('');
    toast({
      title: "Message Sent",
      description: "Your message has been sent.",
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-full overflow-hidden">
      {/* Main Chat Area */}
      <div className="flex-1 bg-gradient-card border border-border rounded-lg shadow-card flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h1 className="text-xl font-semibold text-foreground">
                  {userGroup.name}
                </h1>
              </div>
              <Badge variant="secondary">
                {userGroup.memberCount} members
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleVideoCall}>
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleVoiceCall}>
                <Volume2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleScheduleMeeting}>
                <Plus className="w-4 h-4 mr-1" />
                Schedule Meeting
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {userGroup.description}
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
                placeholder={`Message ${userGroup.name}...`}
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
                  <Button variant="ghost" size="sm" onClick={handleAttachFile}>
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleAddEmoji}>
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

      {/* Right Sidebar - Group Members */}
      <div className="w-64 bg-gradient-card border border-border rounded-lg shadow-card">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Group Members</h3>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1494790108755-2616b5c6e3d8?w=32&h=32&fit=crop&crop=face"
                alt="Sarah Chen"
                className="w-8 h-8 rounded-full border border-border"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border border-background" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                Sarah Chen
              </p>
              <p className="text-xs text-muted-foreground">
                Mentor
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
                alt="Alex Rivera"
                className="w-8 h-8 rounded-full border border-border"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border border-background" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                Alex Rivera
              </p>
              <p className="text-xs text-muted-foreground">
                Mentee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}