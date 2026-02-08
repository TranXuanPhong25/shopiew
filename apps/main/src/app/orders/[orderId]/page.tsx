"use client";

import { use, useEffect, useMemo } from "react";
import { useGetOrder } from "@/features/orders";
import {
	OrderDetailInfo,
	OrderDetailSummary,
	OrderItems,
	OrderPaymentSummary,
	OrderTimeline,
	OrderStatusBanner,
} from "@/features/orders/components";
import { ChevronLeft, Loader2, Package, PackageSearch } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/stores/order-store";
import { Card } from "@/components/ui/card";
import { OrderActions } from "@/features/orders/components/order-detail/order-actions";

interface OrderPageProps {
	params: Promise<{ orderId: string }>;
}

export default function OrderPage({ params }: OrderPageProps) {
	const { orderId } = use(params);
	const { data: order, isLoading, error, isRefetching } = useGetOrder(orderId);
	const pendingOrderId = useOrderStore((state) => state.pendingOrderId);
	const clearPendingOrderId = useOrderStore(
		(state) => state.clearPendingOrderId,
	);

	const paymentInfo = useMemo(() => {
		if (!order) return { label: "", color: "" };
		switch (order.paymentStatus) {
			case "PAID":
				return {
					label: "Đã thanh toán",
					color: "!bg-emerald-100 !text-emerald-800 ",
				};
			case "REFUNDED":
				return {
					label: "Đã hoàn tiền",
					color: "!bg-amber-100 !text-amber-800",
				};
			default:
				return {
					label: "Chưa thanh toán",
					color: "!bg-slate-100 !text-slate-800",
				};
		}
	}, [order]);

	const isPendingFromCart = pendingOrderId === orderId;

	useEffect(() => {
		if (order && isPendingFromCart) {
			clearPendingOrderId();
		}
	}, [order, isPendingFromCart, clearPendingOrderId]);

	if (isLoading) {
		return (
			<div className="min-h-[60vh] flex items-center justify-center">
				<div className="text-center">
					<Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
					<p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
				</div>
			</div>
		);
	}

	if (error) {
		if (isPendingFromCart) {
			return (
				<div className="min-h-[60vh] flex items-center justify-center">
					<div className="text-center">
						<div className="relative mb-6">
							<Package className="h-16 w-16 mx-auto text-blue-500" />
							<div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
								<Loader2 className="h-6 w-6 animate-spin text-blue-500" />
							</div>
						</div>
						<h2 className="text-xl font-semibold mb-2">
							Đơn hàng đang được tạo
						</h2>
						<p className="text-gray-600 mb-2">
							Hệ thống đang xử lý đơn hàng của bạn...
						</p>
						<p className="text-sm text-gray-500 mb-6">
							Vui lòng đợi trong giây lát
						</p>
						<Link href="/carts">
							<Button variant="outline">Quay lại giỏ hàng</Button>
						</Link>
					</div>
				</div>
			);
		}

		return (
			<div className="min-h-[60vh] flex items-center justify-center">
				<div className="text-center">
					<PackageSearch className="h-16 w-16 mx-auto mb-4 text-gray-400" />
					<h2 className="text-xl font-semibold mb-2">
						Không tìm thấy đơn hàng
					</h2>
					<p className="text-gray-600 mb-6">
						Đơn hàng không tồn tại hoặc đã bị xóa
					</p>
					<Link href="/carts">
						<Button variant="outline">Quay lại giỏ hàng</Button>
					</Link>
				</div>
			</div>
		);
	}

	if (!order) {
		if (isPendingFromCart) {
			return (
				<div className="min-h-[60vh] flex items-center justify-center">
					<div className="text-center">
						<div className="relative mb-6">
							<Package className="h-16 w-16 mx-auto text-blue-500" />
							<div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
								<Loader2 className="h-6 w-6 animate-spin text-blue-500" />
							</div>
						</div>
						<h2 className="text-xl font-semibold mb-2">
							Đơn hàng đang được tạo
						</h2>
						<p className="text-gray-600 mb-2">
							Hệ thống đang xử lý đơn hàng của bạn...
						</p>
						<p className="text-sm text-gray-500 mb-6">
							Vui lòng đợi trong giây lát
						</p>
						<Link href="/carts">
							<Button variant="outline">Quay lại giỏ hàng</Button>
						</Link>
					</div>
				</div>
			);
		}

		return (
			<div className="min-h-[60vh] flex items-center justify-center">
				<div className="text-center">
					<PackageSearch className="h-16 w-16 mx-auto mb-4 text-gray-400" />
					<h2 className="text-xl font-semibold mb-2">
						Không tìm thấy đơn hàng
					</h2>
					<p className="text-gray-600 mb-6">
						Đơn hàng không tồn tại hoặc đã bị xóa
					</p>
					<Link href="/carts">
						<Button variant="outline">Quay lại giỏ hàng</Button>
					</Link>
				</div>
			</div>
		);
	}

	const isPending =
		order.status === "CREATED" ||
		order.status === "CONFIRMED" ||
		order.status === "PROCESSING";

	const formatDateTime = (value?: string) =>
		value
			? new Date(value).toLocaleString("vi-VN", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit",
				})
			: "";

	return (
		<div className="max-w-7xl mx-auto px-4">
			<Link href={"/orders"} className="flex w-fit py-4 text-blue-500">
				<ChevronLeft />
				Đơn hàng của tôi
			</Link>
			<div className="pb-8 space-y-6">
				<OrderStatusBanner order={order} />

				<div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
					<div className="space-y-4">
						<OrderItems order={order} />
						<OrderPaymentSummary order={order} />
						<OrderTimeline
							order={order}
							formatDateTime={formatDateTime}
						/>
					</div>
					<div className="space-y-4">
						<OrderDetailInfo
							order={order}
							paymentLabel={paymentInfo.label}
							formatDateTime={formatDateTime}
						/>
						<OrderActions order={order} />
					</div>
				</div>
			</div>
		</div>
	);
}
