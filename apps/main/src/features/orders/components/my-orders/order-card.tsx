import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Package, Star, Store, Truck, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	ORDER_STATUS_INFO,
	OrderStatus,
	type OrderListItemDTO,
} from "../../types";
import { formatCurrency } from "@/lib/utils";

interface OrderCardProps {
	order: OrderListItemDTO;
	formatDateTime: (value: string) => string;
}

export function OrderCard({ order, formatDateTime }: OrderCardProps) {
	const statusInfo =
		ORDER_STATUS_INFO[order.status as OrderStatus] ||
		ORDER_STATUS_INFO.CREATED;

	const getShopBadge = () => {
		// In real app, this would come from order data
		return order.id % 2 === 0 ? "Star Shop" : "Mall";
	};

	return (
		<div className="bg-white shadow-md rounded-xl">
			{/* Shop Header */}
			<div className="flex items-center justify-between p-4 pb-2">
				<div className="flex items-center gap-2">
					<Store className="h-4 w-4 text-gray-600" />
					<span className="text-sm font-medium">{"Shop"}</span>
					<Badge
						variant="outline"
						className="bg-orange-100 text-orange-700 border-orange-200 text-xs px-2 py-0"
					>
						{getShopBadge()}
					</Badge>
					<ChevronRight className="h-4 w-4 text-gray-400" />
				</div>
				<span className="text-sm font-medium text-primary">
					{statusInfo.label}
				</span>
			</div>

			{/* Delivery Status */}
			<Link href={`/orders/${order.id}`}>
				<div className="px-4 py-2 hover:bg-gray-50 transition-colors">
					<div className="flex items-start gap-2 mb-2">
						<Truck className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
						<div className="flex-1">
							<p className="text-sm font-medium">
								{formatDateTime(order.createdAt).split(",")[0]}{" "}
								{statusInfo.label}
							</p>
							<p className="text-xs text-gray-600 mt-0.5">
								{statusInfo.description}
							</p>
						</div>
						<ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
					</div>

					{/* Product Info */}
					<div className="flex gap-3 py-3 border-t">
						<div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
							{order.firstItemImage ? (
								<Image
									src={order.firstItemImage}
									alt={order.firstItemName ?? "Sản phẩm"}
									fill
									className="object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center">
									<Package className="h-8 w-8 text-gray-300" />
								</div>
							)}
						</div>
						<div className="flex-1 min-w-0">
							<h3 className="text-sm line-clamp-2 mb-1">
								{order.firstItemName ?? "Sản phẩm"}
							</h3>
							<p className="text-xs text-gray-500 mb-2">
								Phân loại: {"Mặc định"}
							</p>
							<div className="flex items-center justify-between">
								<span className="text-xs">x{order.itemCount}</span>
								<span className="text-sm font-medium">
									{formatCurrency(order.totalAmount)}
								</span>
							</div>
						</div>
					</div>
					<div className="mb-2 ml-auto w-fit">
						<span className="text-sm text-gray-600">Tổng:</span>{" "}
						<span className="text-base font-semibold text-primary">
							{formatCurrency(order.totalAmount)}
						</span>
					</div>
				</div>
			</Link>

			<div className="flex justify-between items-center">
				<div className="px-4 py-3 ">
					<div className="flex items-center justify-between">
						<span className="text-sm text-gray-600">Đánh giá nhanh</span>
						<div className="flex gap-1">
							{[1, 2, 3, 4, 5].map((star) => (
								<button
									key={star}
									className="p-0.5 hover:scale-110 transition-transform"
								>
									<Star className="h-6 w-6 text-gray-300 hover:text-yellow-400" />
								</button>
							))}
						</div>
					</div>
				</div>
				{/* Total Section */}
				<div className="px-4 py-3 w-fit ml-auto">
					{/* Action Buttons */}
					<div className="flex gap-2 ">
						<Button
							variant="outline"
							className="flex-1 border-primary text-primary hover:bg-primary/5"
						>
							Viết đánh giá
						</Button>
						<Button className="flex-1 bg-primary hover:bg-primary/90">
							Mua lại
						</Button>
					</div>
				</div>
			</div>

			{/* Quick Rating */}
		</div>
	);
}
