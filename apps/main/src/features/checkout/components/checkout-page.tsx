"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckoutSummary } from "../components/checkout-summary";
import { CheckoutData, CheckoutFormData } from "../types";
import { CartItem } from "@/features/carts/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	useCreateOrder,
	CreateOrderRequest,
	OrderItemInput,
} from "@/features/orders";

const CHECKOUT_STORAGE_KEY = "checkout_items";

export default function CheckoutPage() {
	const router = useRouter();
	const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
	const [formData, setFormData] = useState<CheckoutFormData>({
		recipientName: "",
		recipientPhone: "",
		deliveryAddress: "",
		paymentMethod: "cod",
		customerNote: "",
	});

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

		// Validate form
		if (
			!formData.recipientName ||
			!formData.recipientPhone ||
			!formData.deliveryAddress
		) {
			alert("Vui lòng điền đầy đủ thông tin giao hàng");
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
			recipientName: formData.recipientName,
			recipientPhone: formData.recipientPhone,
			deliveryAddress: formData.deliveryAddress,
			paymentMethod: formData.paymentMethod,
			customerNote: formData.customerNote,
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
				<div>Đang tải...</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto my-4 min-h-[60vh] px-4">
			<h1 className="text-2xl font-semibold mb-6">Thanh toán</h1>

			<div className="flex flex-col lg:flex-row gap-6">
				{/* Checkout Form */}
				<div className="flex-1 space-y-6">
					{/* Shipping Information */}
					<Card className="p-6">
						<h2 className="text-lg font-semibold mb-4">
							Thông tin giao hàng
						</h2>
						<div className="space-y-4">
							<div>
								<Label htmlFor="recipientName">
									Họ và tên người nhận{" "}
									<span className="text-red-500">*</span>
								</Label>
								<Input
									id="recipientName"
									placeholder="Nhập họ và tên"
									value={formData.recipientName}
									onChange={(e) =>
										setFormData({
											...formData,
											recipientName: e.target.value,
										})
									}
								/>
							</div>

							<div>
								<Label htmlFor="recipientPhone">
									Số điện thoại <span className="text-red-500">*</span>
								</Label>
								<Input
									id="recipientPhone"
									placeholder="Nhập số điện thoại"
									value={formData.recipientPhone}
									onChange={(e) =>
										setFormData({
											...formData,
											recipientPhone: e.target.value,
										})
									}
								/>
							</div>

							<div>
								<Label htmlFor="deliveryAddress">
									Địa chỉ giao hàng{" "}
									<span className="text-red-500">*</span>
								</Label>
								<Textarea
									id="deliveryAddress"
									placeholder="Nhập địa chỉ chi tiết"
									value={formData.deliveryAddress}
									onChange={(e) =>
										setFormData({
											...formData,
											deliveryAddress: e.target.value,
										})
									}
									rows={3}
								/>
							</div>

							<div>
								<Label htmlFor="customerNote">Ghi chú (tùy chọn)</Label>
								<Textarea
									id="customerNote"
									placeholder="Ghi chú cho người bán"
									value={formData.customerNote}
									onChange={(e) =>
										setFormData({
											...formData,
											customerNote: e.target.value,
										})
									}
									rows={2}
								/>
							</div>
						</div>
					</Card>

					{/* Payment Method */}
					<Card className="p-6">
						<h2 className="text-lg font-semibold mb-4">
							Phương thức thanh toán
						</h2>
						<RadioGroup
							value={formData.paymentMethod}
							onValueChange={(value) =>
								setFormData({ ...formData, paymentMethod: value })
							}
						>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="cod" id="cod" />
								<Label htmlFor="cod" className="cursor-pointer">
									Thanh toán khi nhận hàng (COD)
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem
									value="bank_transfer"
									id="bank_transfer"
								/>
								<Label
									htmlFor="bank_transfer"
									className="cursor-pointer"
								>
									Chuyển khoản ngân hàng
								</Label>
							</div>
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="momo" id="momo" />
								<Label htmlFor="momo" className="cursor-pointer">
									Ví MoMo
								</Label>
							</div>
						</RadioGroup>
					</Card>

					{/* Order Items */}
					<Card className="p-6">
						<h2 className="text-lg font-semibold mb-4">
							Sản phẩm ({checkoutData.selectedCount})
						</h2>
						<div className="space-y-4">
							{checkoutData.items.map((item) => (
								<div
									key={item.productVariant.id}
									className="flex gap-4 pb-4 border-b last:border-b-0"
								>
									<img
										src={
											item.productVariant.coverImage ||
											item.productVariant.images?.[0] ||
											"/placeholder.png"
										}
										alt={item.productVariant.name}
										className="w-20 h-20 object-cover rounded"
									/>
									<div className="flex-1">
										<h3 className="font-medium">
											{item.productVariant.name}
										</h3>
										<p className="text-sm text-gray-500">
											Số lượng: {item.quantity}
										</p>
										<div className="flex items-center gap-2 mt-1">
											<span className="text-red-500 font-semibold">
												{item.productVariant.salePrice.toLocaleString()}
												đ
											</span>
											{item.productVariant.salePrice <
												item.productVariant.originalPrice && (
												<span className="text-sm text-gray-400 line-through">
													{item.productVariant.originalPrice.toLocaleString()}
													đ
												</span>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					</Card>
				</div>

				{/* Summary */}
				<CheckoutSummary
					totalOriginal={checkoutData.totalOriginal}
					totalAfterDiscount={checkoutData.totalAfterDiscount}
					selectedItemsCount={checkoutData.selectedCount}
					onPlaceOrder={handlePlaceOrder}
					isLoading={isCreatingOrder}
				/>
			</div>
		</div>
	);
}
