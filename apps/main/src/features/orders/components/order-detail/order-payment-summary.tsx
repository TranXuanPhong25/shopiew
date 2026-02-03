"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { OrderDTO } from "../../types";
import { ChevronDown, ChevronUp } from "lucide-react";

interface OrderPaymentSummaryProps {
	order: OrderDTO;
}

export function OrderPaymentSummary({ order }: OrderPaymentSummaryProps) {
	const [open, setOpen] = useState(false);
	console.log(order.discount);
	return (
		<Card className="p-4">
			<button
				type="button"
				onClick={() => setOpen((prev) => !prev)}
				className="w-full flex items-center justify-between"
				aria-expanded={open}
			>
				<div>
					<h2 className="font-semibold">Thành tiền</h2>
				</div>
				<div className="flex items-center gap-3">
					<span className="text-lg font-semibold text-red-500">
						{formatCurrency(order.totalAmount)}
					</span>
					{open ? (
						<ChevronUp className="h-5 w-5 text-gray-500" />
					) : (
						<ChevronDown className="h-5 w-5 text-gray-500" />
					)}
				</div>
			</button>
			{open && (
				<div className="mt-4 space-y-2 text-sm">
					<div className="flex justify-between">
						<span className="text-gray-600">Tạm tính</span>
						<span>{formatCurrency(order.subtotal)}</span>
					</div>
					<div className="flex justify-between">
						<span className="text-gray-600">Phí vận chuyển</span>
						<span>{formatCurrency(order.shippingFee)}</span>
					</div>
					<Separator className="my-2" />
					<div className="flex justify-between text-base font-semibold">
						<span>Tổng thanh toán</span>
						<span className="text-red-500">
							{formatCurrency(order.totalAmount)}
						</span>
					</div>
				</div>
			)}
		</Card>
	);
}
