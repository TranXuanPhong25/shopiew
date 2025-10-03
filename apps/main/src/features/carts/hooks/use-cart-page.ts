import { CartItem } from "../types";
import { useCartAction } from "./use-cart-selection"
import useGetCart from "./use-get-cart"
const useCartPage = () => {
   const { cartData, isLoading, error } = useGetCart();
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
   } = useCartAction(cartData?.items || [])
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

export default useCartPage;