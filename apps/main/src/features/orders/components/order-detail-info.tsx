"use client";

import { Card } from "@/components/ui/card";
import { Truck, User, Phone, MapPin, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ORDER_STATUS_INFO, OrderDTO, OrderStatus } from "../types";
import { Separator } from "@/components/ui/separator";

interface OrderDetailInfoProps {
	order: OrderDTO;
	paymentLabel: string;
	formatDateTime: (value?: string) => string;
}

export function OrderDetailInfo({
	order,
	paymentLabel,
	formatDateTime,
}: OrderDetailInfoProps) {
	const paymentStatusBadge =
		order.paymentStatus === "PAID"
			? "!bg-emerald-100 !text-emerald-800"
			: order.paymentStatus === "REFUNDED"
				? "!bg-amber-100 !text-amber-800"
				: "!bg-slate-100 !text-slate-800";

	const statusInfo =
		ORDER_STATUS_INFO[order.status as OrderStatus] ||
		ORDER_STATUS_INFO.CREATED;

	return (
		<div>
			<Card className="p-4 mb-4">
				<h2 className="font-semibold mb-4 flex items-center gap-2">
					<Truck className="h-5 w-5" />
					Thông tin vận chuyển
				</h2>
				<Separator />
				<div className="mt-2">
					<h2 className="font-medium">Địa chỉ nhận hàng</h2>
					<div className="flex items-center gap-2 ">
						<MapPin className="size-6 mt-0.5 text-gray-500" />
						<div>
							<div>
								<span className="mr-2">{order.recipientName}</span>
								<span className="text-gray-400">
									{order.recipientPhone}
								</span>
							</div>
							<p className="text-gray-500">{order.deliveryAddress}</p>
						</div>
					</div>
				</div>
			</Card>

			<Card className="p-4">
				<h2 className="font-semibold mb-4 flex items-center gap-2">
					<CreditCard className="h-5 w-5" />
					Thanh toán
				</h2>
				<div className="space-y-3 text-sm">
					<div className="flex justify-between">
						<span className="text-gray-600">Phương thức</span>
						<span className="font-medium">
							{order.paymentMethod === "COD" &&
								"Thanh toán khi nhận hàng"}
							{order.paymentMethod === "BANK_TRANSFER" && "Chuyển khoản"}
							{order.paymentMethod === "E_WALLET" && "Ví điện tử"}
							{order.paymentMethod === "CREDIT_CARD" && "Thẻ tín dụng"}
							{!order.paymentMethod && "Không rõ"}
						</span>
					</div>
					<div className="flex items-center justify-between">
						<span className="text-gray-600">Trạng thái</span>
						<Badge className={paymentStatusBadge}>{paymentLabel}</Badge>
					</div>
					{order.paidAt && (
						<div className="flex justify-between">
							<span className="text-gray-600">Thanh toán lúc</span>
							<span>{formatDateTime(order.paidAt)}</span>
						</div>
					)}
					<div className="flex items-center justify-between">
						<span className="text-gray-600">Trạng thái đơn</span>
						<Badge className={statusInfo.color}>{statusInfo.label}</Badge>
					</div>
				</div>
			</Card>
		</div>
	);
}
