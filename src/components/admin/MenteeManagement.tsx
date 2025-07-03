import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Users, 
  UserPlus, 
  Search,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  UserMinus
} from 'lucide-react';

import { UserRole } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AppUser {
  id: string;
  user_id: string;
  display_name: string;
  email?: string;
  role: UserRole;
  avatar_url: string | null;
  bio: string | null;
  group_id: string | null;
  is_onboarding_complete: boolean;
  created_at: string;
  updated_at: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  phase: string;
  status: string;
  mentor_id: string | null;
  max_size: number;
  schedule: string | null;
  created_at: string;
  updated_at: string;
}

export default function MenteeManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentee, setSelectedMentee] = useState<string>('');
  const [targetGroup, setTargetGroup] = useState<string>('');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch users and groups from Supabase
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch users with emails
      const { data: userData, error: userError } = await supabase.functions.invoke('get-users-with-emails');

      if (userError) {
        console.error('Error fetching users:', userError);
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive"
        });
      } else if (userData?.success) {
        setUsers(userData.users as AppUser[]);
      }
      
      // Fetch groups
      const { data: groupData, error: groupError } = await supabase
        .from('groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (groupError) {
        console.error('Error fetching groups:', groupError);
        toast({
          title: "Error",
          description: "Failed to fetch groups",
          variant: "destructive"
        });
      } else {
        setGroups(groupData || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get all mentees and their current group assignments
  const mentees = users.filter(user => user.role === 'mentee');
  const unassignedMentees = mentees.filter(mentee => !mentee.group_id);
  const assignedMentees = mentees.filter(mentee => mentee.group_id);

  const filteredMentees = mentees.filter(mentee =>
    (mentee.display_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (mentee.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGroupName = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    return group ? group.name : `Group ${groupId}`;
  };

  const getMentorName = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group || !group.mentor_id) return 'Mentor TBD';
    
    const mentor = users.find(u => u.user_id === group.mentor_id);
    return mentor ? mentor.display_name : 'Mentor TBD';
  };

  const handleAssignMentee = async () => {
    if (!selectedMentee || !targetGroup) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ group_id: targetGroup })
        .eq('id', selectedMentee);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to assign mentee to group",
          variant: "destructive"
        });
        console.error('Error assigning mentee:', error);
      } else {
        toast({
          title: "Mentee Assigned",
          description: `Successfully assigned mentee to ${getGroupName(targetGroup)}`,
        });
        
        // Refresh data after assignment
        await fetchData();
      }
    } catch (error) {
      console.error('Error assigning mentee:', error);
    }
    
    setIsAssignDialogOpen(false);
    setSelectedMentee('');
    setTargetGroup('');
  };

  const handleRemoveFromGroup = async (menteeId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ group_id: null })
        .eq('id', menteeId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to remove mentee from group",
          variant: "destructive"
        });
        console.error('Error removing mentee from group:', error);
      } else {
        toast({
          title: "Mentee Removed",
          description: "Mentee has been removed from their group",
        });
        
        // Refresh data after removal
        await fetchData();
      }
    } catch (error) {
      console.error('Error removing mentee from group:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Mentee Management</h2>
          <p className="text-muted-foreground mt-1">
            Assign mentees to groups and manage group memberships
          </p>
        </div>
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              Assign Mentee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Mentee to Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Mentee</label>
                <Select value={selectedMentee} onValueChange={setSelectedMentee}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a mentee" />
                  </SelectTrigger>
                  <SelectContent>
                    {unassignedMentees.map((mentee) => (
                      <SelectItem key={mentee.id} value={mentee.id}>
                        {mentee.display_name} - {mentee.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Target Group</label>
                <Select value={targetGroup} onValueChange={setTargetGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a group" />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAssignDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAssignMentee}
                  disabled={!selectedMentee || !targetGroup}
                  className="bg-gradient-primary"
                >
                  Assign Mentee
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Mentees</p>
                <p className="text-2xl font-bold text-foreground">{mentees.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/20 text-primary">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assigned</p>
                <p className="text-2xl font-bold text-foreground">{assignedMentees.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-success/20 text-success">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unassigned</p>
                <p className="text-2xl font-bold text-foreground">{unassignedMentees.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-warning/20 text-warning">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search mentees by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Mentees List */}
      <div className="grid gap-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Loading mentees...</p>
          </div>
        ) : filteredMentees.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No Mentees Found</p>
            <p className="text-muted-foreground">
              {searchQuery ? 'Try adjusting your search query' : 'No mentees have been added yet'}
            </p>
          </div>
        ) : (
          filteredMentees.map((mentee) => (
            <Card key={mentee.id} className="bg-gradient-card border-border shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={mentee.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'}
                      alt={mentee.display_name || 'User'}
                      className="w-12 h-12 rounded-full border-2 border-border"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground">{mentee.display_name || 'Unnamed User'}</h3>
                        <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                          Mentee
                        </Badge>
                        {mentee.group_id ? (
                          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Assigned
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-warning/20 text-warning border-warning/30">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Unassigned
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{mentee.email}</p>
                      
                      {mentee.group_id && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">Group:</span>
                          <span className="font-medium text-foreground">{getGroupName(mentee.group_id)}</span>
                          <ArrowRight className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Mentor:</span>
                          <span className="font-medium text-foreground">{getMentorName(mentee.group_id)}</span>
                        </div>
                      )}
                      
                      {mentee.bio && (
                        <p className="text-sm text-muted-foreground mt-2">{mentee.bio}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {mentee.group_id ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRemoveFromGroup(mentee.id)}
                      >
                        <UserMinus className="w-4 h-4 mr-2" />
                        Remove from Group
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="bg-gradient-primary"
                        onClick={() => {
                          setSelectedMentee(mentee.id);
                          setIsAssignDialogOpen(true);
                        }}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Assign to Group
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}