import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Star, Key, Shield, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<'participant' | 'admin'>('participant');
  const { loginWithEmailCode, adminLogin } = useAuth();
  const { toast } = useToast();

  const handleParticipantLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await loginWithEmailCode(email, accessCode);
    } catch (error) {
      toast({
        title: "Access Denied",
        description: "Invalid email or access code. Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await adminLogin(adminPassword);
    } catch (error) {
      toast({
        title: "Invalid Admin Password", 
        description: "Please check your password and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Welcome Section */}
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Torc Mentorship</h1>
                <p className="text-sm text-muted-foreground">Career Development Platform</p>
              </div>
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Welcome to Your
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Career Journey</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              Join a supportive community of mentors and mentees focused on meaningful career growth in tech.
            </p>
          </div>

          {/* Private Access Notice */}
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-card border border-border">
              <div className="flex items-start gap-3">
                <Key className="w-5 h-5 text-primary mt-1" />
                <div>
                  <p className="font-medium text-foreground">Authorized Access Only</p>
                  <p className="text-sm text-muted-foreground">
                    Access credentials have been sent to approved participants via email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="text-center">
            <div className="flex justify-center gap-2 mb-4">
              <Button
                variant={loginType === 'participant' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLoginType('participant')}
              >
                Participant
              </Button>
              <Button
                variant={loginType === 'admin' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLoginType('admin')}
              >
                Admin
              </Button>
            </div>
            <CardTitle className="text-2xl">
              {loginType === 'participant' ? 'Join Program' : 'Admin Access'}
            </CardTitle>
            <CardDescription>
              Enter your email and access code to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loginType === 'participant' ? (
              <form onSubmit={handleParticipantLogin} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="accessCode">Access Code</Label>
                    <div className="relative mt-1">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="accessCode"
                        type="text"
                        placeholder="mentor or mentee2025"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary text-primary-foreground shadow-glow" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Verifying...
                    </div>
                  ) : (
                    'Continue'
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div>
                  <Label htmlFor="adminPassword">Admin Password</Label>
                  <div className="relative mt-1">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="adminPassword"
                      type="password"
                      placeholder="Enter admin password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-accent text-accent-foreground shadow-glow" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </div>
                  ) : (
                    'Admin Sign In'
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}