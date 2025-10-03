import { Trash2 } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import QuantityInput from '@/components/form/quanitty-input'
import { CartItem } from '../types'


interface CartItemComponentProps {
  item: CartItem
  isSelected: boolean
  onToggleSelect: (checked: boolean) => void
  onQuantityChange: (newQuantity: number) => void
  onRemove: () => void
}

export function CartItemComponent({
  item,
  isSelected,
  onToggleSelect,
  onQuantityChange,
  onRemove
}: CartItemComponentProps) {
  const totalPrice = item.productVariant.price * item.quantity
  const discount = ((item.productVariant.price + 69 - item.productVariant.price) / item.productVariant.price) * 100

  return (
    <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
      <Checkbox
        checked={isSelected}
        onCheckedChange={onToggleSelect}
      />

      <div className="relative">
        <Image
          src={item.productVariant.coverImage || "/placeholder.svg"}
          alt={item.productVariant.name+' image'}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded-lg"
        />
        {discount > 0 && (
          <div className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
            -{Math.round(discount)}%
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium line-clamp-2 mb-1">{item.productVariant.name}</h3>
      </div>

      <div className="flex item.productVariants-center gap-8">
        {/* Price */}
        <div className="text-right min-w-[80px]">
          <div className="text-red-500 font-medium">
            {item.productVariant.price.toLocaleString()}đ
          </div>
          {item.productVariant.price < item.productVariant.price + 68 && (
            <div className="text-sm text-gray-500 line-through">
              {item.productVariant.price.toLocaleString()}đ
            </div>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="min-w-[120px] flex justify-center">
          <QuantityInput
            frontText=""
            value={item.quantity}
            onChange={onQuantityChange}
            max={item.productVariant.stockQuantity}
          />
        </div>

        {/* Total Price */}
        <div className="text-red-500 font-medium w-24  items-center flex justify-end">
          {totalPrice.toLocaleString()}đ
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}