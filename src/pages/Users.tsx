import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
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
  user_id: string;
  display_name: string;
  email?: string;
  role: UserRole;
  avatar_url: string | null;
  bio: string | null;
  is_onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
  experience: string | null;
  skills: string[] | null;
  linkedin_url: string | null;
  github_url: string | null;
  discord_username: string | null;
}

export default function UsersPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<'all' | UserRole>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'mentee' as UserRole,
    bio: ''
  });

  // Fetch users from Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*');

        if (error) {
          console.error('Error fetching users:', error);
          toast({
            title: "Error",
            description: "Failed to fetch users",
            variant: "destructive"
          });
        } else {
          // For now, we'll show users without emails since we can't access auth.admin from client
          // The emails would need to be fetched server-side or stored in profiles
          const usersWithPlaceholderEmails = (data || []).map(profile => ({
            ...profile,
            email: 'Email not available (requires server-side access)'
          }));
          setUsers(usersWithPlaceholderEmails as AppUser[]);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
      user_id: `user-${Date.now()}`,
      display_name: newUser.name,
      role: newUser.role,
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
      bio: newUser.bio,
      is_onboarding_complete: false,
      experience: newUser.role === 'mentor' ? 'Senior Level' : 'Entry Level',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      skills: null,
      linkedin_url: null,
      github_url: null,
      discord_username: null
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
    { title: "Total Users", value: users.length.toString(), change: "", icon: Users, color: "text-primary" },
    { title: "Active Mentors", value: users.filter(u => u.role === 'mentor').length.toString(), change: "", icon: GraduationCap, color: "text-success" },
    { title: "Learning Mentees", value: users.filter(u => u.role === 'mentee').length.toString(), change: "", icon: Star, color: "text-accent" },
    { title: "Pending Onboarding", value: users.filter(u => !u.is_onboarding_complete).length.toString(), change: "", icon: Clock, color: "text-warning" }
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
    const matchesSearch = (user.display_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (user.user_id || '').toLowerCase().includes(searchQuery.toLowerCase());
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
        
        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription>
                Update user information and role
              </DialogDescription>
            </DialogHeader>
            {editingUser && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="editUserName">Full Name</Label>
                  <Input 
                    id="editUserName" 
                    value={editingUser.display_name || ''}
                    onChange={(e) => setEditingUser({...editingUser, display_name: e.target.value})}
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input 
                    value={editingUser.email || ''}
                    disabled
                    className="bg-muted"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>
                <div>
                  <Label htmlFor="editUserRole">Role</Label>
                  <Select value={editingUser.role} onValueChange={(value: UserRole) => setEditingUser({...editingUser, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mentor">Mentor</SelectItem>
                      <SelectItem value="mentee">Mentee</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="editUserBio">Bio</Label>
                  <Input 
                    id="editUserBio" 
                    value={editingUser.bio || ''}
                    onChange={(e) => setEditingUser({...editingUser, bio: e.target.value})}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1 bg-gradient-primary" 
                    onClick={async () => {
                      try {
                        const { error } = await supabase
                          .from('profiles')
                          .update({
                            display_name: editingUser.display_name,
                            role: editingUser.role,
                            bio: editingUser.bio
                          })
                          .eq('user_id', editingUser.user_id);

                        if (error) {
                          toast({
                            title: "Error",
                            description: "Failed to update user",
                            variant: "destructive"
                          });
                        } else {
                          setUsers(users.map(u => u.user_id === editingUser.user_id ? editingUser : u));
                          setIsEditDialogOpen(false);
                          toast({
                            title: "Success",
                            description: "User updated successfully"
                          });
                        }
                      } catch (error) {
                        console.error('Error updating user:', error);
                      }
                    }}
                  >
                    Save Changes
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
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
      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      ) : (
      <div className="grid gap-6">
        {filteredUsers.length === 0 ? (
          <Card className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-8 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedRole !== 'all' 
                  ? 'Try adjusting your search filters' 
                  : 'Get started by creating your first user'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredUsers.map((user) => (
          <Card key={user.id} className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={user.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'}
                    alt={user.display_name || 'User'}
                    className="w-12 h-12 rounded-full border-2 border-border"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground">{user.display_name || 'Unnamed User'}</h3>
                    <Badge variant="secondary" className={getRoleColor(user.role)}>
                      {user.role}
                    </Badge>
                    <Badge variant="outline" className={getOnboardingColor(user.is_onboarding_complete)}>
                      {user.is_onboarding_complete ? (
                        <><CheckCircle className="w-3 h-3 mr-1" /> Complete</>
                      ) : (
                        <><AlertCircle className="w-3 h-3 mr-1" /> Pending</>
                      )}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Mail className="w-3 h-3" />
                    <span>{user.email}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{user.user_id}</p>
                  
                  {user.bio && (
                    <p className="text-sm text-muted-foreground mb-2">{user.bio}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Joined {new Date(user.created_at).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Updated {new Date(user.updated_at).toLocaleDateString()}
                    </div>
                    {user.experience && (
                      <div>Experience: {user.experience}</div>
                    )}
                    {user.skills && user.skills.length > 0 && (
                      <div>Skills: {user.skills.slice(0, 2).join(', ')}{user.skills.length > 2 ? '...' : ''}</div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setEditingUser(user);
                      setIsEditDialogOpen(true);
                    }}
                  >
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
          ))
        )}
      </div>
      )}

      {/* User Import Section */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle>Bulk User Management</CardTitle>
          <CardDescription>Import multiple users or manage in bulk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Import", description: "CSV import functionality coming soon." })}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Import from CSV
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Bulk Update", description: "Bulk role update functionality coming soon." })}
            >
              <Shield className="w-4 h-4 mr-2" />
              Bulk Role Update
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Invitations", description: "Send invitations functionality coming soon." })}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send Invitations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}