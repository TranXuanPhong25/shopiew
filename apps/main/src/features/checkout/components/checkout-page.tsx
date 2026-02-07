"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckoutSummary } from "../components/checkout-summary";
import { AddressSelector } from "../components/address-selector";
import { PaymentMethodSelector } from "../components/payment-method-selector";
import { CheckoutData, CheckoutFormData, SavedAddress } from "../types";
import { CartItem } from "@/features/carts/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingBag, Package, ChevronRight } from "lucide-react";
import {
	useCreateOrder,
	CreateOrderRequest,
	OrderItemInput,
} from "@/features/orders";

const CHECKOUT_STORAGE_KEY = "checkout_items";

export default function CheckoutPage() {
	const router = useRouter();
	const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
	const [selectedAddress, setSelectedAddress] = useState<SavedAddress | null>(null);
	const [paymentMethod, setPaymentMethod] = useState<string>("cod");
	const [customerNote, setCustomerNote] = useState<string>("");

	const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder();

	useEffect(() => {
		// Load checkout data from localStorage
		const storedData = localStorage.getItem(CHECKOUT_STORAGE_KEY);
		if (storedData) {
			try {
				const data: CheckoutData = JSON.parse(storedData);
				setCheckoutData(data);
			} catch (error) {
				console.error("Failed to parse checkout data:", error);
				router.push("/carts");
			}
		} else {
			// No checkout data, redirect to cart
			router.push("/carts");
		}
	}, [router]);

	const handlePlaceOrder = () => {
		if (!checkoutData || checkoutData.items.length === 0) return;

		// Validate address
		if (!selectedAddress) {
			alert("Vui lòng chọn địa chỉ giao hàng");
			return;
		}

		// Group items by shop
		const itemsByShop = checkoutData.items.reduce(
			(acc, item) => {
				const shopId = item.shopID;
				if (!acc[shopId]) {
					acc[shopId] = [];
				}
				acc[shopId].push(item);
				return acc;
			},
			{} as Record<string, CartItem[]>,
		);

		// Create order for the first shop (can be extended for multi-shop orders)
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
			recipientName: selectedAddress.recipientName,
			recipientPhone: selectedAddress.recipientPhone,
			deliveryAddress: selectedAddress.address,
			paymentMethod: paymentMethod,
			customerNote: customerNote,
			items: orderItems,
		};

		createOrder(orderRequest, {
			onSuccess: () => {
				// Clear checkout data from localStorage
				localStorage.removeItem(CHECKOUT_STORAGE_KEY);
			},
		});
	};

	if (!checkoutData) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
					<p className="text-gray-600">Đang tải...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-slate-50 min-h-screen">
			<div className="max-w-7xl mx-auto py-8 px-4">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
						<ShoppingBag className="w-8 h-8 text-brand-500" />
						Thanh toán
					</h1>
					<div className="flex items-center gap-2 text-sm text-gray-600">
						<span>Giỏ hàng</span>
						<ChevronRight className="w-4 h-4" />
						<span className="text-brand-600 font-medium">Thanh toán</span>
					</div>
				</div>

				<div className="flex flex-col lg:flex-row gap-6">
					{/* Left Column - Forms */}
					<div className="flex-1 space-y-6">
						{/* 1. Address Selection */}
						<AddressSelector
							selectedAddressId={selectedAddress?.id}
							onAddressSelect={setSelectedAddress}
						/>

						{/* 2. Payment Method */}
						<PaymentMethodSelector
							selectedMethod={paymentMethod}
							onMethodSelect={setPaymentMethod}
						/>

						{/* 3. Order Items */}
						<Card className="p-6">
							<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<Package className="w-5 h-5 text-brand-500" />
								Sản phẩm ({checkoutData.selectedCount})
							</h2>
							<div className="space-y-4">
								{checkoutData.items.map((item) => (
									<div
										key={item.productVariant.id}
										className="flex gap-4 p-4 bg-slate-50 rounded-xl"
									>
										<img
											src={
												item.productVariant.coverImage ||
												item.productVariant.images?.[0] ||
												"/placeholder.png"
											}
											alt={item.productVariant.name}
											className="w-20 h-20 object-cover rounded-lg"
										/>
										<div className="flex-1">
											<h3 className="font-medium text-gray-900 line-clamp-2">
												{item.productVariant.name}
											</h3>
											<p className="text-sm text-gray-500 mt-1">
												x{item.quantity}
											</p>
											<div className="flex items-center gap-2 mt-2">
												<span className="text-sale-600 font-semibold">
													{item.productVariant.salePrice.toLocaleString()}đ
												</span>
												{item.productVariant.salePrice <
													item.productVariant.originalPrice && (
													<span className="text-sm text-gray-400 line-through">
														{item.productVariant.originalPrice.toLocaleString()}đ
													</span>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</Card>

						{/* 4. Customer Note */}
						<Card className="p-6">
							<h2 className="text-lg font-semibold mb-4">Ghi chú</h2>
							<div>
								<Label htmlFor="customerNote">
									Lời nhắn cho người bán (tùy chọn)
								</Label>
								<Textarea
									id="customerNote"
									placeholder="Ví dụ: Giao hàng giờ hành chính"
									value={customerNote}
									onChange={(e) => setCustomerNote(e.target.value)}
									rows={3}
									className="mt-2"
								/>
							</div>
						</Card>
					</div>

					{/* Right Column - Summary */}
					<CheckoutSummary
						totalOriginal={checkoutData.totalOriginal}
						totalAfterDiscount={checkoutData.totalAfterDiscount}
						selectedItemsCount={checkoutData.selectedCount}
						onPlaceOrder={handlePlaceOrder}
						isLoading={isCreatingOrder}
					/>
				</div>
			</div>
		</div>
	);
}
