"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Package,
	Clock,
	CheckCircle,
	Truck,
	XCircle,
	RotateCcw,
	TrendingUp,
	DollarSign,
} from "lucide-react";
import { useOrderStats } from "@/features/orders";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/features/auth";

const OrdersPage = () => {
	const { shop } = useAuth();
	const { stats, loading } = useOrderStats(shop?.id || "");
	const displayStats = stats || {
		totalOrders: 0,
		pendingConfirmation: 0,
		processing: 0,
		shipping: 0,
		completed: 0,
		cancelled: 0,
		returns: 0,
		totalRevenue: 0,
	};

	return (
		<div className="space-y-6 p-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">
					Quản lý đơn hàng
				</h1>
				<p className="text-muted-foreground">
					Theo dõi và quản lý tất cả đơn hàng của cửa hàng
				</p>
			</div>

			{/* Overview Stats */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Tổng đơn hàng
						</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{loading ? (
							<Skeleton className="h-8 w-16" />
						) : (
							<div className="text-2xl font-bold">
								{displayStats.totalOrders}
							</div>
						)}
						<p className="text-xs text-muted-foreground">
							Tất cả đơn hàng
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Doanh thu
						</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{loading ? (
							<Skeleton className="h-8 w-24" />
						) : (
							<div className="text-2xl font-bold">
								{new Intl.NumberFormat("vi-VN", {
									style: "currency",
									currency: "VND",
									maximumFractionDigits: 0,
								}).format(displayStats.totalRevenue)}
							</div>
						)}
						<p className="text-xs text-muted-foreground">
							Tổng doanh thu
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Hoàn thành
						</CardTitle>
						<TrendingUp className="h-4 w-4 text-green-500" />
					</CardHeader>
					<CardContent>
						{loading ? (
							<Skeleton className="h-8 w-12" />
						) : (
							<div className="text-2xl font-bold">
								{displayStats.completed}
							</div>
						)}
						<p className="text-xs text-muted-foreground">
							Đơn đã giao thành công
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Hủy / Trả hàng
						</CardTitle>
						<RotateCcw className="h-4 w-4 text-orange-500" />
					</CardHeader>
					<CardContent>
						{loading ? (
							<Skeleton className="h-8 w-12" />
						) : (
							<div className="text-2xl font-bold">
								{displayStats.cancelled + displayStats.returns}
							</div>
						)}
						<p className="text-xs text-muted-foreground">
							{displayStats.cancelled} hủy, {displayStats.returns} trả
							hàng
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Order Status Cards */}
			<div>
				<h2 className="mb-4 text-xl font-semibold">Trạng thái đơn hàng</h2>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					<Link href="/orders/pending-confirmation">
						<Card className="cursor-pointer transition-all hover:shadow-md hover:border-orange-300">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Chờ xác nhận
								</CardTitle>
								<Clock className="h-4 w-4 text-orange-500" />
							</CardHeader>
							<CardContent>
								{loading ? (
									<Skeleton className="h-8 w-12" />
								) : (
									<div className="text-2xl font-bold">
										{displayStats.pendingConfirmation}
									</div>
								)}
								<p className="text-xs text-muted-foreground">
									Đơn hàng cần xử lý ngay
								</p>
							</CardContent>
						</Card>
					</Link>

					<Link href="/orders/processing">
						<Card className="cursor-pointer transition-all hover:shadow-md hover:border-blue-300">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Đang xử lý
								</CardTitle>
								<Package className="h-4 w-4 text-blue-500" />
							</CardHeader>
							<CardContent>
								{loading ? (
									<Skeleton className="h-8 w-12" />
								) : (
									<div className="text-2xl font-bold">
										{displayStats.processing}
									</div>
								)}
								<p className="text-xs text-muted-foreground">
									Đang chuẩn bị hàng
								</p>
							</CardContent>
						</Card>
					</Link>

					<Link href="/orders/shipping">
						<Card className="cursor-pointer transition-all hover:shadow-md hover:border-purple-300">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Đang giao
								</CardTitle>
								<Truck className="h-4 w-4 text-purple-500" />
							</CardHeader>
							<CardContent>
								{loading ? (
									<Skeleton className="h-8 w-12" />
								) : (
									<div className="text-2xl font-bold">
										{displayStats.shipping}
									</div>
								)}
								<p className="text-xs text-muted-foreground">
									Đang vận chuyển
								</p>
							</CardContent>
						</Card>
					</Link>

					<Link href="/orders/completed">
						<Card className="cursor-pointer transition-all hover:shadow-md hover:border-green-300">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Hoàn thành
								</CardTitle>
								<CheckCircle className="h-4 w-4 text-green-500" />
							</CardHeader>
							<CardContent>
								{loading ? (
									<Skeleton className="h-8 w-12" />
								) : (
									<div className="text-2xl font-bold">
										{displayStats.completed}
									</div>
								)}
								<p className="text-xs text-muted-foreground">
									Đã giao thành công
								</p>
							</CardContent>
						</Card>
					</Link>

					<Link href="/orders/cancelled">
						<Card className="cursor-pointer transition-all hover:shadow-md hover:border-red-300">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Đã hủy
								</CardTitle>
								<XCircle className="h-4 w-4 text-red-500" />
							</CardHeader>
							<CardContent>
								{loading ? (
									<Skeleton className="h-8 w-12" />
								) : (
									<div className="text-2xl font-bold">
										{displayStats.cancelled}
									</div>
								)}
								<p className="text-xs text-muted-foreground">
									Đơn bị hủy
								</p>
							</CardContent>
						</Card>
					</Link>

					<Link href="/orders/returns">
						<Card className="cursor-pointer transition-all hover:shadow-md hover:border-amber-300">
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">
									Trả hàng
								</CardTitle>
								<RotateCcw className="h-4 w-4 text-amber-500" />
							</CardHeader>
							<CardContent>
								{loading ? (
									<Skeleton className="h-8 w-12" />
								) : (
									<div className="text-2xl font-bold">
										{displayStats.returns}
									</div>
								)}
								<p className="text-xs text-muted-foreground">
									Yêu cầu hoàn trả
								</p>
							</CardContent>
						</Card>
					</Link>
				</div>
			</div>

			{/* Quick Actions */}
			<div>
				<h2 className="mb-4 text-xl font-semibold">Hành động nhanh</h2>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					<Card>
						<CardHeader>
							<CardTitle className="text-base">
								Xem tất cả đơn hàng
							</CardTitle>
							<CardDescription>
								Xem danh sách đầy đủ tất cả đơn hàng
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Link href="/orders/pending-confirmation">
								<Button className="w-full">Xem tất cả</Button>
							</Link>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Xuất báo cáo</CardTitle>
							<CardDescription>
								Tải xuống báo cáo đơn hàng theo ngày/tháng
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline" className="w-full" disabled>
								Sắp có
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle className="text-base">
								Cài đặt vận chuyển
							</CardTitle>
							<CardDescription>
								Quản lý đối tác vận chuyển và phí ship
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Button variant="outline" className="w-full" disabled>
								Sắp có
							</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default OrdersPage;
