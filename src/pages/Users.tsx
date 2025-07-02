import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  UserPlus, 
  Search,
  Mail,
  Calendar,
  MoreVertical,
  Shield,
  GraduationCap,
  Star,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { mockUsers } from '@/data/mockData';
import { UserRole } from '@/types';

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | UserRole>('all');

  // Mock additional users
  const allUsers = [
    ...mockUsers,
    {
      id: '4',
      name: 'Emily Johnson',
      email: 'emily.johnson@email.com',
      role: 'mentor' as UserRole,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
      groupId: 'group-2',
      createdAt: new Date('2025-01-04'),
      lastActive: new Date(),
      onboardingStep: 'completed' as const,
      isOnboardingComplete: true,
      bio: 'Backend architect with expertise in microservices',
      skills: ['Node.js', 'Python', 'AWS', 'Docker'],
      experience: '8+ years'
    },
    {
      id: '5',
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      role: 'mentee' as UserRole,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
      groupId: 'group-1',
      createdAt: new Date('2025-01-06'),
      lastActive: new Date(),
      onboardingStep: 'profile-setup' as const,
      isOnboardingComplete: false,
      bio: 'Switching from finance to software development',
      skills: ['Python', 'SQL'],
      experience: '6 months'
    }
  ];

  const stats = [
    { title: "Total Users", value: "52", change: "+8 this month", icon: Users, color: "text-primary" },
    { title: "Active Mentors", value: "10", change: "100% online", icon: GraduationCap, color: "text-success" },
    { title: "Learning Mentees", value: "42", change: "+8 this month", icon: Star, color: "text-accent" },
    { title: "Pending Onboarding", value: "5", change: "-2 this week", icon: Clock, color: "text-warning" }
  ];

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-primary/20 text-primary border-primary/30';
      case 'mentor': return 'bg-accent/20 text-accent border-accent/30';
      case 'mentee': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getOnboardingColor = (isComplete: boolean) => {
    return isComplete 
      ? 'bg-success/20 text-success border-success/30'
      : 'bg-warning/20 text-warning border-warning/30';
  };

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage mentors, mentees, and track onboarding progress
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Send Invites
          </Button>
          <Button className="bg-gradient-primary">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className={`text-xs ${stat.color} mt-1`}>
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-secondary ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'admin', 'mentor', 'mentee'] as const).map((role) => (
                <Button
                  key={role}
                  variant={selectedRole === role ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRole(role)}
                  className={selectedRole === role ? "bg-gradient-primary" : ""}
                >
                  {role === 'all' ? 'All' : role.charAt(0).toUpperCase() + role.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-secondary">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="bg-gradient-card border-border shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={user.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face`}
                          alt={user.name}
                          className="w-12 h-12 rounded-full border-2 border-border"
                        />
                        {user.lastActive && new Date(user.lastActive).getTime() > Date.now() - 24 * 60 * 60 * 1000 && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-foreground">{user.name}</h3>
                          <Badge variant="secondary" className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                          <Badge variant="outline" className={getOnboardingColor(user.isOnboardingComplete)}>
                            {user.isOnboardingComplete ? (
                              <><CheckCircle className="w-3 h-3 mr-1" /> Complete</>
                            ) : (
                              <><AlertCircle className="w-3 h-3 mr-1" /> Pending</>
                            )}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                        
                        {user.bio && (
                          <p className="text-sm text-muted-foreground mb-2">{user.bio}</p>
                        )}
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Joined {user.createdAt.toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Last active {user.lastActive.toLocaleDateString()}
                          </div>
                          {user.experience && (
                            <div>Experience: {user.experience}</div>
                          )}
                        </div>
                        
                        {user.skills && user.skills.length > 0 && (
                          <div className="flex gap-1 mt-2">
                            {user.skills.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {user.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{user.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="text-center py-12">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Active Users</h3>
            <p className="text-muted-foreground">
              Users who have been active in the last 7 days will appear here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {filteredUsers.filter(u => !u.isOnboardingComplete).map((user) => (
              <Card key={user.id} className="bg-gradient-card border-border shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face`}
                        alt={user.name}
                        className="w-10 h-10 rounded-full border-2 border-border"
                      />
                      <div>
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-warning text-warning">
                        {user.onboardingStep}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Inactive Users</h3>
            <p className="text-muted-foreground">
              All users are currently active in the program.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}