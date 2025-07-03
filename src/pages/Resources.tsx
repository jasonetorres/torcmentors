import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  FileText, 
  Video,
  Link as LinkIcon,
  Download,
  Search,
  Filter,
  Star,
  Clock,
  Eye,
  Plus,
  Edit,
  Trash2,
  Upload,
  Calendar
} from 'lucide-react';
import { ProgramPhase } from '@/types';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'template';
  phase: ProgramPhase;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  estimatedReadTime?: number;
  url?: string;
}

export default function Resources() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<ProgramPhase | 'all'>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 'resource-1',
      title: 'SMART Goal Setting Framework',
      description: 'Complete guide for setting and tracking SMART goals with templates and examples',
      type: 'document',
      phase: 'phase1',
      category: 'Goal Setting',
      tags: ['goals', 'planning', 'framework'],
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
      isPublic: true,
      estimatedReadTime: 15,
      url: '/resources/smart-goals.pdf'
    },
    {
      id: 'resource-3',
      title: 'Effective Communication in Tech',
      description: 'Slide deck outline for leading discussions on communication and feedback',
      type: 'document',
      phase: 'phase2',
      category: 'Communication',
      tags: ['communication', 'feedback', 'soft-skills'],
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
      isPublic: false,
      estimatedReadTime: 20
    },
    {
      id: 'resource-4',
      title: 'Career Path Reflector Worksheet',
      description: 'Guided worksheet to help mentees explore different career paths and opportunities',
      type: 'template',
      phase: 'phase2',
      category: 'Career Development',
      tags: ['career', 'worksheet', 'reflection'],
      createdAt: new Date('2025-01-03'),
      updatedAt: new Date('2025-01-03'),
      isPublic: true,
      estimatedReadTime: 45
    }
  ]);

  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    type: 'document' as Resource['type'],
    phase: 'phase1' as ProgramPhase,
    category: '',
    tags: '',
    url: '',
    isPublic: true
  });

  const handleCreateResource = () => {
    if (!newResource.title.trim() || !newResource.description.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const resource: Resource = {
      id: `resource-${Date.now()}`,
      title: newResource.title,
      description: newResource.description,
      type: newResource.type,
      phase: newResource.phase,
      category: newResource.category,
      tags: newResource.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date(),
      updatedAt: new Date(),
      isPublic: newResource.isPublic,
      url: newResource.url || undefined,
      estimatedReadTime: Math.ceil(Math.random() * 60) + 10
    };

    setResources([...resources, resource]);
    setNewResource({
      title: '',
      description: '',
      type: 'document',
      phase: 'phase1',
      category: '',
      tags: '',
      url: '',
      isPublic: true
    });
    setIsCreateDialogOpen(false);

    toast({
      title: "Resource Created",
      description: "New resource has been added successfully.",
    });
  };

  const handleDeleteResource = (resourceId: string) => {
    setResources(resources.filter(resource => resource.id !== resourceId));
    toast({
      title: "Resource Deleted",
      description: "Resource has been removed successfully.",
    });
  };

  const handleViewResource = (resource: Resource) => {
    if (resource.url) {
      window.open(resource.url, '_blank');
    } else {
      toast({
        title: "Resource Available",
        description: `Opening ${resource.title}...`,
      });
    }
  };

  const handleEditResource = (resourceId: string) => {
    toast({
      title: "Edit Resource",
      description: "Resource editing functionality coming soon.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'video': return Video;
      case 'link': return LinkIcon;
      case 'template': return BookOpen;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-primary/20 text-primary border-primary/30';
      case 'video': return 'bg-accent/20 text-accent border-accent/30';
      case 'link': return 'bg-success/20 text-success border-success/30';
      case 'template': return 'bg-warning/20 text-warning border-warning/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'phase1': return 'bg-primary/20 text-primary border-primary/30';
      case 'phase2': return 'bg-accent/20 text-accent border-accent/30';
      case 'phase3': return 'bg-warning/20 text-warning border-warning/30';
      case 'phase4': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPhase = selectedPhase === 'all' || resource.phase === selectedPhase;
    return matchesSearch && matchesPhase;
  });

  const stats = [
    { title: "Total Resources", value: resources.length.toString(), change: "+5 this month", icon: BookOpen, color: "text-primary" },
    { title: "Public Resources", value: resources.filter(r => r.isPublic).length.toString(), change: "accessible to all", icon: Eye, color: "text-success" },
    { title: "Video Content", value: resources.filter(r => r.type === 'video').length.toString(), change: "hours of content", icon: Video, color: "text-accent" },
    { title: "Categories", value: new Set(resources.map(r => r.category)).size.toString(), change: "organized topics", icon: Filter, color: "text-warning" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resource Library</h1>
          <p className="text-muted-foreground mt-2">
            Manage learning materials, guides, and tools for mentorship program
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Resource</DialogTitle>
              <DialogDescription>
                Create a new learning resource for the mentorship program
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="resourceTitle">Resource Title</Label>
                <Input 
                  id="resourceTitle" 
                  placeholder="e.g., React Best Practices Guide"
                  value={newResource.title}
                  onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="resourceDescription">Description</Label>
                <Textarea 
                  id="resourceDescription" 
                  placeholder="Describe what this resource covers..."
                  value={newResource.description}
                  onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="resourceType">Type</Label>
                  <Select value={newResource.type} onValueChange={(value: Resource['type']) => setNewResource({...newResource, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="template">Template</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="resourcePhase">Phase</Label>
                  <Select value={newResource.phase} onValueChange={(value: ProgramPhase) => setNewResource({...newResource, phase: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="phase1">Phase 1</SelectItem>
                      <SelectItem value="phase2">Phase 2</SelectItem>
                      <SelectItem value="phase3">Phase 3</SelectItem>
                      <SelectItem value="phase4">Phase 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="resourceCategory">Category</Label>
                <Input 
                  id="resourceCategory" 
                  placeholder="e.g., Technical Skills"
                  value={newResource.category}
                  onChange={(e) => setNewResource({...newResource, category: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="resourceTags">Tags (comma-separated)</Label>
                <Input 
                  id="resourceTags" 
                  placeholder="e.g., react, javascript, frontend"
                  value={newResource.tags}
                  onChange={(e) => setNewResource({...newResource, tags: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="resourceUrl">URL (optional)</Label>
                <Input 
                  id="resourceUrl" 
                  placeholder="https://example.com/resource"
                  value={newResource.url}
                  onChange={(e) => setNewResource({...newResource, url: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-primary" onClick={handleCreateResource}>
                  Add Resource
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
                placeholder="Search resources by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedPhase} onValueChange={(value: ProgramPhase | 'all') => setSelectedPhase(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by phase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Phases</SelectItem>
                <SelectItem value="phase1">Phase 1</SelectItem>
                <SelectItem value="phase2">Phase 2</SelectItem>
                <SelectItem value="phase3">Phase 3</SelectItem>
                <SelectItem value="phase4">Phase 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resources List */}
      <div className="grid gap-6">
        {filteredResources.map((resource) => {
          const TypeIcon = getTypeIcon(resource.type);
          return (
            <Card key={resource.id} className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                      <TypeIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{resource.title}</CardTitle>
                      <CardDescription>{resource.category}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getPhaseColor(resource.phase)}>
                      {resource.phase}
                    </Badge>
                    <Badge variant="secondary" className={getTypeColor(resource.type)}>
                      {resource.type}
                    </Badge>
                    {resource.isPublic && (
                      <Badge variant="outline" className="border-success text-success">
                        Public
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{resource.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    {resource.estimatedReadTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {resource.estimatedReadTime} min
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {resource.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewResource(resource)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  {resource.url && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Open Link
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditResource(resource.id)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteResource(resource.id)}
                    className="text-destructive hover:bg-destructive/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bulk Actions */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle>Bulk Resource Management</CardTitle>
          <CardDescription>Import and manage resources in bulk</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Upload", description: "File upload functionality coming soon." })}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Import", description: "Library import functionality coming soon." })}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Import from Library
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast({ title: "Featured", description: "Featured resources functionality coming soon." })}
            >
              <Star className="w-4 h-4 mr-2" />
              Featured Resources
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}