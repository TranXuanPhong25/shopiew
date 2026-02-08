import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderStatusBadge } from "./order-status-badge";
import type { OrderListItemDTO } from "@/types/order";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface OrderTableViewProps {
	orders: OrderListItemDTO[];
	selectedIds: Set<number>;
	onSelectOrder: (orderId: number, selected: boolean) => void;
	onSelectAll: (selected: boolean) => void;
	onOrderClick?: (order: OrderListItemDTO) => void;
}

export function OrderTableView({
	orders,
	selectedIds,
	onSelectOrder,
	onSelectAll,
	onOrderClick,
}: OrderTableViewProps) {
	const allSelected =
		orders.length > 0 && orders.every((o) => selectedIds.has(o.id));
	const someSelected =
		orders.some((o) => selectedIds.has(o.id)) && !allSelected;

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

	return (
		<div className="rounded-md border bg-card">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-12">
							<Checkbox
								checked={allSelected}
								onCheckedChange={onSelectAll}
								aria-label="Chọn tất cả"
								className={someSelected ? "opacity-50" : ""}
							/>
						</TableHead>
						<TableHead>Mã đơn hàng</TableHead>
						<TableHead>Khách hàng</TableHead>
						<TableHead>Cửa hàng</TableHead>
						<TableHead>Trạng thái</TableHead>
						<TableHead className="text-right">Tổng tiền</TableHead>
						<TableHead>Số sản phẩm</TableHead>
						<TableHead>Thời gian</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{orders.length === 0 ? (
						<TableRow>
							<TableCell
								colSpan={8}
								className="h-24 text-center text-muted-foreground"
							>
								Không có đơn hàng nào
							</TableCell>
						</TableRow>
					) : (
						orders.map((order) => (
							<TableRow
								key={order.id}
								className="cursor-pointer hover:bg-muted/50"
								onClick={() => onOrderClick?.(order)}
							>
								<TableCell onClick={(e) => e.stopPropagation()}>
									<Checkbox
										checked={selectedIds.has(order.id)}
										onCheckedChange={(checked) =>
											onSelectOrder(order.id, !!checked)
										}
										aria-label={`Chọn đơn hàng ${order.id}`}
									/>
								</TableCell>
								<TableCell className="font-medium">
									#{order.orderNumber}
								</TableCell>
								<TableCell>{order.customerName || "N/A"}</TableCell>
								<TableCell>{order.shopName || order.shopId}</TableCell>
								<TableCell>
									<OrderStatusBadge status={order.status} />
								</TableCell>
								<TableCell className="text-right font-medium">
									{formatCurrency(order.totalAmount)}
								</TableCell>
								<TableCell>{order.itemCount} sản phẩm</TableCell>
								<TableCell className="text-muted-foreground">
									{formatDate(order.createdAt)}
								</TableCell>
							</TableRow>
						))
					)}
				</TableBody>
			</Table>
		</div>
	);
}
