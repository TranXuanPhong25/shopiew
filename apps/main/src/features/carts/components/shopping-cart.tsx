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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowRight } from "lucide-react";

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

	if (isLoading) {
		return (
			<div className="max-w-7xl mx-auto my-4 min-h-[60vh] px-4">
				<div className="animate-pulse space-y-4">
					<div className="h-8 bg-gray-200 rounded-lg w-32" />
					<div className="h-24 bg-gray-200 rounded-2xl" />
					<div className="h-48 bg-gray-200 rounded-2xl" />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="max-w-7xl mx-auto my-4 min-h-[60vh] px-4">
				<div className="text-center py-16 bg-white rounded-2xl shadow-sm">
					<p className="text-sale-600 font-medium">Error loading cart: {error.message}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto my-4 min-h-[60vh] px-4">
			<div className="flex flex-col lg:flex-row gap-4">
				{/* Cart Items */}
				<div className="flex-1 min-w-0">
					<h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
						<ShoppingBag className="w-6 h-6 text-brand-500" aria-hidden="true" />
						Your Cart
					</h1>
					<div className="space-y-4">
						<CartHeader
							selectedItemsCount={selectedItems.length}
							totalItemsCount={items.length}
							onSelectAll={handleSelectAll}
						/>

						{items.length > 0 ? (
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
							<div className="bg-white rounded-2xl shadow-sm p-12 text-center">
								<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-50 mb-4">
									<ShoppingBag className="w-10 h-10 text-brand-400" aria-hidden="true" />
								</div>
								<h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
								<p className="text-muted-foreground mb-6 max-w-sm mx-auto text-pretty">
									Looks like you haven't added any items yet. Start exploring our products!
								</p>
								<Button asChild size="lg" className="group">
									<Link href="/">
										Start Shopping
										<ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
									</Link>
								</Button>
							</div>
						)}
					</div>
				</div>

				{/* Summary */}
				{items.length > 0 && (
					<CartSummary
						totalOriginal={totalOriginal}
						totalAfterDiscount={totalAfterDiscount}
						selectedItemsCount={selectedItems.length}
						onCheckout={handleCheckout}
					/>
				)}
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
