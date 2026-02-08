import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { OrderService, type GetOrdersParams } from '../services';
import type { ConfirmOrdersResponse } from '../types';
import { toast } from 'sonner';

export interface UseOrdersResult {
	orders: any[];
	loading: boolean;
	error: Error | null;
	pageInfo: {
		totalElements: number;
		totalPages: number;
		currentPage: number;
		size: number;
		hasNext: boolean;
		hasPrev: boolean;
	} | null;
	refetch: () => void;
}

export interface UseConfirmOrdersResult {
	confirmOrders: (orderIds: number[]) => Promise<ConfirmOrdersResponse>;
	loading: boolean;
	error: Error | null;
}

export interface UseOrderDetailResult {
	order: any | null;
	loading: boolean;
	error: Error | null;
	refetch: () => void;
}

export const useOrders = (params: GetOrdersParams): UseOrdersResult => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['orders', params],
		queryFn: async () => {
			try {
				const response = await OrderService.getOrders(params);
				return response;
			} catch (error) {
				if (error instanceof Error) {
					toast.error(error.message);
				} else {
					toast.error('An unexpected error occurred while fetching orders.');
				}
				throw error;
			}
		},
		refetchOnWindowFocus: true,
		refetchInterval: 1000 * 60 * 5, // 5 minutes
		enabled: !!params.userId,
		retry: 1,
		refetchOnReconnect: false,
	});

	return {
		orders: data?.content ?? [],
		loading: isLoading,
		error: error as Error | null,
		pageInfo: data
			? {
					totalElements: data.totalElements,
					totalPages: data.totalPages,
					currentPage: data.number,
					size: data.size,
					hasNext: !data.last,
					hasPrev: !data.first,
			  }
			: null,
		refetch,
	};
};

export const useConfirmOrders = (): UseConfirmOrdersResult => {
	const queryClient = useQueryClient();
	const { mutateAsync, isPending, isError, error } = useMutation({
		mutationKey: ['confirmOrders'],
		mutationFn: async (orderIds: number[]): Promise<ConfirmOrdersResponse> => {
			try {
				return await OrderService.confirmOrders(orderIds);
			} catch (error) {
				throw error;
			}
		},
		onError: (error) => {
			toast.error(
				`Failed to confirm orders: ${error instanceof Error ? error.message : 'Unknown error'}`,
			);
		},
		onSuccess: (response) => {
			toast.success(`${response.successCount} orders confirmed successfully`);
			queryClient.invalidateQueries({ queryKey: ['orders'] });
			queryClient.invalidateQueries({ queryKey: ['orderStats'] });
		},
	});

	return {
		confirmOrders: mutateAsync,
		loading: isPending,
		error: error as Error | null,
	};
};

export const useOrderDetail = (orderId?: number): UseOrderDetailResult => {
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['orderDetail', orderId],
		queryFn: async () => {
			if (!orderId) throw new Error('Order ID is required');
			try {
				return await OrderService.getOrderById(orderId);
			} catch (error) {
				if (error instanceof Error) {
					toast.error(error.message);
				}
				throw error;
			}
		},
		enabled: !!orderId,
		retry: 1,
		refetchOnWindowFocus: false,
	});

	return {
		order: data ?? null,
		loading: isLoading,
		error: error as Error | null,
		refetch,
	};
};
