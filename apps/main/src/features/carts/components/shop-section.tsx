import { Card } from "@/components/ui/card"
import { ShopHeader } from "./shop-header"
import { type CartItem } from "../types"
import { CartItemComponent } from "./cart-item-component"
interface ShopSectionProps {
  shopName: string
  items: CartItem[]
  selectedItems: string[]
  onToggleShopSelect: (checked: boolean) => void
  onToggleItemSelect: (itemId: string, checked: boolean) => void
  onQuantityChange: (itemId: string, newQuantity: number) => void
  onRemoveItem: (itemId: string) => void
}

export function ShopSection({
  shopName,
  items,
  selectedItems,
  onToggleShopSelect,
  onToggleItemSelect,
  onQuantityChange,
  onRemoveItem
}: ShopSectionProps) {
  const shopItemIds = items.map(item => item.productVariant.id)
  const selectedShopItems = shopItemIds.filter(id => selectedItems.includes(id))
  const isShopSelected = selectedShopItems.length === shopItemIds.length && shopItemIds.length > 0

  const handleShopToggle = (checked: boolean) => {
    onToggleShopSelect(checked)
  }

  return (
    <Card className="p-4">
      <ShopHeader
        shopName={shopName}
        isSelected={isShopSelected}
        onToggleSelect={handleShopToggle}
      />

      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <CartItemComponent
            key={"cart-item-" + item.productVariant.id}
            item={item}
            isSelected={selectedItems.includes(item.productVariant.id)}
            onToggleSelect={(checked) => onToggleItemSelect(item.productVariant.id, checked)}
            onQuantityChange={(newQuantity) => onQuantityChange(item.productVariant.id, newQuantity)}
            onRemove={() => onRemoveItem(item.productVariant.id)}
          />
        ))}
      </div>
    </Card>
  )
}