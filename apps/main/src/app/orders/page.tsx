"use client";

import { useState } from "react";
import { useGetOrders, type OrderStatus } from "@/features/orders";
import {
	OrdersSearchBar,
	OrdersTabFilters,
	OrdersLoading,
	OrdersError,
	OrdersEmpty,
	OrderCard,
	OrdersPagination,
} from "@/features/orders/components";

export default function OrdersPage() {
	const [page, setPage] = useState(0);
	const [size] = useState(6);
	const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
	const { data, isLoading, error, refetch } = useGetOrders({ page, size });

	const orders = data?.content ?? [];
	const totalPages = data?.totalPages ?? 0;
	const totalElements = data?.totalElements ?? 0;

	const formatDateTime = (value: string) => {
		return new Date(value).toLocaleString("vi-VN", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	// Filter orders by status
	const filteredOrders =
		statusFilter === "ALL"
			? orders
			: orders.filter((order) => order.status === statusFilter);

	return (
		<div className="max-w-7xl  mx-auto py-4 px-4 min-h-screen bg-gray-50">
			<div className="sticky top-4 z-10">
				<OrdersSearchBar />
				<OrdersTabFilters
					activeFilter={statusFilter}
					onFilterChange={setStatusFilter}
				/>
			</div>

			{isLoading && (
				<div className="mt-4">
					<OrdersLoading />
				</div>
			)}

			{error && !isLoading && (
				<div className="mt-4 px-4">
					<OrdersError onRetry={refetch} />
				</div>
			)}

			{!isLoading && !error && filteredOrders.length === 0 && (
				<div className="mt-4 px-4">
					<OrdersEmpty />
				</div>
			)}

			{!isLoading && !error && filteredOrders.length > 0 && (
				<div className="mt-4">
					<div className=" grid grid-cols-2 gap-4">
						{filteredOrders.map((order) => (
							<OrderCard
								key={order.id}
								order={order}
								formatDateTime={formatDateTime}
							/>
						))}
					</div>
					{totalPages > 1 && (
						<div className="px-4 py-6">
							<OrdersPagination
								page={page}
								size={size}
								totalPages={totalPages}
								totalElements={totalElements}
								onPageChange={setPage}
							/>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
