"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Package } from "lucide-react";
import { OrderDTO } from "../types";
import { formatCurrency } from "@/lib/utils";

interface OrderItemsProps {
	order: OrderDTO;
}

export function OrderItems({ order }: OrderItemsProps) {
	return (
		<Card className="p-4">
			<h2 className="font-semibold mb-4 flex items-center gap-2">
				<Package className="h-5 w-5" />
				Sản phẩm đã đặt ({order.orderItems.length})
			</h2>
			<div className="space-y-4">
				{order.orderItems.map((item, index) => (
					<div
						key={index}
						className="flex gap-4 py-3 border-b last:border-b-0"
					>
						<div className="relative w-20 h-20 flex-shrink-0">
							<Image
								src={item.imageUrl || "/placeholder.svg"}
								alt={item.productName}
								fill
								className="object-cover rounded-lg"
							/>
						</div>
						<div className="flex-1 min-w-0">
							<h3 className="font-medium line-clamp-2">
								{item.productName}
							</h3>
							{item.variantName && (
								<p className="text-sm text-gray-500">
									Phân loại: {item.variantName}
								</p>
							)}
							<p className="text-sm text-gray-500">x{item.quantity}</p>
						</div>
						<div className="text-right">
							<p className="font-medium text-red-500">
								{formatCurrency(item.salePrice)}
							</p>
							{item.originalPrice > item.salePrice && (
								<p className="text-sm text-gray-400 line-through">
									{formatCurrency(item.originalPrice)}
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</Card>
	);
}
