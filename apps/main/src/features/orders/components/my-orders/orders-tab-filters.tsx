import { OrderStatus } from "../../types";

interface OrdersTabFiltersProps {
	activeFilter: OrderStatus | "ALL";
	onFilterChange: (filter: OrderStatus | "ALL") => void;
}

const FILTERS = [
	{ value: "ALL" as const, label: "Tất cả" },
	{ value: "CREATED" as const, label: "Vừa tạo" },
	{ value: "UNCONFIRMED" as const, label: "Chờ xác nhận" },
	{ value: "CONFIRMED" as const, label: "Đã xác nhận" },
	{ value: "PROCESSING" as const, label: "Đang xử lý" },
	{ value: "SHIPPING" as const, label: "Chờ vận chuyển" },
	{ value: "DELIVERED" as const, label: "Chờ nhận" },
	{ value: "COMPLETED" as const, label: "Cần đánh giá" },
	{ value: "CANCELLED" as const, label: "Đã hủy" },
	{ value: "RETURNED" as const, label: "Trả hàng" },
	{ value: "REFUNDED" as const, label: "Đã hoàn tiền" },
];

export function OrdersTabFilters({
	activeFilter,
	onFilterChange,
}: OrdersTabFiltersProps) {
	return (
		<div className=" z-10 bg-white border-b">
			<div className="flex items-center overflow-x-auto scrollbar-hide px-4">
				{FILTERS.map((filter) => (
					<button
						key={filter.value}
						onClick={() => onFilterChange(filter.value)}
						className={`flex-shrink-0 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors flex-1 ${
							activeFilter === filter.value
								? "text-primary border-b-2 border-primary"
								: "text-gray-600 hover:text-gray-900"
						}`}
					>
						{filter.label}
					</button>
				))}
			</div>
		</div>
	);
}
