"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CreditCard, Loader2, Package } from "lucide-react";
import Link from "next/link";
import { ORDER_STATUS_INFO, OrderDTO, OrderStatus } from "../../types";
import { formatCurrency } from "@/lib/utils";

export type PaymentInfo = {
	label: string;
	color: string;
};

interface OrderDetailSummaryProps {
	order: OrderDTO;
	isPending: boolean;
	isRefreshing: boolean;
	formatDateTime: (value?: string) => string;
	paymentInfo: PaymentInfo;
}

export function OrderDetailSummary({
	order,
	isPending,
	isRefreshing,
	formatDateTime,
	paymentInfo,
}: OrderDetailSummaryProps) {
	const statusInfo =
		ORDER_STATUS_INFO[order.status as OrderStatus] ||
		ORDER_STATUS_INFO.CREATED;

	return (
		<Card className="p-4">
			<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
				<div>
					<p className="text-sm text-muted-foreground">
						Mã đơn #{order.orderNumber}
					</p>
					<h1 className="text-2xl font-bold">Chi tiết đơn hàng</h1>
					<p className="text-sm text-gray-600">
						Tạo lúc {formatDateTime(order.createdAt)}
					</p>
				</div>
				<div className="flex flex-wrap gap-2">
					<Badge className={paymentInfo.color}>
						<CreditCard className="h-3 w-3 mr-1" />
						{paymentInfo.label}
					</Badge>
					<Badge className={statusInfo.color}>{statusInfo.label}</Badge>
					{isPending && isRefreshing && (
						<Badge variant="outline" className="flex items-center gap-1">
							<Loader2 className="h-3 w-3 animate-spin" />
							Đang cập nhật
						</Badge>
					)}
				</div>
			</div>
		</Card>
	);
}
