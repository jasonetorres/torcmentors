import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
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
  AlertCircle,
  Edit,
  Trash2
} from 'lucide-react';
import { UserRole } from '@/types';

interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  bio: string;
  isOnboardingComplete: boolean;
  lastActive: Date;
  experience: string;
  createdAt: Date;
}

export default function UsersPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | UserRole>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [users, setUsers] = useState<AppUser[]>([
    {
      id: 'user-1',
      name: 'Sarah Chen',
      email: 'sarah.chen@example.com',
      role: 'mentor',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5c6e3d8?w=48&h=48&fit=crop&crop=face',
      bio: 'Senior Software Engineer with 8 years of experience',
      isOnboardingComplete: true,
      lastActive: new Date(),
      experience: 'Senior Level',
      createdAt: new Date('2025-01-01')
    },
    {
      id: 'user-2',
      name: 'Alex Rivera',
      email: 'alex.rivera@example.com',
      role: 'mentee',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face',
      bio: 'Career changer from marketing to tech',
      isOnboardingComplete: true,
      lastActive: new Date(),
      experience: 'Entry Level',
      createdAt: new Date('2025-01-05')
    },
    {
      id: 'user-3',
      name: 'Emma Thompson',
      email: 'emma.thompson@example.com',
      role: 'mentee',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face',
      bio: 'Recent bootcamp graduate',
      isOnboardingComplete: false,
      lastActive: new Date(Date.now() - 86400000),
      experience: 'Beginner',
      createdAt: new Date('2025-01-10')
    }
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'mentee' as UserRole,
    bio: ''
  });

  const handleCreateUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const user: AppUser = {
      id: `user-${Date.now()}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
      bio: newUser.bio,
      isOnboardingComplete: false,
      lastActive: new Date(),
      experience: newUser.role === 'mentor' ? 'Senior Level' : 'Entry Level',
      createdAt: new Date()
    };

    setUsers([...users, user]);
    setNewUser({
      name: '',
      email: '',
      role: 'mentee',
      bio: ''
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "User Created",
      description: "New user has been added successfully.",
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "User has been removed successfully.",
    });
  };

  const stats = [
    { title: "Total Users", value: users.length.toString(), change: "+8 this month", icon: Users, color: "text-primary" },
    { title: "Active Mentors", value: users.filter(u => u.role === 'mentor').length.toString(), change: "100% online", icon: GraduationCap, color: "text-success" },
    { title: "Learning Mentees", value: users.filter(u => u.role === 'mentee').length.toString(), change: "+8 this month", icon: Star, color: "text-accent" },
    { title: "Pending Onboarding", value: users.filter(u => !u.isOnboardingComplete).length.toString(), change: "-2 this week", icon: Clock, color: "text-warning" }
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

  const filteredUsers = users.filter(user => {
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
            Manage mentors, mentees, and user accounts
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account for mentor or mentee
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="userName">Full Name</Label>
                <Input 
                  id="userName" 
                  placeholder="e.g., John Doe"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="userEmail">Email Address</Label>
                <Input 
                  id="userEmail" 
                  type="email"
                  placeholder="john.doe@example.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="userRole">Role</Label>
                <Select value={newUser.role} onValueChange={(value: UserRole) => setNewUser({...newUser, role: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mentor">Mentor</SelectItem>
                    <SelectItem value="mentee">Mentee</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="userBio">Bio (Optional)</Label>
                <Input 
                  id="userBio" 
                  placeholder="Brief description..."
                  value={newUser.bio}
                  onChange={(e) => setNewUser({...newUser, bio: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-primary" onClick={handleCreateUser}>
                  Add User
                </Button>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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

      {/* Search and Filter */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedRole} onValueChange={(value: 'all' | UserRole) => setSelectedRole(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="mentee">Mentee</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={user.avatar}
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
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-destructive hover:bg-destructive/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* User Import Section */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle>Bulk User Management</CardTitle>
          <CardDescription>Import multiple users or manage in bulk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button variant="outline">
              <UserPlus className="w-4 h-4 mr-2" />
              Import from CSV
            </Button>
            <Button variant="outline">
              <Shield className="w-4 h-4 mr-2" />
              Bulk Role Update
            </Button>
            <Button variant="outline">
              <Mail className="w-4 h-4 mr-2" />
              Send Invitations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}