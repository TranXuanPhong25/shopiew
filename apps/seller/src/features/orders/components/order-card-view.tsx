import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderStatusBadge } from "./order-status-badge";
import type { OrderListItemDTO } from "../types";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Package, MapPin, Clock, DollarSign } from "lucide-react";

interface OrderCardViewProps {
	orders: OrderListItemDTO[];
	selectedIds: Set<number>;
	onSelectOrder: (orderId: number, selected: boolean) => void;
	onOrderClick?: (order: OrderListItemDTO) => void;
}

export function OrderCardView({
	orders,
	selectedIds,
	onSelectOrder,
	onOrderClick,
}: OrderCardViewProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		try {
			return formatDistanceToNow(new Date(dateString), {
				addSuffix: true,
				locale: vi,
			});
		} catch {
			return dateString;
		}
	};

	if (orders.length === 0) {
		return (
			<div className="flex h-48 items-center justify-center rounded-lg border border-dashed">
				<p className="text-muted-foreground">Không có đơn hàng nào</p>
			</div>
		);
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{orders.map((order) => (
				<Card
					key={order.id}
					className="cursor-pointer transition-all hover:shadow-md"
					onClick={() => onOrderClick?.(order)}
				>
					<CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
						<div className="flex items-start gap-3">
							<div onClick={(e) => e.stopPropagation()}>
								<Checkbox
									checked={selectedIds.has(order.id)}
									onCheckedChange={(checked) =>
										onSelectOrder(order.id, !!checked)
									}
									aria-label={`Chọn đơn hàng ${order.id}`}
								/>
							</div>
							<div className="space-y-1">
								<p className="text-sm font-medium leading-none">
									Đơn hàng #{order.id}
								</p>
								<p className="text-sm text-muted-foreground">
									{order.customerName || "N/A"}
								</p>
							</div>
						</div>
						<OrderStatusBadge status={order.status} />
					</CardHeader>
					<CardContent className="space-y-3">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Package className="h-4 w-4" />
							<span>{order.itemCount} sản phẩm</span>
						</div>

						{order.shopName && (
							<div className="flex items-center gap-2 text-sm text-muted-foreground">
								<MapPin className="h-4 w-4" />
								<span className="truncate">{order.shopName}</span>
							</div>
						)}

						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<Clock className="h-4 w-4" />
							<span>{formatDate(order.createdAt)}</span>
						</div>

						<div className="flex items-center justify-between border-t pt-3">
							<div className="flex items-center gap-1 text-sm text-muted-foreground">
								<DollarSign className="h-4 w-4" />
								<span>Tổng tiền</span>
							</div>
							<span className="text-base font-bold">
								{formatCurrency(order.totalAmount)}
							</span>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
