import { useState } from 'react';
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
import { mockUsers, mockGroups } from '@/data/mockData';
import { User, Group } from '@/types';
import { UserRole } from '@/types';
import { useToast } from '@/hooks/use-toast';

export default function MenteeManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentee, setSelectedMentee] = useState<string>('');
  const [targetGroup, setTargetGroup] = useState<string>('');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const { toast } = useToast();

  const [users] = useState<User[]>([]);
  const [groups] = useState<Group[]>([]);

  // Get all mentees and their current group assignments
  const mentees = users.filter(user => user.role === 'mentee');
  const unassignedMentees = mentees.filter(mentee => !mentee.groupId);
  const assignedMentees = mentees.filter(mentee => mentee.groupId);

  const filteredMentees = mentees.filter(mentee =>
    mentee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentee.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGroupName = (groupId: string) => {
    return groups.find(g => g.id === groupId)?.name || 'Unknown Group';
  };

  const getMentorName = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return 'Unknown Mentor';
    return users.find(u => u.id === group.mentorId)?.name || 'Unknown Mentor';
  };

  const handleAssignMentee = () => {
    if (!selectedMentee || !targetGroup) return;
    
    // In real app, would make API call
    toast({
      title: "Mentee Assigned",
      description: `Successfully assigned mentee to ${getGroupName(targetGroup)}`,
    });
    
    setIsAssignDialogOpen(false);
    setSelectedMentee('');
    setTargetGroup('');
  };

  const handleRemoveFromGroup = (menteeId: string) => {
    // In real app, would make API call
    toast({
      title: "Mentee Removed",
      description: "Mentee has been removed from their group",
    });
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
                        {mentee.name} - {mentee.email}
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
                        {group.name} - {getMentorName(group.id)}
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
        {filteredMentees.map((mentee) => (
          <Card key={mentee.id} className="bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={mentee.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face'}
                    alt={mentee.name}
                    className="w-12 h-12 rounded-full border-2 border-border"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-foreground">{mentee.name}</h3>
                      <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                        Mentee
                      </Badge>
                      {mentee.groupId ? (
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
                    
                    {mentee.groupId && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-muted-foreground">Group:</span>
                        <span className="font-medium text-foreground">{getGroupName(mentee.groupId)}</span>
                        <ArrowRight className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Mentor:</span>
                        <span className="font-medium text-foreground">{getMentorName(mentee.groupId)}</span>
                      </div>
                    )}
                    
                    {mentee.bio && (
                      <p className="text-sm text-muted-foreground mt-2">{mentee.bio}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {mentee.groupId ? (
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
        ))}
      </div>
    </div>
  );
}