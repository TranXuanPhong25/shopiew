import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrderStatusBadge } from "./order-status-badge";
import type { OrderListItemDTO } from "../types";
import { AlertCircle, CheckCircle } from "lucide-react";

interface ConfirmOrdersDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	orders: OrderListItemDTO[];
	onConfirm: () => void;
	isConfirming?: boolean;
}

export function ConfirmOrdersDialog({
	open,
	onOpenChange,
	orders,
	onConfirm,
	isConfirming = false,
}: ConfirmOrdersDialogProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		}).format(amount);
	};

	const totalAmount = orders.reduce(
		(sum, order) => sum + order.totalAmount,
		0,
	);
	const createdOrders = orders.filter((o) => o.status === "UNCONFIRMED");
	const nonCreatedOrders = orders.filter((o) => o.status !== "UNCONFIRMED");

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl">
				<DialogHeader>
					<DialogTitle>Xác nhận đơn hàng</DialogTitle>
					<DialogDescription>
						Bạn đang xác nhận {orders.length} đơn hàng. Vui lòng kiểm tra
						kỹ trước khi xác nhận.
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{nonCreatedOrders.length > 0 && (
						<div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-900 dark:bg-yellow-950">
							<div className="flex items-start gap-2">
								<AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
								<div className="text-sm">
									<p className="font-medium text-yellow-800 dark:text-yellow-200">
										{nonCreatedOrders.length} đơn hàng không thể xác
										nhận
									</p>
									<p className="text-yellow-700 dark:text-yellow-300">
										Chỉ có thể xác nhận các đơn hàng ở trạng thái "Chờ
										xác nhận"
									</p>
								</div>
							</div>
						</div>
					)}

					{createdOrders.length > 0 && (
						<div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-900 dark:bg-green-950">
							<div className="flex items-start gap-2">
								<CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
								<div className="text-sm">
									<p className="font-medium text-green-800 dark:text-green-200">
										{createdOrders.length} đơn hàng sẽ được xác nhận
									</p>
									<p className="text-green-700 dark:text-green-300">
										Tổng giá trị: {formatCurrency(totalAmount)}
									</p>
								</div>
							</div>
						</div>
					)}

					<ScrollArea className="h-[300px] rounded-md border">
						<div className="space-y-2 p-4">
							{orders.map((order) => (
								<div
									key={order.id}
									className="flex items-center justify-between rounded-lg border bg-card p-3"
								>
									<div className="space-y-1">
										<p className="font-medium">
											Đơn hàng #{order.id}
										</p>
										<p className="text-sm text-muted-foreground">
											{order.customerName || "N/A"} •{" "}
											{order.itemCount} sản phẩm
										</p>
									</div>
									<div className="flex items-center gap-3">
										<p className="font-semibold">
											{formatCurrency(order.totalAmount)}
										</p>
										<OrderStatusBadge status={order.status} />
									</div>
								</div>
							))}
						</div>
					</ScrollArea>
				</div>

				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => onOpenChange(false)}
						disabled={isConfirming}
					>
						Hủy
					</Button>
					<Button
						onClick={onConfirm}
						disabled={isConfirming || createdOrders.length === 0}
					>
						{isConfirming
							? "Đang xác nhận..."
							: `Xác nhận ${createdOrders.length} đơn hàng`}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
