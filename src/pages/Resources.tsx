import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Plus
} from 'lucide-react';
import { mockResources } from '@/data/mockData';
import { ProgramPhase } from '@/types';

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<ProgramPhase | 'all'>('all');

  // Mock additional resources
  const allResources = [
    ...mockResources,
    {
      id: 'resource-3',
      title: 'Effective Communication in Tech',
      description: 'Slide deck outline for leading discussions on communication and feedback',
      type: 'document' as const,
      phase: 'phase2' as ProgramPhase,
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
      type: 'template' as const,
      phase: 'phase2' as ProgramPhase,
      category: 'Career Development',
      tags: ['career', 'worksheet', 'reflection'],
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
      isPublic: true,
      estimatedReadTime: 25
    },
    {
      id: 'resource-5',
      title: 'System Design Challenge',
      description: 'Complex technical challenge for whiteboarding sessions with solution guide',
      type: 'case-study' as const,
      phase: 'phase3' as ProgramPhase,
      category: 'Technical Skills',
      tags: ['system-design', 'whiteboarding', 'technical'],
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
      isPublic: false,
      estimatedReadTime: 45
    },
    {
      id: 'resource-6',
      title: 'Introduction to Mentorship Guide',
      description: 'Welcome guide explaining the program structure and expectations',
      type: 'document' as const,
      phase: 'phase1' as ProgramPhase,
      category: 'Program Introduction',
      tags: ['intro', 'guide', 'overview'],
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
      isPublic: true,
      estimatedReadTime: 15
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return FileText;
      case 'document': return FileText;
      case 'link': return LinkIcon;
      case 'template': return FileText;
      case 'case-study': return BookOpen;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'document': return 'bg-primary/20 text-primary border-primary/30';
      case 'document': return 'bg-primary/20 text-primary border-primary/30';
      case 'link': return 'bg-success/20 text-success border-success/30';
      case 'template': return 'bg-warning/20 text-warning border-warning/30';
      case 'case-study': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getPhaseColor = (phase: ProgramPhase) => {
    switch (phase) {
      case 'phase1': return 'bg-primary/20 text-primary border-primary/30';
      case 'phase2': return 'bg-accent/20 text-accent border-accent/30';
      case 'phase3': return 'bg-warning/20 text-warning border-warning/30';
      case 'phase4': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPhase = selectedPhase === 'all' || resource.phase === selectedPhase;
    return matchesSearch && matchesPhase;
  });

  const resourcesByCategory = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, typeof allResources>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resource Library</h1>
          <p className="text-muted-foreground mt-2">
            Access mentoring materials, templates, and learning resources
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Resources", value: "156", icon: BookOpen, color: "text-primary" },
          { title: "Templates", value: "42", icon: FileText, color: "text-accent" },
          { title: "Documents", value: "28", icon: FileText, color: "text-success" },
          { title: "Case Studies", value: "15", icon: Star, color: "text-warning" }
        ].map((stat) => (
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
                placeholder="Search resources, templates, and guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedPhase === 'all' ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPhase('all')}
                className={selectedPhase === 'all' ? "bg-gradient-primary" : ""}
              >
                All Phases
              </Button>
              {(['phase1', 'phase2', 'phase3', 'phase4'] as ProgramPhase[]).map((phase) => (
                <Button
                  key={phase}
                  variant={selectedPhase === phase ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPhase(phase)}
                  className={selectedPhase === phase ? "bg-gradient-primary" : ""}
                >
                  {phase}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-secondary">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          {Object.entries(resourcesByCategory).map(([category, resources]) => (
            <div key={category} className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                {category}
                <Badge variant="secondary" className="ml-2">
                  {resources.length}
                </Badge>
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {resources.map((resource) => {
                  const IconComponent = getTypeIcon(resource.type);
                  return (
                    <Card key={resource.id} className="bg-gradient-card border-border shadow-card hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${getTypeColor(resource.type).split(' ')[0]}`}>
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge variant="outline" className={getPhaseColor(resource.phase)}>
                              {resource.phase}
                            </Badge>
                            <Badge variant="secondary" className={getTypeColor(resource.type)}>
                              {resource.type}
                            </Badge>
                          </div>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {resource.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{resource.estimatedReadTime}m</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Eye className="w-4 h-4" />
                              <span>24 views</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-warning fill-current" />
                            <span className="text-sm font-medium">4.8</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {resource.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {resource.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{resource.tags.length - 3}
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Star className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredResources.filter(r => r.type === 'template').map((resource) => (
              <Card key={resource.id} className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-warning" />
                    {resource.title}
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-gradient-primary">
                    <Download className="w-4 h-4 mr-2" />
                    Download Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides">
          <div className="space-y-4">
            {filteredResources.filter(r => r.type === 'document').map((resource) => (
              <Card key={resource.id} className="bg-gradient-card border-border shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground">{resource.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{resource.estimatedReadTime} min read</span>
                          <span>Updated {resource.updatedAt.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline">
                      View Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>


        <TabsContent value="case-studies">
          <div className="space-y-6">
            {filteredResources.filter(r => r.type === 'case-study').map((resource) => (
              <Card key={resource.id} className="bg-gradient-card border-border shadow-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-primary" />
                        {resource.title}
                      </CardTitle>
                      <CardDescription className="mt-2">{resource.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className={getPhaseColor(resource.phase)}>
                      {resource.phase}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{resource.estimatedReadTime} minutes</span>
                      <span>Advanced level</span>
                      <span>Includes solution guide</span>
                    </div>
                    <Button variant="outline">
                      View Case Study
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}