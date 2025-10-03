import { Store } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"

interface ShopHeaderProps {
  shopName: string
  isSelected: boolean
  onToggleSelect: (checked: boolean) => void
}

export function ShopHeader({ shopName, isSelected, onToggleSelect }: ShopHeaderProps) {
  return (
    <div className="flex items-center gap-4 pb-3 border-b">
      <Checkbox
        checked={isSelected}
        onCheckedChange={onToggleSelect}
      />
      <div className="flex items-center gap-2">
        <Store className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium">{shopName}</span>
      </div>
    </div>
  )
}