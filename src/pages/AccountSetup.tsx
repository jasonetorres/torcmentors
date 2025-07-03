import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, User, Lock, Mail, Camera, Upload } from 'lucide-react';
import { useAuth } from '@/hooks/useSupabaseAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function AccountSetup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    linkedinUrl: '',
    githubUrl: '',
    discordUsername: '',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face'
  });
  
  const avatarOptions = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=80&h=80&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=80&h=80&fit=crop&crop=face'
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const { updateProfile, user, profile } = useAuth();
  const { toast } = useToast();

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file.",
        variant: "destructive"
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadingAvatar(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      handleInputChange('avatar', data.publicUrl);
      
      toast({
        title: "Avatar Uploaded",
        description: "Your profile picture has been uploaded successfully.",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload your profile picture. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      await updateProfile({
        display_name: `${formData.firstName} ${formData.lastName}`,
        bio: formData.bio,
        linkedin_url: formData.linkedinUrl,
        github_url: formData.githubUrl,
        discord_username: formData.discordUsername,
        avatar_url: formData.avatar,
        is_onboarding_complete: true,
        onboarding_step: 'completed'
      });
      
      toast({
        title: "Account Setup Complete",
        description: "Welcome to the Torc Mentorship Program!",
      });
    } catch (error) {
      toast({
        title: "Setup Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader className="text-center">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <Star className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Torc Mentorship</h1>
                <p className="text-sm text-muted-foreground">Account Setup</p>
              </div>
            </div>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              Welcome! You're joining as a <span className="font-medium text-primary">{profile?.role || 'member'}</span>. 
              Please fill in your details to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ''}
                      className="pl-10 bg-secondary"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">This is your registered email address</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative mt-1">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="At least 8 characters"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
                
                {/* Profile Picture Selection */}
                <div>
                  <Label>Profile Picture</Label>
                  <div className="mt-2 space-y-3">
                    <div className="flex justify-center">
                      <Avatar className="w-20 h-20 border-4 border-primary/20">
                        <AvatarImage src={formData.avatar} alt="Selected avatar" />
                        <AvatarFallback>
                          <Camera className="w-8 h-8 text-muted-foreground" />
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {avatarOptions.map((avatarUrl, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleInputChange('avatar', avatarUrl)}
                          className={`p-1 rounded-lg border-2 transition-all hover:scale-105 ${
                            formData.avatar === avatarUrl 
                              ? 'border-primary shadow-glow' 
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={avatarUrl} alt={`Avatar option ${index + 1}`} />
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                        </button>
                      ))}
                    </div>

                    {/* Upload Custom Avatar */}
                    <div className="mt-4">
                      <Label className="text-sm font-medium">Or upload your own:</Label>
                      <div className="mt-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full relative"
                          disabled={uploadingAvatar}
                        >
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={uploadingAvatar}
                          />
                          {uploadingAvatar ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                              Uploading...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Upload className="w-4 h-4" />
                              Upload Image
                            </div>
                          )}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">
                          Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself, your background, and your goals..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="linkedinUrl">LinkedIn Profile (Optional)</Label>
                  <Input
                    id="linkedinUrl"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={formData.linkedinUrl}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="githubUrl">GitHub Profile (Optional)</Label>
                  <Input
                    id="githubUrl"
                    type="url"
                    placeholder="https://github.com/yourusername"
                    value={formData.githubUrl}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="discordUsername">Discord Username (Optional)</Label>
                  <Input
                    id="discordUsername"
                    type="text"
                    placeholder="username#1234"
                    value={formData.discordUsername}
                    onChange={(e) => handleInputChange('discordUsername', e.target.value)}
                    className="mt-1"
                  />
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
                    Setting up account...
                  </div>
                ) : (
                  'Complete Setup'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}