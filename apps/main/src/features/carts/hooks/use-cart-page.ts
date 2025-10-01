import { CartItem } from "../types";
import { useCartSelection } from "./use-cart-selection"
import useGetCart from "./use-get-cart"
const mockCartData = {
   id: "cart1",
   userId: "user1",
   items: [
      {
         id: "item1",
         productVariant: {
            id: "variant1",
            name: "Product Variant 1",
            price: 100,
            coverImage: "/add-photo-placeholder.jpg",
            // originalPrice: 120,
            // description: "Description for Product Variant 1"
         },
         quantity: 2,
         shop: {
            id: "shop1",
            name: "Shop 1"
         },
         name: "Product Variant 1"
      },
      {
         id: "item2",
         productVariant: {
            id: "variant2",
            name: "Product Variant 2",
            price: 200,
            coverImage: "/add-photo-placeholder.jpg",
            // originalPrice: 250,
            // description: "Description for Product Variant 2"
         },
         quantity: 1,
         shop: {     
            id: "shop2",
            name: "Shop 2"
         },
         name: "Product Variant 2"
      }
   ],
   createdAt: new Date().toISOString(),
   updatedAt: new Date().toISOString()
}  
const useCartPage = () => {
   const { cartData, isLoading, error } = useGetCart();
   const fixedItems = cartData ? cartData.items : mockCartData.items;
   const {
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
   } = useCartSelection(fixedItems as CartItem[]);
   return {
      cartData,
      isLoading,
      error,
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

export default useCartPage;``