"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useOrders, useConfirmOrders } from "@/hooks/use-orders";
import {
	OrderFilters,
	type OrderFilterValues,
} from "@/components/orders/order-filters";
import { OrderTableView } from "@/components/orders/order-table-view";
import { OrderCardView } from "@/components/orders/order-card-view";
import { ViewToggle, type ViewMode } from "@/components/orders/view-toggle";
import { BulkActionsBar } from "@/components/orders/bulk-actions-bar";
import { ConfirmOrdersDialog } from "@/components/orders/confirm-orders-dialog";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCcw, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { OrderStatus, type OrderListItemDTO } from "@/types/order";

export default function PendingConfirmationPage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	// View mode
	const [viewMode, setViewMode] = useState<ViewMode>("table");

	// Filters from URL
	const [filters, setFilters] = useState<OrderFilterValues>({
		status: OrderStatus.UNCONFIRMED, // Default to UNCONFIRMED orders
	});

	// Pagination
	const currentPage = parseInt(searchParams.get("page") || "0");
	const pageSize = parseInt(searchParams.get("size") || "20");

	// Selection
	const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);

	// Hooks
	const { orders, loading, error, pageInfo, fetchOrders, refetch } =
		useOrders();
	const { confirmOrders, loading: isConfirming } = useConfirmOrders();

	// TODO: Get userId from auth context
	const userId = "temp-user-id";

	// Fetch orders on mount and when filters/page change
	useEffect(() => {
		fetchOrders({
			userId,
			status: filters.status,
			shopId: filters.shopId,
			page: currentPage,
			size: pageSize,
		});
	}, [filters, currentPage, pageSize, userId, fetchOrders]);

	// Update URL when page changes
	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", newPage.toString());
		router.push(`?${params.toString()}`);
	};

	// Handle filters change
	const handleFiltersChange = (newFilters: OrderFilterValues) => {
		setFilters(newFilters);
		// Reset to page 0 when filters change
		if (currentPage !== 0) {
			const params = new URLSearchParams(searchParams);
			params.set("page", "0");
			router.push(`?${params.toString()}`);
		}
	};

	// Selection handlers
	const handleSelectOrder = (orderId: number, selected: boolean) => {
		setSelectedIds((prev) => {
			const newSet = new Set(prev);
			if (selected) {
				newSet.add(orderId);
			} else {
				newSet.delete(orderId);
			}
			return newSet;
		});
	};

	const handleSelectAll = (selected: boolean) => {
		if (selected) {
			setSelectedIds(new Set(orders.map((o) => o.id)));
		} else {
			setSelectedIds(new Set());
		}
	};

	const handleClearSelection = () => {
		setSelectedIds(new Set());
	};

	// Confirm orders
	const handleConfirmClick = () => {
		setShowConfirmDialog(true);
	};

	const handleConfirm = async () => {
		const orderIds = Array.from(selectedIds);
		if (orderIds.length === 0) return;

		try {
			const response = await confirmOrders(orderIds);

			if (response.successCount > 0) {
				toast.success(
					`Đã xác nhận thành công ${response.successCount} đơn hàng`,
				);
			}

			if (response.failedCount > 0) {
				toast.error(`${response.failedCount} đơn hàng không thể xác nhận`, {
					description: response.failedOrders
						.map((f) => f.reason)
						.join(", "),
				});
			}

			// Refresh orders and clear selection
			await refetch();
			setSelectedIds(new Set());
			setShowConfirmDialog(false);
		} catch (err) {
			toast.error("Có lỗi xảy ra khi xác nhận đơn hàng");
			console.error("Confirm error:", err);
		}
	};

	const selectedOrders = orders.filter((o) => selectedIds.has(o.id));

	return (
		<div className="space-y-6 py-3">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Đơn hàng cần xác nhận
					</h1>
					<p className="text-muted-foreground">
						Quản lý và xác nhận các đơn hàng đang chờ xử lý
					</p>
				</div>
				<div className="flex items-center gap-3">
					<Button
						variant="outline"
						size="icon"
						onClick={refetch}
						disabled={loading}
					>
						<RefreshCcw
							className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
						/>
					</Button>
					<ViewToggle view={viewMode} onViewChange={setViewMode} />
				</div>
			</div>

			{/* Filters */}
			<OrderFilters
				filters={filters}
				onFiltersChange={handleFiltersChange}
			/>

			{/* Error state */}
			{error && (
				<div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
					<div className="flex items-start gap-2">
						<AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
						<div>
							<p className="font-medium text-red-800 dark:text-red-200">
								Không thể tải đơn hàng
							</p>
							<p className="text-sm text-red-700 dark:text-red-300">
								{error.message}
							</p>
						</div>
					</div>
				</div>
			)}

			{/* Loading state */}
			{loading && (
				<div className="space-y-3">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
				</div>
			)}

			{/* Orders list */}
			{!loading && !error && (
				<>
					{viewMode === "table" ? (
						<OrderTableView
							orders={orders}
							selectedIds={selectedIds}
							onSelectOrder={handleSelectOrder}
							onSelectAll={handleSelectAll}
						/>
					) : (
						<OrderCardView
							orders={orders}
							selectedIds={selectedIds}
							onSelectOrder={handleSelectOrder}
						/>
					)}

					{/* Pagination */}
					{pageInfo && pageInfo.totalPages > 1 && (
						<Pagination
							currentPage={currentPage + 1}
							totalPages={pageInfo.totalPages}
							onPageChangeAction={(page) => handlePageChange(page - 1)}
						/>
					)}

					{/* Results count */}
					{pageInfo && (
						<p className="text-center text-sm text-muted-foreground">
							Hiển thị {orders.length} trong tổng số{" "}
							{pageInfo.totalElements} đơn hàng
						</p>
					)}
				</>
			)}

			{/* Bulk actions bar */}
			<BulkActionsBar
				selectedCount={selectedIds.size}
				onConfirm={handleConfirmClick}
				onClear={handleClearSelection}
				isConfirming={isConfirming}
			/>

			{/* Confirm dialog */}
			<ConfirmOrdersDialog
				open={showConfirmDialog}
				onOpenChange={setShowConfirmDialog}
				orders={selectedOrders}
				onConfirm={handleConfirm}
				isConfirming={isConfirming}
			/>
		</div>
	);
}
