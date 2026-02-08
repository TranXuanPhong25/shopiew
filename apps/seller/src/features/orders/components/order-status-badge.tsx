import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "../types";

interface OrderStatusBadgeProps {
	status: OrderStatus;
	className?: string;
}

const statusConfig: Record<
	OrderStatus,
	{
		label: string;
		variant: "default" | "secondary" | "destructive" | "outline";
	}
> = {
	[OrderStatus.UNCONFIRMED]: {
		label: "Chờ xác nhận",
		variant: "outline",
	},
	[OrderStatus.CONFIRMED]: {
		label: "Đã xác nhận",
		variant: "default",
	},
	[OrderStatus.PICKED_UP]: {
		label: "Đã lấy hàng",
		variant: "secondary",
	},
	[OrderStatus.SHIPPED]: {
		label: "Đang giao",
		variant: "secondary",
	},
	[OrderStatus.DELIVERED]: {
		label: "Đã giao",
		variant: "default",
	},
	[OrderStatus.CANCELLED]: {
		label: "Đã hủy",
		variant: "destructive",
	},
	[OrderStatus.REFUNDED]: {
		label: "Đã hoàn tiền",
		variant: "secondary",
	},
};

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
	const config = statusConfig[status];

	return (
		<Badge variant={config.variant} className={className}>
			{config.label}
		</Badge>
	);
}
