import { Trash2 } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"

interface CartHeaderProps {
  selectedItemsCount: number
  totalItemsCount: number
  onSelectAll: (checked: boolean) => void
}

export function CartHeader({ selectedItemsCount, totalItemsCount, onSelectAll }: CartHeaderProps) {
  const isAllSelected = selectedItemsCount === totalItemsCount && totalItemsCount > 0
  const isIndeterminate = selectedItemsCount > 0 && selectedItemsCount < totalItemsCount

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isAllSelected}
          onCheckedChange={onSelectAll}
          className={isIndeterminate ? "data-[state=checked]:bg-orange-500" : ""}
        />
        <span className="text-sm text-gray-600">
          Tất cả ({totalItemsCount} sản phẩm)
        </span>
      </div>
      <div className="flex items-center gap-[70px] text-sm text-gray-600">
        <span>Đơn giá</span>
        <span>Số lượng</span>
        <span>Thành tiền</span>
        <span/>
      </div>
    </div>
  )
}