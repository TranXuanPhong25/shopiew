import { useCartAction } from "./use-cart-action";
import useGetCart from "./use-get-cart";
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
		handleQuantityChange,
		isCheckoutOpen,
		setIsCheckoutOpen,
		getSelectedCartItems,
	} = useCartAction(cartData?.items);
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
		handleQuantityChange,
		shops: cartData?.shops || [],
		isCheckoutOpen,
		setIsCheckoutOpen,
		getSelectedCartItems,
	};
};

export default useCartPage;
