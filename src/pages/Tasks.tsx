import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  CheckSquare, 
  Clock, 
  Calendar,
  User,
  Flag,
  Plus
} from 'lucide-react';

export default function Tasks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks & Activities</h1>
          <p className="text-muted-foreground mt-2">
            Track your assignments and mentorship activities
          </p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="grid gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-primary" />
              Complete Goal Setting Worksheet
            </CardTitle>
            <CardDescription>
              Use the provided SMART Goal Guide to define 2-3 development goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                Completed
              </Badge>
              <Badge variant="outline" className="border-primary text-primary">
                High Priority
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Due: Jan 10, 2025
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Completed on Jan 9, 2025 • Estimated time: 60 minutes
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-warning" />
              Set up GitHub and Discord
            </CardTitle>
            <CardDescription>
              Join the group Discord channel and GitHub repository
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                In Progress
              </Badge>
              <Badge variant="outline" className="border-warning text-warning">
                Medium Priority
              </Badge>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Due: Jan 15, 2025
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Estimated time: 30 minutes • Assigned by Jason Torres
            </p>
            <Button size="sm" className="bg-gradient-primary">
              Complete Task
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}