'use client';

import { useAuth } from '@/features/auth';
import { useOrderStats } from '@/features/orders/hooks';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
	Package,
	Clock,
	Truck,
	CheckCircle,
	XCircle,
	DollarSign,
} from 'lucide-react';

const DashboardPage = () => {
	const { shop } = useAuth();
	const { stats, loading, error } = useOrderStats(shop?.id);

	if (loading) {
		return (
			<div className="space-y-6 p-6">
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
					{[...Array(4)].map((_, i) => (
						<Card key={i}>
							<CardHeader>
								<Skeleton className="h-4 w-24" />
							</CardHeader>
							<CardContent>
								<Skeleton className="h-8 w-16" />
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-6">
				<h1 className="text-3xl font-bold mb-4">Dashboard</h1>
				<Card>
					<CardContent className="pt-6">
						<p className="text-red-500">Failed to load stats: {error.message}</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (!shop) {
		return (
			<div className="p-6">
				<h1 className="text-3xl font-bold mb-4">Dashboard</h1>
				<Card>
					<CardContent className="pt-6">
						<p className="text-muted-foreground">No shop found. Please create a shop first.</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="space-y-6 p-6">
			<div>
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<p className="text-muted-foreground">{shop.name}</p>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Orders</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats?.totalOrders ?? 0}</div>
						<p className="text-xs text-muted-foreground">All time</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Pending Confirmation
						</CardTitle>
						<Clock className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{stats?.pendingConfirmation ?? 0}
						</div>
						<p className="text-xs text-muted-foreground">
							Needs action
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Shipping</CardTitle>
						<Truck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats?.shipping ?? 0}</div>
						<p className="text-xs text-muted-foreground">In transit</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Completed</CardTitle>
						<CheckCircle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats?.completed ?? 0}</div>
						<p className="text-xs text-muted-foreground">Successfully delivered</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Processing</CardTitle>
						<Package className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats?.processing ?? 0}</div>
						<p className="text-xs text-muted-foreground">Being prepared</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Cancelled</CardTitle>
						<XCircle className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{stats?.cancelled ?? 0}</div>
						<p className="text-xs text-muted-foreground">Cancelled orders</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{((stats?.totalRevenue ?? 0) / 1000).toLocaleString('vi-VN')}k
						</div>
						<p className="text-xs text-muted-foreground">From completed orders</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default DashboardPage;
