import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/types/order";
import { Filter, X } from "lucide-react";

export interface OrderFilterValues {
	status?: OrderStatus;
	shopId?: string;
	search?: string;
	dateFrom?: string;
	dateTo?: string;
}

interface OrderFiltersProps {
	filters: OrderFilterValues;
	onFiltersChange: (filters: OrderFilterValues) => void;
	shops?: Array<{ id: string; name: string }>;
}

export function OrderFilters({
	filters,
	onFiltersChange,
	shops = [],
}: OrderFiltersProps) {
	const handleStatusChange = (value: string) => {
		onFiltersChange({
			...filters,
			status: value === "all" ? undefined : (value as OrderStatus),
		});
	};

	const handleShopChange = (value: string) => {
		onFiltersChange({
			...filters,
			shopId: value === "all" ? undefined : value,
		});
	};

	const handleSearchChange = (value: string) => {
		onFiltersChange({
			...filters,
			search: value || undefined,
		});
	};

	const handleDateFromChange = (value: string) => {
		onFiltersChange({
			...filters,
			dateFrom: value || undefined,
		});
	};

	const handleDateToChange = (value: string) => {
		onFiltersChange({
			...filters,
			dateTo: value || undefined,
		});
	};

	return (
		<div className="rounded-lg border bg-card p-4  flex gap-4 flex-wrap">
			{shops.length > 0 && (
				<div className="space-y-2">
					<Label htmlFor="shop-filter">Cửa hàng</Label>
					<Select
						value={filters.shopId || "all"}
						onValueChange={handleShopChange}
					>
						<SelectTrigger id="shop-filter">
							<SelectValue placeholder="Tất cả" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">Tất cả</SelectItem>
							{shops.map((shop) => (
								<SelectItem key={shop.id} value={shop.id}>
									{shop.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			)}

			<div className="space-y-2 flex-1">
				<Label htmlFor="search-filter">Tìm kiếm</Label>
				<Input
					id="search-filter"
					placeholder="Tìm theo mã đơn, tên khách hàng..."
					value={filters.search || ""}
					onChange={(e) => handleSearchChange(e.target.value)}
				/>
			</div>

			<div className="flex gap-4">
				<div className="space-y-2">
					<Label htmlFor="date-from">Từ ngày</Label>
					<Input
						id="date-from"
						type="date"
						value={filters.dateFrom || ""}
						onChange={(e) => handleDateFromChange(e.target.value)}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="date-to">Đến ngày</Label>
					<Input
						id="date-to"
						type="date"
						value={filters.dateTo || ""}
						onChange={(e) => handleDateToChange(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
}
