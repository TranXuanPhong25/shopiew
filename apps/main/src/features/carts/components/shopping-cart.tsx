"use client";

import { CartHeader } from "./cart-header";
import { ShopSection } from "./shop-section";
import { CartSummary } from "./cart-summary";
import { CheckoutDialog, CheckoutFormData } from "./checkout-dialog";
import useCartPage from "../hooks/use-cart-page";
import {
	useCreateOrder,
	CreateOrderRequest,
	OrderItemInput,
} from "@/features/orders";

export default function ShoppingCart() {
	const {
		shops,
		selectedItems,
		handleSelectAll,
		handleShopToggle,
		handleItemToggle,
		handleRemoveItem,
		handleCheckout,
		totalOriginal,
		totalAfterDiscount,
		items,
		handleQuantityChange,
		isLoading,
		error,
		isCheckoutOpen,
		setIsCheckoutOpen,
		getSelectedCartItems,
	} = useCartPage();

	const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();

	const handleOrderSubmit = (formData: CheckoutFormData) => {
		const selectedCartItems = getSelectedCartItems();

		// Group items by shop
		const itemsByShop = selectedCartItems.reduce(
			(acc, item) => {
				const shopId = item.shopID;
				if (!acc[shopId]) {
					acc[shopId] = [];
				}
				acc[shopId].push(item);
				return acc;
			},
			{} as Record<string, typeof selectedCartItems>,
		);

		// For now, create order for the first shop (can be extended for multi-shop orders)
		const shopId = Object.keys(itemsByShop)[0];
		const shopItems = itemsByShop[shopId];

		const orderItems: OrderItemInput[] = shopItems.map((item) => ({
			productId: String(item.productVariant.id),
			productName: item.productVariant.name,
			productSku: item.productVariant.sku,
			imageUrl:
				item.productVariant.coverImage ||
				item.productVariant.images?.[0] ||
				"",
			variantId: String(item.productVariant.id),
			variantName: item.productVariant.name,
			originalPrice: Math.floor(item.productVariant.originalPrice),
			salePrice: Math.floor(item.productVariant.salePrice),
			quantity: item.quantity,
		}));

		const orderRequest: CreateOrderRequest = {
			shopId,
			recipientName: formData.recipientName,
			recipientPhone: formData.recipientPhone,
			deliveryAddress: formData.deliveryAddress,
			paymentMethod: formData.paymentMethod,
			customerNote: formData.customerNote,
			items: orderItems,
		};

		createOrder(orderRequest);
	};

	if (isLoading) return <div className="min-h-[60vh]" />;
	if (error) return <div>Error loading cart: {error.message}</div>;
	return (
		<div className="max-w-7xl mx-auto my-4 min-h-[60vh]">
			<div className="flex flex-col lg:flex-row gap-4">
				{/* Cart Items */}
				<div className="flex-1">
					<h1 className="text-xl font-semibold mb-4 ml-4">Your Cart</h1>
					<div className="space-y-4">
						<CartHeader
							selectedItemsCount={selectedItems.length}
							totalItemsCount={items.length}
							onSelectAll={handleSelectAll}
						/>

						{items.length != 0 ? (
							shops.map((shop) => (
								<ShopSection
									shopName={shop.name}
									key={shop.id}
									items={items.filter(
										(item) => item.shopID === shop.id,
									)}
									selectedItems={selectedItems}
									onToggleShopSelect={handleShopToggle}
									onToggleItemSelect={handleItemToggle}
									onQuantityChange={handleQuantityChange}
									onRemoveItem={handleRemoveItem}
								/>
							))
						) : (
							<div>Your cart is empty</div>
						)}
					</div>
				</div>

				{/* Summary */}
				<CartSummary
					totalOriginal={totalOriginal}
					totalAfterDiscount={totalAfterDiscount}
					selectedItemsCount={selectedItems.length}
					onCheckout={handleCheckout}
				/>
			</div>

			{/* Checkout Dialog */}
			<CheckoutDialog
				open={isCheckoutOpen}
				onOpenChange={setIsCheckoutOpen}
				onSubmit={handleOrderSubmit}
				isLoading={isCreatingOrder}
				totalAmount={totalAfterDiscount}
				itemsCount={selectedItems.length}
			/>
		</div>
	);
}
