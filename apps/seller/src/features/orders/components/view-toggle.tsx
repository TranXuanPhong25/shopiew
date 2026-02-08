import { Button } from '@/components/ui/button';
import { LayoutGrid, Table } from 'lucide-react';

export type ViewMode = 'table' | 'card';

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-md border bg-background p-1">
      <Button
        variant={view === 'table' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('table')}
        className="h-8 px-3"
      >
        <Table className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">Bảng</span>
      </Button>
      <Button
        variant={view === 'card' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('card')}
        className="h-8 px-3"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">Thẻ</span>
      </Button>
    </div>
  );
}
