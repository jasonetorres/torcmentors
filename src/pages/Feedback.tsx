import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Plus, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useSupabaseAuth';

export default function Feedback() {
  const { user, profile } = useAuth();
  const [newFeedback, setNewFeedback] = useState('');
  const [rating, setRating] = useState(0);

  const feedbackItems = [
    {
      id: 1,
      type: 'received',
      from: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      message: 'Excellent mentoring session! Really helped me understand React hooks better.',
      date: '2024-01-15',
      status: 'new'
    },
    {
      id: 2,
      type: 'given',
      to: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=40&h=40&fit=crop&crop=face',
      rating: 4,
      message: 'Great progress on the project! Keep up the momentum with daily coding practice.',
      date: '2024-01-12',
      status: 'sent'
    },
    {
      id: 3,
      type: 'received',
      from: 'Program Admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      rating: 5,
      message: 'Thank you for being such an engaged mentor. Your mentees appreciate your guidance.',
      date: '2024-01-10',
      status: 'read'
    }
  ];

  const handleSubmitFeedback = () => {
    if (newFeedback.trim() && rating > 0) {
      // Here you would typically submit the feedback
      console.log('Submitting feedback:', { message: newFeedback, rating });
      setNewFeedback('');
      setRating(0);
    }
  };

  const renderStars = (currentRating: number, interactive = false) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < currentRating 
            ? 'fill-primary text-primary' 
            : 'text-muted-foreground'
        } ${interactive ? 'cursor-pointer hover:text-primary' : ''}`}
        onClick={interactive ? () => setRating(index + 1) : undefined}
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-primary text-primary-foreground';
      case 'sent': return 'bg-accent text-accent-foreground';
      case 'read': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <MessageSquare className="w-3 h-3" />;
      case 'sent': return <Clock className="w-3 h-3" />;
      case 'read': return <CheckCircle className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Feedback</h1>
          <p className="text-muted-foreground">Give and receive feedback to improve your mentoring experience</p>
        </div>

        {/* Feedback Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">4.8</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent/20 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">Total Feedback</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <p className="text-sm text-muted-foreground">Pending Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Give Feedback */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Give Feedback
            </CardTitle>
            <CardDescription>
              Share your thoughts about recent mentoring sessions or interactions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Rating
              </label>
              <div className="flex gap-1">
                {renderStars(rating, true)}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Message
              </label>
              <Textarea
                placeholder="Share your feedback here..."
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                rows={3}
              />
            </div>
            
            <Button 
              onClick={handleSubmitFeedback}
              className="bg-gradient-primary text-primary-foreground shadow-glow"
              disabled={!newFeedback.trim() || rating === 0}
            >
              Submit Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Feedback History */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Feedback History</CardTitle>
            <CardDescription>
              Recent feedback you've given and received
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={item.avatar} alt={item.from || item.to} />
                    <AvatarFallback>
                      {(item.from || item.to || 'U')[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">
                          {item.type === 'received' ? `From: ${item.from}` : `To: ${item.to}`}
                        </span>
                        <Badge className={getStatusColor(item.status)}>
                          {getStatusIcon(item.status)}
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {renderStars(item.rating)}
                        </div>
                        <span className="text-sm text-muted-foreground">{item.date}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground">{item.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}