import { useEffect, useState } from "react"
import { CartItem } from "../types"



const useCartAction = (originalItems: CartItem[]) => {
   const [items, setItems] = useState<CartItem[]>([])
   useEffect(() => {
      setItems(originalItems)
   }, [originalItems])
   // Group items by shop (for now all items are from the same shop)
   const [selectedItems, setSelectedItems] = useState<string[]>([])


   const handleSelectAll = (checked: boolean) => {
      setSelectedItems(checked ? items.map(item => item.productVariant.id) : [])
   }

   const handleShopToggle = (checked: boolean) => {
      setSelectedItems(checked ? items.map(item => item.productVariant.id) : [])
   }

   const handleItemToggle = (itemId: string, checked: boolean) => {
      setSelectedItems(checked
         ? [...selectedItems, itemId]
         : selectedItems.filter(id => id !== itemId)
      )
   }

   const handleRemoveItem = (itemId: string) => {
      setItems(items.filter(item => item.productVariant.id !== itemId))
      setSelectedItems(selectedItems.filter(id => id !== itemId))
   }

   const handleCheckout = () => {
      console.log('Proceeding to checkout with items:', selectedItems)
      // Add checkout logic here
   }

   const totalOriginal = items.reduce((sum, item) =>
      selectedItems.includes(item.productVariant.id) ? sum + (/*item.originalPrice */ 69 * item.quantity) : sum, 0
   )

   const totalAfterDiscount = items.reduce((sum, item) =>
      selectedItems.includes(item.productVariant.id) ? sum + (item.productVariant.price * item.quantity) : sum, 0
   )


   const handleQuantityChange = (itemId: string, newQuantity: number) => {
      if (newQuantity < 1) return
      setItems(items.map(item =>
         item.productVariant.id === itemId ? { ...item, quantity: newQuantity } : item
      ))
   }

   return {
      selectedItems,
      handleSelectAll,
      handleShopToggle,
      handleItemToggle,
      handleRemoveItem,
      handleCheckout,
      totalOriginal,
      totalAfterDiscount,
      items,
      setItems,
      handleQuantityChange
   }
}

export {
   useCartAction
}