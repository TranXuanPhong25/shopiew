import { useQuery } from '@tanstack/react-query';
import { OrderStatsService } from '../services';

export interface OrderStats {
	totalOrders: number;
	pendingConfirmation: number;
	processing: number;
	shipping: number;
	completed: number;
	cancelled: number;
	returns: number;
	totalRevenue: number;
}

export const useOrderStats = (shopId?: string) => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['orderStats', shopId],
		queryFn: async () => {
			if (!shopId) throw new Error('Shop ID is required');
			const response = await OrderStatsService.getStats(shopId);
			return OrderStatsService.transformStats(response);
		},
		enabled: !!shopId,
		refetchOnWindowFocus: true,
		refetchInterval: 1000 * 60 * 5, // 5 minutes
		retry: 1,
		refetchOnReconnect: false,
	});

	return {
		stats: data ?? null,
		loading: isLoading,
		error: error as Error | null,
		refetch,
	};
};
