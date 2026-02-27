"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
	useOrders,
	OrderFilters,
	OrderTableView,
	OrderCardView,
	ViewToggle,
	OrderStatus,
	ShippingLabelPrintDialog,
	type OrderFilterValues,
	type ViewMode,
	type OrderListItemDTO,
} from "@/features/orders";
import { useAuth } from "@/features/auth";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
	RefreshCcw,
	AlertCircle,
	Truck,
	Info,
	Printer,
	X,
	CheckCircle2,
} from "lucide-react";

export default function ReadyToShipPage() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [viewMode, setViewMode] = useState<ViewMode>("table");
	const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
	const [printDialogOpen, setPrintDialogOpen] = useState(false);

	const [filters, setFilters] = useState<OrderFilterValues>({
		status: OrderStatus.READY_TO_SHIP,
	});

	const currentPage = parseInt(searchParams.get("page") || "0");
	const pageSize = parseInt(searchParams.get("size") || "20");

	const { user, shop } = useAuth();
	const { orders, loading, error, pageInfo, refetch } = useOrders({
		userId: user?.userId || "",
		status: filters.status,
		shopId: filters.shopId || shop?.id,
		page: currentPage,
		size: pageSize,
	});

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams);
		params.set("page", newPage.toString());
		router.push(`?${params.toString()}`);
	};

	const handleFiltersChange = (newFilters: OrderFilterValues) => {
		setFilters(newFilters);
		if (currentPage !== 0) {
			const params = new URLSearchParams(searchParams);
			params.set("page", "0");
			router.push(`?${params.toString()}`);
		}
	};

	const handleSelectOrder = (orderId: number, selected: boolean) => {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (selected) next.add(orderId);
			else next.delete(orderId);
			return next;
		});
	};

	const handleSelectAll = (selected: boolean) => {
		setSelectedIds(selected ? new Set(orders.map((o) => o.id)) : new Set());
	};

	const selectedOrders: OrderListItemDTO[] = orders.filter((o) =>
		selectedIds.has(o.id),
	);

	return (
		<div className="space-y-6 py-3">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight">
						<Truck className="h-8 w-8 text-teal-500" />
						Chờ shipper lấy hàng
					</h1>
					<p className="text-muted-foreground">
						Các đơn đã đóng gói xong, đang chờ shipper đến lấy
					</p>
				</div>
				<div className="flex items-center gap-3">
					{selectedIds.size > 0 && (
						<Button
							onClick={() => setPrintDialogOpen(true)}
							className="gap-2"
						>
							<Printer className="h-4 w-4" />
							In phiếu ({selectedIds.size})
						</Button>
					)}
					<Button
						variant="outline"
						size="icon"
						onClick={() => refetch()}
						disabled={loading}
					>
						<RefreshCcw
							className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
						/>
					</Button>
					<ViewToggle view={viewMode} onViewChange={setViewMode} />
				</div>
			</div>

			{/* Info banner */}
			<div className="flex items-start gap-3 rounded-lg border border-teal-200 bg-teal-50 p-4 dark:border-teal-800 dark:bg-teal-950">
				<Info className="mt-0.5 h-5 w-5 shrink-0 text-teal-600 dark:text-teal-400" />
				<div className="text-sm text-teal-800 dark:text-teal-200">
					<p className="font-medium">
						Shipper sẽ đến lấy hàng trong 24 giờ tới
					</p>
					<p className="text-teal-700 dark:text-teal-300">
						Chọn đơn hàng và nhấn{" "}
						<strong>In phiếu</strong> để in phiếu giao hàng. Dán phiếu lên
						kiện hàng trước khi shipper đến lấy.
					</p>
				</div>
			</div>

			<OrderFilters
				filters={filters}
				onFiltersChange={handleFiltersChange}
			/>

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

			{loading && (
				<div className="space-y-3">
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
					<Skeleton className="h-12 w-full" />
				</div>
			)}

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

					{pageInfo && pageInfo.totalPages > 1 && (
						<Pagination
							currentPage={currentPage + 1}
							totalPages={pageInfo.totalPages}
							onPageChangeAction={(page) => handlePageChange(page - 1)}
						/>
					)}

					{pageInfo && (
						<p className="text-center text-sm text-muted-foreground">
							Hiển thị {orders.length} trong tổng số{" "}
							{pageInfo.totalElements} đơn hàng
						</p>
					)}

					{!loading && orders.length === 0 && (
						<div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
							<Truck className="mb-4 h-12 w-12 text-muted-foreground/40" />
							<p className="font-medium text-muted-foreground">
								Không có đơn nào đang chờ shipper
							</p>
							<p className="text-sm text-muted-foreground">
								Các đơn đã xác nhận sẵn sàng giao sẽ xuất hiện ở đây
							</p>
						</div>
					)}
				</>
			)}

			{/* Floating bulk action bar */}
			{selectedIds.size > 0 && (
				<div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 animate-in slide-in-from-bottom-4">
					<div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 shadow-lg">
						<div className="flex items-center gap-2">
							<CheckCircle2 className="h-5 w-5 text-teal-500" />
							<span className="font-medium">
								Đã chọn{" "}
								<span className="text-teal-600">{selectedIds.size}</span> đơn
								hàng
							</span>
						</div>
						<div className="h-6 w-px bg-border" />
						<Button
							size="sm"
							className="h-9 gap-2"
							onClick={() => setPrintDialogOpen(true)}
						>
							<Printer className="h-4 w-4" />
							In phiếu giao hàng
						</Button>
						<Button
							variant="ghost"
							size="sm"
							className="h-9"
							onClick={() => setSelectedIds(new Set())}
						>
							<X className="h-4 w-4" />
						</Button>
					</div>
				</div>
			)}

			<ShippingLabelPrintDialog
				orders={selectedOrders}
				open={printDialogOpen}
				onOpenChange={setPrintDialogOpen}
			/>
		</div>
	);
}

