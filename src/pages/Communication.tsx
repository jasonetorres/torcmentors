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
  const [messages, setMessages] = useState<Message[]>([]);
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: 'general',
      name: 'General',
      description: 'Main discussion channel',
      type: 'general',
      memberCount: 0,
      unreadCount: 0
    }
  ]);

  const handleCreateChannel = () => {
    toast({
      title: "Create Channel",
      description: "Channel creation feature will be implemented soon",
    });
  };

  const handleVideoCall = () => {
    toast({
      title: "Video Call",
      description: "Starting video call feature...",
    });
  };

  const handleVoiceCall = () => {
    toast({
      title: "Voice Call", 
      description: "Starting voice call feature...",
    });
  };

  const handleMoreOptions = () => {
    toast({
      title: "Channel Options",
      description: "Channel settings and options",
    });
  };

  const handleAttachFile = () => {
    toast({
      title: "Attach File",
      description: "File attachment feature coming soon",
    });
  };

  const handleAddEmoji = () => {
    toast({
      title: "Add Emoji",
      description: "Emoji picker coming soon",
    });
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
            group_name: getCurrentChannel().name
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

  const getCurrentChannel = () => {
    return channels.find(c => c.id === selectedChannel) || channels[0];
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-6">
      {/* Sidebar - Channels */}
      <div className="w-full lg:w-80 bg-gradient-card border border-border rounded-lg shadow-card">
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
              <Button variant="outline" size="sm" onClick={handleVideoCall}>
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleVoiceCall}>
                <Volume2 className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleMoreOptions}>
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

      {/* Right Sidebar - Online Members - Hidden on mobile */}
      <div className="hidden lg:block w-64 bg-gradient-card border border-border rounded-lg shadow-card">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Group Members</h3>
          <p className="text-xs text-muted-foreground mt-1">Members will appear when you join a group</p>
        </div>
        <div className="p-4 text-center">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No active members</p>
        </div>
      </div>
    </div>
  );
}