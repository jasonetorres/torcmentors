import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, X } from 'lucide-react';
import { useRolePreview } from '@/hooks/useRolePreview';

export default function RolePreviewBanner() {
  const { previewRole, setPreviewRole, isPreviewMode } = useRolePreview();

  if (!isPreviewMode) return null;

  return (
    <div className="bg-warning/20 border-warning/30 border-b px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Eye className="w-4 h-4 text-warning" />
        <span className="text-sm font-medium text-foreground">
          Previewing as:
        </span>
        <Badge variant="outline" className="border-warning text-warning capitalize">
          {previewRole}
        </Badge>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setPreviewRole(null)}
        className="h-8 px-2"
      >
        <X className="w-4 h-4" />
        Exit Preview
      </Button>
    </div>
  );
}