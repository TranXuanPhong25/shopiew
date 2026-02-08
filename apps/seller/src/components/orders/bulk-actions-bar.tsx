import { Button } from '@/components/ui/button';
import { CheckCircle2, X } from 'lucide-react';

interface BulkActionsBarProps {
  selectedCount: number;
  onConfirm: () => void;
  onClear: () => void;
  isConfirming?: boolean;
}

export function BulkActionsBar({
  selectedCount,
  onConfirm,
  onClear,
  isConfirming = false,
}: BulkActionsBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 animate-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 shadow-lg">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <span className="font-medium">
            Đã chọn <span className="text-primary">{selectedCount}</span> đơn hàng
          </span>
        </div>

        <div className="h-6 w-px bg-border" />

        <Button
          onClick={onConfirm}
          disabled={isConfirming}
          size="sm"
          className="h-9"
        >
          {isConfirming ? 'Đang xác nhận...' : 'Xác nhận đơn hàng'}
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          disabled={isConfirming}
          className="h-9"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
