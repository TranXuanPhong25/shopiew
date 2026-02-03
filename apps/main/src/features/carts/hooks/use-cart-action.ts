import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem } from "../types";

const CHECKOUT_STORAGE_KEY = "checkout_items";

const useCartAction = (originalItems: CartItem[] | undefined) => {
	const router = useRouter();
	const [items, setItems] = useState<CartItem[]>([]);
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

	useEffect(() => {
		setItems(originalItems || []);
	}, [originalItems]);
	// Group items by shop (for now all items are from the same shop)
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	const handleSelectAll = (checked: boolean) => {
		setSelectedItems(
			checked ? items.map((item) => item.productVariant.id) : [],
		);
	};

	const handleShopToggle = (checked: boolean) => {
		setSelectedItems(
			checked ? items.map((item) => item.productVariant.id) : [],
		);
	};

	const handleItemToggle = (itemId: string, checked: boolean) => {
		setSelectedItems(
			checked
				? [...selectedItems, itemId]
				: selectedItems.filter((id) => id !== itemId),
		);
	};

	const handleRemoveItem = (itemId: string) => {
		setItems(items.filter((item) => item.productVariant.id !== itemId));
		setSelectedItems(selectedItems.filter((id) => id !== itemId));
	};

	const handleCheckout = () => {
		if (selectedItems.length === 0) return;

		// Get selected cart items
		const selectedCartItems = items.filter((item) =>
			selectedItems.includes(item.productVariant.id),
		);

		// Calculate totals
		const totalOriginal = selectedCartItems.reduce(
			(sum, item) => sum + item.productVariant.originalPrice * item.quantity,
			0,
		);

		const totalAfterDiscount = selectedCartItems.reduce(
			(sum, item) => sum + item.productVariant.salePrice * item.quantity,
			0,
		);

		// Save to localStorage
		const checkoutData = {
			items: selectedCartItems,
			totalOriginal,
			totalAfterDiscount,
			selectedCount: selectedCartItems.length,
		};
		localStorage.setItem(CHECKOUT_STORAGE_KEY, JSON.stringify(checkoutData));

		// Navigate to checkout page
		router.push("/checkout");
	};

	// Get selected cart items for order creation
	const getSelectedCartItems = () => {
		return items.filter((item) =>
			selectedItems.includes(item.productVariant.id),
		);
	};

	const totalOriginal = items.reduce(
		(sum, item) =>
			selectedItems.includes(item.productVariant.id)
				? sum + item.productVariant.originalPrice * item.quantity
				: sum,
		0,
	);

	const totalAfterDiscount = items.reduce(
		(sum, item) =>
			selectedItems.includes(item.productVariant.id)
				? sum + item.productVariant.salePrice * item.quantity
				: sum,
		0,
	);

	const handleQuantityChange = (itemId: string, newQuantity: number) => {
		if (newQuantity < 1) return;
		setItems(
			items.map((item) =>
				item.productVariant.id === itemId
					? { ...item, quantity: newQuantity }
					: item,
			),
		);
	};

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
		handleQuantityChange,
		isCheckoutOpen,
		setIsCheckoutOpen,
		getSelectedCartItems,
	};
};

export { useCartAction };
