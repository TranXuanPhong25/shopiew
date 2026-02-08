"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/features/auth";
import {
	useOrders,
	OrderFilters,
	OrderTableView,
	OrderCardView,
	ViewToggle,
	OrderStatus,
	type OrderFilterValues,
	type ViewMode,
} from "@/features/orders";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCcw, AlertCircle } from "lucide-react";

export default function CompletedPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { user, shop } = useAuth();

	const [viewMode, setViewMode] = useState<ViewMode>("table");

	const [filters, setFilters] = useState<OrderFilterValues>({
		status: OrderStatus.DELIVERED,
	});

	const currentPage = parseInt(searchParams.get("page") || "0");
	const pageSize = parseInt(searchParams.get("size") || "20");

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

	return (
		<div className="space-y-6 py-3">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">
						Đơn hàng hoàn thành
					</h1>
					<p className="text-muted-foreground">
						Các đơn hàng đã giao thành công đến khách hàng
					</p>
				</div>
				<div className="flex items-center gap-3">
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
							selectedIds={new Set()}
							onSelectOrder={() => {}}
							onSelectAll={() => {}}
						/>
					) : (
						<OrderCardView
							orders={orders}
							selectedIds={new Set()}
							onSelectOrder={() => {}}
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
				</>
			)}
		</div>
	);
}
