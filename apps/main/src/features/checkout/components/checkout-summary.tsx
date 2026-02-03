import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CheckoutSummaryProps {
	totalOriginal: number;
	totalAfterDiscount: number;
	selectedItemsCount: number;
	shippingFee?: number;
	onPlaceOrder: () => void;
	isLoading?: boolean;
}

export function CheckoutSummary({
	totalOriginal,
	totalAfterDiscount,
	selectedItemsCount,
	shippingFee = 0,
	onPlaceOrder,
	isLoading = false,
}: CheckoutSummaryProps) {
	const discount = totalOriginal - totalAfterDiscount;
	const hasDiscount = discount > 0;
	const finalTotal = totalAfterDiscount + shippingFee;

	return (
		<div className="w-full lg:w-80">
			<Card className="p-4 sticky top-24">
				{/* Order Summary Title */}
				<h3 className="font-semibold text-lg mb-4">Thông tin đơn hàng</h3>

				{/* Price Summary */}
				<div className="space-y-3">
					<div className="flex justify-between text-sm">
						<span className="text-gray-600">
							Tổng tiền hàng ({selectedItemsCount} sản phẩm)
						</span>
						<span className="font-medium">
							{totalOriginal.toLocaleString()}đ
						</span>
					</div>

					{hasDiscount && (
						<div className="flex justify-between text-sm text-green-600">
							<span>Giảm giá trực tiếp</span>
							<span>-{discount.toLocaleString()}đ</span>
						</div>
					)}

					<div className="flex justify-between text-sm">
						<span className="text-gray-600">Phí vận chuyển</span>
						<span className="font-medium">
							{shippingFee === 0
								? "Miễn phí"
								: `${shippingFee.toLocaleString()}đ`}
						</span>
					</div>

					<div className="flex justify-between items-center pt-3 border-t">
						<span className="font-medium">Tổng thanh toán</span>
						<span className="text-red-500 text-xl font-bold">
							{finalTotal.toLocaleString()}đ
						</span>
					</div>

					<p className="text-xs text-gray-500 text-right">
						(Đã bao gồm VAT nếu có)
					</p>
				</div>

				{/* Promotions Section */}
				<div className="mt-6 pt-4 border-t">
					<div className="flex items-center justify-between mb-3">
						<span className="font-medium text-sm">Mã giảm giá</span>
						<Info className="h-4 w-4 text-gray-400" />
					</div>
					<Button
						variant="outline"
						className="w-full justify-start text-blue-500 hover:text-blue-600"
					>
						<span className="truncate">Chọn hoặc nhập mã</span>
						<span className="shrink-0 ml-2">{">"}</span>
					</Button>
				</div>

				{/* Place Order Button */}
				<Button
					className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-3"
					onClick={onPlaceOrder}
					disabled={isLoading || selectedItemsCount === 0}
				>
					{isLoading
						? "Đang xử lý..."
						: `Đặt Hàng (${selectedItemsCount})`}
				</Button>

				{/* Terms */}
				<p className="text-xs text-gray-500 text-center mt-4">
					Bằng việc tiến hành đặt hàng, bạn đồng ý với{" "}
					<a href="#" className="text-blue-500 hover:underline">
						Điều khoản sử dụng
					</a>{" "}
					của Shopiew
				</p>
			</Card>
		</div>
	);
}
