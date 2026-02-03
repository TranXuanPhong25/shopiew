import { Card } from "@/components/ui/card";
import { ORDER_STATUS_INFO, type OrderDTO } from "@/features/orders/types";

import {
	CheckCircle2,
	Clock,
	Package,
	Truck,
	XCircle,
	RotateCcw,
	RefreshCcw,
} from "lucide-react";

interface OrderStatusBannerProps {
	order: OrderDTO;
}

const STATUS_ICONS = {
	CREATED: Clock,
	UNCONFIRMED: Clock,
	CONFIRMED: CheckCircle2,
	PROCESSING: Package,
	SHIPPING: Truck,
	DELIVERED: CheckCircle2,
	COMPLETED: CheckCircle2,
	CANCELLED: XCircle,
	RETURNED: RotateCcw,
	REFUNDED: RefreshCcw,
};

const STATUS_MESSAGES = {
	CREATED:
		"Đơn hàng đã được tạo thành công. Vui lòng chờ xác nhận từ người bán.",
	UNCONFIRMED:
		"Đang chờ xác nhận từ người bán. Bạn sẽ nhận được thông báo khi đơn hàng được xác nhận.",
	CONFIRMED: "Người bán đã xác nhận đơn hàng. Đơn hàng đang được chuẩn bị.",
	PROCESSING:
		"Đơn hàng đang được đóng gói. Sẽ sớm được giao cho đơn vị vận chuyển.",
	SHIPPING:
		"Đơn hàng đang trên đường giao đến bạn. Vui lòng chú ý điện thoại.",
	DELIVERED:
		"Đơn hàng đã được giao thành công. Bạn có thể đánh giá sản phẩm ngay.",
	COMPLETED: "Đơn hàng đã hoàn thành. Cảm ơn bạn đã mua sắm tại Shopiew!",
	CANCELLED:
		"Đơn hàng đã bị hủy. Nếu bạn đã thanh toán, số tiền sẽ được hoàn lại.",
	RETURNED:
		"Đơn hàng đã được trả lại. Vui lòng liên hệ với người bán để biết thêm chi tiết.",
	REFUNDED:
		"Đơn hàng đã được hoàn tiền. Số tiền sẽ được chuyển về tài khoản của bạn.",
};

export function OrderStatusBanner({ order }: OrderStatusBannerProps) {
	const statusInfo = ORDER_STATUS_INFO[order.status];
	const Icon = STATUS_ICONS[order.status];
	const message = STATUS_MESSAGES[order.status];

	// Determine background color based on status
	const getBgColor = () => {
		switch (order.status) {
			case "DELIVERED":
			case "COMPLETED":
				return "bg-green-50 border-green-200";
			case "CANCELLED":
				return "bg-red-50 border-red-200";
			case "RETURNED":
			case "REFUNDED":
				return "bg-orange-50 border-orange-200";
			case "SHIPPING":
				return "bg-purple-50 border-purple-200";
			case "CONFIRMED":
			case "PROCESSING":
				return "bg-blue-50 border-blue-200";
			default:
				return "bg-gray-50 border-gray-200";
		}
	};

	const getIconColor = () => {
		switch (order.status) {
			case "DELIVERED":
			case "COMPLETED":
				return "text-green-600";
			case "CANCELLED":
				return "text-red-600";
			case "RETURNED":
			case "REFUNDED":
				return "text-orange-600";
			case "SHIPPING":
				return "text-purple-600";
			case "CONFIRMED":
			case "PROCESSING":
				return "text-blue-600";
			default:
				return "text-gray-600";
		}
	};

	const getTextColor = () => {
		switch (order.status) {
			case "DELIVERED":
			case "COMPLETED":
				return "text-green-800";
			case "CANCELLED":
				return "text-red-800";
			case "RETURNED":
			case "REFUNDED":
				return "text-orange-800";
			case "SHIPPING":
				return "text-purple-800";
			case "CONFIRMED":
			case "PROCESSING":
				return "text-blue-800";
			default:
				return "text-gray-800";
		}
	};

	return (
		<Card
			className={`p-4 border ${getBgColor()}`}
			role="status"
			aria-live="polite"
		>
			<div className="flex items-start gap-3">
				<Icon
					className={`h-6 w-6 flex-shrink-0 mt-0.5 ${getIconColor()}`}
				/>
				<div className="flex-1 min-w-0">
					<p className={`font-semibold text-base mb-1 ${getTextColor()}`}>
						{statusInfo.label}
					</p>
					<p className={`text-sm leading-relaxed ${getTextColor()}`}>
						{message}
					</p>
				</div>
			</div>
		</Card>
	);
}
