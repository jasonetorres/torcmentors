import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { useRolePreview } from '@/hooks/useRolePreview';

export default function RolePreviewSwitcher() {
  const { previewRole, setPreviewRole } = useRolePreview();

  return (
    <div className="flex items-center gap-2">
      <Eye className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground">Preview as:</span>
      <Select value={previewRole || 'admin'} onValueChange={(value) => setPreviewRole(value === 'admin' ? null : value as any)}>
        <SelectTrigger className="w-32 h-8">
          <SelectValue placeholder="Admin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="mentor">Mentor</SelectItem>
          <SelectItem value="mentee">Mentee</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}