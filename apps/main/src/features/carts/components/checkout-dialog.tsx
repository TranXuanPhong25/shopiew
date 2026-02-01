"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

export interface CheckoutFormData {
	recipientName: string;
	recipientPhone: string;
	deliveryAddress: string;
	paymentMethod: string;
	customerNote: string;
}

interface CheckoutDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (data: CheckoutFormData) => void;
	isLoading?: boolean;
	totalAmount: number;
	itemsCount: number;
}

export function CheckoutDialog({
	open,
	onOpenChange,
	onSubmit,
	isLoading = false,
	totalAmount,
	itemsCount,
}: CheckoutDialogProps) {
	const [formData, setFormData] = useState<CheckoutFormData>({
		recipientName: "",
		recipientPhone: "",
		deliveryAddress: "",
		paymentMethod: "COD",
		customerNote: "",
	});

	const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

	const validateForm = () => {
		const newErrors: Partial<CheckoutFormData> = {};

		if (!formData.recipientName.trim()) {
			newErrors.recipientName = "Vui lòng nhập tên người nhận";
		}

		if (!formData.recipientPhone.trim()) {
			newErrors.recipientPhone = "Vui lòng nhập số điện thoại";
		} else if (!/^[0-9]{10,11}$/.test(formData.recipientPhone.trim())) {
			newErrors.recipientPhone = "Số điện thoại không hợp lệ";
		}

		if (!formData.deliveryAddress.trim()) {
			newErrors.deliveryAddress = "Vui lòng nhập địa chỉ giao hàng";
		}

		if (!formData.paymentMethod) {
			newErrors.paymentMethod = "Vui lòng chọn phương thức thanh toán";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			onSubmit(formData);
		}
	};

	const handleChange = (field: keyof CheckoutFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Xác nhận đặt hàng</DialogTitle>
					<DialogDescription>
						Vui lòng điền thông tin giao hàng để hoàn tất đơn hàng
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Recipient Name */}
					<div className="space-y-2">
						<Label htmlFor="recipientName">
							Tên người nhận <span className="text-red-500">*</span>
						</Label>
						<Input
							id="recipientName"
							placeholder="Nhập tên người nhận"
							value={formData.recipientName}
							onChange={(e) =>
								handleChange("recipientName", e.target.value)
							}
							disabled={isLoading}
						/>
						{errors.recipientName && (
							<p className="text-sm text-red-500">
								{errors.recipientName}
							</p>
						)}
					</div>

					{/* Recipient Phone */}
					<div className="space-y-2">
						<Label htmlFor="recipientPhone">
							Số điện thoại <span className="text-red-500">*</span>
						</Label>
						<Input
							id="recipientPhone"
							placeholder="Nhập số điện thoại"
							value={formData.recipientPhone}
							onChange={(e) =>
								handleChange("recipientPhone", e.target.value)
							}
							disabled={isLoading}
						/>
						{errors.recipientPhone && (
							<p className="text-sm text-red-500">
								{errors.recipientPhone}
							</p>
						)}
					</div>

					{/* Delivery Address */}
					<div className="space-y-2">
						<Label htmlFor="deliveryAddress">
							Địa chỉ giao hàng <span className="text-red-500">*</span>
						</Label>
						<Textarea
							id="deliveryAddress"
							placeholder="Nhập địa chỉ giao hàng chi tiết"
							value={formData.deliveryAddress}
							onChange={(e) =>
								handleChange("deliveryAddress", e.target.value)
							}
							disabled={isLoading}
							rows={3}
						/>
						{errors.deliveryAddress && (
							<p className="text-sm text-red-500">
								{errors.deliveryAddress}
							</p>
						)}
					</div>

					{/* Payment Method */}
					<div className="space-y-2">
						<Label htmlFor="paymentMethod">
							Phương thức thanh toán{" "}
							<span className="text-red-500">*</span>
						</Label>
						<Select
							value={formData.paymentMethod}
							onValueChange={(value) =>
								handleChange("paymentMethod", value)
							}
							disabled={isLoading}
						>
							<SelectTrigger>
								<SelectValue placeholder="Chọn phương thức thanh toán" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="COD">
									Thanh toán khi nhận hàng (COD)
								</SelectItem>
								<SelectItem value="BANK_TRANSFER">
									Chuyển khoản ngân hàng
								</SelectItem>
								<SelectItem value="E_WALLET">Ví điện tử</SelectItem>
								<SelectItem value="CREDIT_CARD">
									Thẻ tín dụng/Ghi nợ
								</SelectItem>
							</SelectContent>
						</Select>
						{errors.paymentMethod && (
							<p className="text-sm text-red-500">
								{errors.paymentMethod}
							</p>
						)}
					</div>

					{/* Customer Note */}
					<div className="space-y-2">
						<Label htmlFor="customerNote">Ghi chú (tùy chọn)</Label>
						<Textarea
							id="customerNote"
							placeholder="Ghi chú cho người bán..."
							value={formData.customerNote}
							onChange={(e) =>
								handleChange("customerNote", e.target.value)
							}
							disabled={isLoading}
							rows={2}
						/>
					</div>

					{/* Order Summary */}
					<div className="border-t pt-4 space-y-2">
						<div className="flex justify-between text-sm">
							<span className="text-gray-600">Số lượng sản phẩm:</span>
							<span className="font-medium">{itemsCount}</span>
						</div>
						<div className="flex justify-between">
							<span className="font-medium">Tổng thanh toán:</span>
							<span className="text-red-500 text-lg font-bold">
								{totalAmount.toLocaleString()}đ
							</span>
						</div>
					</div>

					<DialogFooter className="gap-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={isLoading}
						>
							Hủy
						</Button>
						<Button
							type="submit"
							className="bg-red-500 hover:bg-red-600"
							disabled={isLoading}
						>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Đang xử lý...
								</>
							) : (
								"Đặt hàng"
							)}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
