"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Copy, Check } from "lucide-react";
import { OrderDTO } from "../../types";
import { useState } from "react";
import { createCopyHandler } from "@/utils/clipboard";

interface OrderTimelineProps {
	order: OrderDTO;
	formatDateTime: (value?: string) => string;
}

export function OrderTimeline({ order, formatDateTime }: OrderTimelineProps) {
	const [copied, setCopied] = useState(false);
	const handleCopy = createCopyHandler(order.orderNumber, setCopied);

	return (
		<Card className="p-4">
			<div className="mb-4">
				<h2 className="font-semibold flex items-center gap-2">
					<Clock className="h-5 w-5" />
					Chi tiết đơn hàng
				</h2>
				<div className="flex items-center gap-2 mt-1">
					<p className="text-sm text-gray-600">
						Mã đơn hàng:{" "}
						<span className="font-medium text-gray-900">
							{order.orderNumber}
						</span>
					</p>
					<Button
						variant="ghost"
						size="sm"
						className="h-6 w-6 p-0"
						onClick={handleCopy}
						title={copied ? "Đã copy" : "Copy mã đơn hàng"}
					>
						{copied ? (
							<Check className="h-3.5 w-3.5 text-green-600" />
						) : (
							<Copy className="h-3.5 w-3.5 text-gray-500" />
						)}
					</Button>
				</div>
			</div>
			<div className="border-t pt-4">
				<h3 className="font-medium text-sm mb-3">Lịch sử</h3>
			</div>
			<div className="space-y-3 text-sm">
				<div className="flex items-center gap-3">
					<div className="w-2 h-2 rounded-full bg-blue-500" />
					<span className="text-gray-600">Đơn hàng được tạo</span>
					<span className="ml-auto">
						{formatDateTime(order.createdAt)}
					</span>
				</div>
				{order.confirmedAt && (
					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-indigo-500" />
						<span className="text-gray-600">Đã xác nhận</span>
						<span className="ml-auto">
							{formatDateTime(order.confirmedAt)}
						</span>
					</div>
				)}
				{order.processingAt && (
					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-yellow-500" />
						<span className="text-gray-600">Đang xử lý</span>
						<span className="ml-auto">
							{formatDateTime(order.processingAt)}
						</span>
					</div>
				)}
				{order.shippedAt && (
					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-purple-500" />
						<span className="text-gray-600">Đang giao hàng</span>
						<span className="ml-auto">
							{formatDateTime(order.shippedAt)}
						</span>
					</div>
				)}
				{order.deliveredAt && (
					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-green-500" />
						<span className="text-gray-600">Đã giao hàng</span>
						<span className="ml-auto">
							{formatDateTime(order.deliveredAt)}
						</span>
					</div>
				)}
				{order.completedAt && (
					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-green-600" />
						<span className="text-gray-600">Hoàn thành</span>
						<span className="ml-auto">
							{formatDateTime(order.completedAt)}
						</span>
					</div>
				)}
				{order.cancelledAt && (
					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-red-500" />
						<span className="text-gray-600">Đã hủy</span>
						<span className="ml-auto">
							{formatDateTime(order.cancelledAt)}
						</span>
					</div>
				)}
			</div>
		</Card>
	);
}
