import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  BookOpen, 
  Activity, 
  CheckSquare, 
  Plus, 
  X,
  Upload,
  Link,
  Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateContentDialogProps {
  children: React.ReactNode;
  onContentCreated?: (content: any) => void;
}

export function CreateContentDialog({ children, onContentCreated }: CreateContentDialogProps) {
  const [open, setOpen] = useState(false);
  const [contentType, setContentType] = useState<'template' | 'resource' | 'activity' | 'discussion'>('template');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Template form state
  const [templateData, setTemplateData] = useState({
    title: '',
    description: '',
    category: '',
    tags: [] as string[],
    phase: 'phase1',
    file: null as File | null
  });

  // Resource form state
  const [resourceData, setResourceData] = useState({
    title: '',
    type: 'guide',
    estimatedReadTime: 10,
    url: '',
    category: '',
    tags: [] as string[],
    phase: 'phase1',
    description: ''
  });

  // Activity form state
  const [activityData, setActivityData] = useState({
    title: '',
    description: '',
    type: 'workshop',
    duration: 60,
    instructions: [''],
    expectedOutcomes: [''],
    materials: [''],
    phase: 'phase1'
  });

  // Discussion form state
  const [discussionData, setDiscussionData] = useState({
    point: '',
    phase: 'phase1',
    tips: '',
    timeEstimate: 15
  });

  const [currentTag, setCurrentTag] = useState('');

  const addTag = (tags: string[], setData: Function, dataKey: string) => {
    if (currentTag && !tags.includes(currentTag)) {
      setData((prev: any) => ({
        ...prev,
        [dataKey]: [...tags, currentTag]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string, tags: string[], setData: Function, dataKey: string) => {
    setData((prev: any) => ({
      ...prev,
      [dataKey]: tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addArrayItem = (array: string[], setData: Function, dataKey: string) => {
    setData((prev: any) => ({
      ...prev,
      [dataKey]: [...array, '']
    }));
  };

  const updateArrayItem = (index: number, value: string, array: string[], setData: Function, dataKey: string) => {
    const newArray = [...array];
    newArray[index] = value;
    setData((prev: any) => ({
      ...prev,
      [dataKey]: newArray
    }));
  };

  const removeArrayItem = (index: number, array: string[], setData: Function, dataKey: string) => {
    setData((prev: any) => ({
      ...prev,
      [dataKey]: array.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      let contentData;
      
      switch (contentType) {
        case 'template':
          contentData = {
            ...templateData,
            id: `custom-template-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            isPublic: false,
            type: 'template'
          };
          break;
        case 'resource':
          contentData = {
            ...resourceData,
            id: `custom-resource-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date(),
            isPublic: false
          };
          break;
        case 'activity':
          contentData = {
            ...activityData,
            id: `custom-activity-${Date.now()}`,
            instructions: activityData.instructions.filter(i => i.trim()),
            expectedOutcomes: activityData.expectedOutcomes.filter(o => o.trim()),
            materials: activityData.materials.filter(m => m.trim())
          };
          break;
        case 'discussion':
          contentData = {
            ...discussionData,
            id: `custom-discussion-${Date.now()}`
          };
          break;
      }

      // Here you would typically save to database
      console.log('Creating content:', contentData);
      
      onContentCreated?.(contentData);
      
      toast({
        title: "Content Created",
        description: `Your ${contentType} has been added to the mentor kit.`,
      });

      // Reset form
      setTemplateData({
        title: '',
        description: '',
        category: '',
        tags: [],
        phase: 'phase1',
        file: null
      });
      setResourceData({
        title: '',
        type: 'guide',
        estimatedReadTime: 10,
        url: '',
        category: '',
        tags: [],
        phase: 'phase1',
        description: ''
      });
      setActivityData({
        title: '',
        description: '',
        type: 'workshop',
        duration: 60,
        instructions: [''],
        expectedOutcomes: [''],
        materials: [''],
        phase: 'phase1'
      });
      setDiscussionData({
        point: '',
        phase: 'phase1',
        tips: '',
        timeEstimate: 15
      });

      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Custom Content
          </DialogTitle>
          <DialogDescription>
            Add your own templates, resources, activities, or discussion points to enhance the mentor kit.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={contentType} onValueChange={(value) => setContentType(value as any)} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="template" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Template
            </TabsTrigger>
            <TabsTrigger value="resource" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Resource
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="discussion" className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              Discussion
            </TabsTrigger>
          </TabsList>

          <TabsContent value="template" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Template or Worksheet</CardTitle>
                <CardDescription>
                  Upload a fillable template or worksheet that mentees can use during sessions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="template-title">Title</Label>
                    <Input
                      id="template-title"
                      value={templateData.title}
                      onChange={(e) => setTemplateData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Custom Goal Tracker"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-phase">Phase</Label>
                    <Select value={templateData.phase} onValueChange={(value) => setTemplateData(prev => ({ ...prev, phase: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phase1">Phase 1: Launch & Goal Setting</SelectItem>
                        <SelectItem value="phase2">Phase 2: Foundation & Exploration</SelectItem>
                        <SelectItem value="phase3">Phase 3: Deep Dive & Review</SelectItem>
                        <SelectItem value="phase4">Phase 4: Reflection & Planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="template-description">Description</Label>
                  <Textarea
                    id="template-description"
                    value={templateData.description}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe how this template should be used..."
                  />
                </div>

                <div>
                  <Label htmlFor="template-category">Category</Label>
                  <Input
                    id="template-category"
                    value={templateData.category}
                    onChange={(e) => setTemplateData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., worksheets, planning, reflection"
                  />
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add tag..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addTag(templateData.tags, setTemplateData, 'tags');
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTag(templateData.tags, setTemplateData, 'tags')}
                    >
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {templateData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="w-3 h-3 cursor-pointer"
                          onClick={() => removeTag(tag, templateData.tags, setTemplateData, 'tags')}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="template-file">File Upload</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drop your file here or click to browse
                    </p>
                    <Input
                      id="template-file"
                      type="file"
                      accept=".pdf,.doc,.docx,.xlsx,.xls"
                      onChange={(e) => setTemplateData(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resource" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Resource</CardTitle>
                <CardDescription>
                  Add a helpful article, guide, or external resource for mentees to reference.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="resource-title">Title</Label>
                    <Input
                      id="resource-title"
                      value={resourceData.title}
                      onChange={(e) => setResourceData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Advanced Problem Solving Guide"
                    />
                  </div>
                  <div>
                    <Label htmlFor="resource-type">Type</Label>
                    <Select value={resourceData.type} onValueChange={(value) => setResourceData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="guide">Guide</SelectItem>
                        <SelectItem value="article">Article</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="case-study">Case Study</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="resource-phase">Phase</Label>
                    <Select value={resourceData.phase} onValueChange={(value) => setResourceData(prev => ({ ...prev, phase: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phase1">Phase 1: Launch & Goal Setting</SelectItem>
                        <SelectItem value="phase2">Phase 2: Foundation & Exploration</SelectItem>
                        <SelectItem value="phase3">Phase 3: Deep Dive & Review</SelectItem>
                        <SelectItem value="phase4">Phase 4: Reflection & Planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="resource-time">Estimated Read Time (minutes)</Label>
                    <Input
                      id="resource-time"
                      type="number"
                      value={resourceData.estimatedReadTime}
                      onChange={(e) => setResourceData(prev => ({ ...prev, estimatedReadTime: parseInt(e.target.value) || 10 }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="resource-url">URL</Label>
                  <div className="flex gap-2">
                    <Link className="w-4 h-4 text-muted-foreground mt-3" />
                    <Input
                      id="resource-url"
                      value={resourceData.url}
                      onChange={(e) => setResourceData(prev => ({ ...prev, url: e.target.value }))}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="resource-description">Description</Label>
                  <Textarea
                    id="resource-description"
                    value={resourceData.description}
                    onChange={(e) => setResourceData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what mentees will learn from this resource..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Activity</CardTitle>
                <CardDescription>
                  Design a structured activity or exercise for your mentoring sessions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="activity-title">Title</Label>
                    <Input
                      id="activity-title"
                      value={activityData.title}
                      onChange={(e) => setActivityData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., Skills Assessment Workshop"
                    />
                  </div>
                  <div>
                    <Label htmlFor="activity-type">Type</Label>
                    <Select value={activityData.type} onValueChange={(value) => setActivityData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="exercise">Exercise</SelectItem>
                        <SelectItem value="discussion">Discussion</SelectItem>
                        <SelectItem value="case-study">Case Study</SelectItem>
                        <SelectItem value="role-play">Role Play</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="activity-phase">Phase</Label>
                    <Select value={activityData.phase} onValueChange={(value) => setActivityData(prev => ({ ...prev, phase: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phase1">Phase 1: Launch & Goal Setting</SelectItem>
                        <SelectItem value="phase2">Phase 2: Foundation & Exploration</SelectItem>
                        <SelectItem value="phase3">Phase 3: Deep Dive & Review</SelectItem>
                        <SelectItem value="phase4">Phase 4: Reflection & Planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="activity-duration">Duration (minutes)</Label>
                    <Input
                      id="activity-duration"
                      type="number"
                      value={activityData.duration}
                      onChange={(e) => setActivityData(prev => ({ ...prev, duration: parseInt(e.target.value) || 60 }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="activity-description">Description</Label>
                  <Textarea
                    id="activity-description"
                    value={activityData.description}
                    onChange={(e) => setActivityData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief overview of what this activity accomplishes..."
                  />
                </div>

                <div>
                  <Label>Instructions</Label>
                  {activityData.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={instruction}
                        onChange={(e) => updateArrayItem(index, e.target.value, activityData.instructions, setActivityData, 'instructions')}
                        placeholder={`Step ${index + 1}...`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem(index, activityData.instructions, setActivityData, 'instructions')}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem(activityData.instructions, setActivityData, 'instructions')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Step
                  </Button>
                </div>

                <div>
                  <Label>Expected Outcomes</Label>
                  {activityData.expectedOutcomes.map((outcome, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <Input
                        value={outcome}
                        onChange={(e) => updateArrayItem(index, e.target.value, activityData.expectedOutcomes, setActivityData, 'expectedOutcomes')}
                        placeholder={`Outcome ${index + 1}...`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem(index, activityData.expectedOutcomes, setActivityData, 'expectedOutcomes')}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addArrayItem(activityData.expectedOutcomes, setActivityData, 'expectedOutcomes')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Outcome
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create Discussion Point</CardTitle>
                <CardDescription>
                  Add a thought-provoking question or topic to guide meaningful conversations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="discussion-phase">Phase</Label>
                    <Select value={discussionData.phase} onValueChange={(value) => setDiscussionData(prev => ({ ...prev, phase: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phase1">Phase 1: Launch & Goal Setting</SelectItem>
                        <SelectItem value="phase2">Phase 2: Foundation & Exploration</SelectItem>
                        <SelectItem value="phase3">Phase 3: Deep Dive & Review</SelectItem>
                        <SelectItem value="phase4">Phase 4: Reflection & Planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="discussion-time">Time Estimate (minutes)</Label>
                    <Input
                      id="discussion-time"
                      type="number"
                      value={discussionData.timeEstimate}
                      onChange={(e) => setDiscussionData(prev => ({ ...prev, timeEstimate: parseInt(e.target.value) || 15 }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="discussion-point">Discussion Point</Label>
                  <Textarea
                    id="discussion-point"
                    value={discussionData.point}
                    onChange={(e) => setDiscussionData(prev => ({ ...prev, point: e.target.value }))}
                    placeholder="What question or topic would you like to explore with your mentees?"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="discussion-tips">Facilitation Tips</Label>
                  <Textarea
                    id="discussion-tips"
                    value={discussionData.tips}
                    onChange={(e) => setDiscussionData(prev => ({ ...prev, tips: e.target.value }))}
                    placeholder="Share tips on how to facilitate this discussion effectively..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading} className="bg-gradient-primary">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Content
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}