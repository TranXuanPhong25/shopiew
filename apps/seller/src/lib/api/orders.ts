import axiosClient from "../clients/shopiewClient";
import type {
	OrderListItemDTO,
	OrderDTO,
	PageResponse,
	OrderStatus,
	ConfirmOrdersRequest,
	ConfirmOrdersResponse,
} from "@/types/order";

const ORDERS_BASE = "/orders";

export interface GetOrdersParams {
	userId: string;
	shopId?: string;
	status?: OrderStatus;
	page?: number;
	size?: number;
	sort?: string;
}

export const ordersApi = {
	/**
	 * Get paginated orders with filters
	 */
	getOrders: async (
		params: GetOrdersParams,
	): Promise<PageResponse<OrderListItemDTO>> => {
		const { userId, shopId, status, page = 0, size = 20, sort } = params;

		const queryParams = new URLSearchParams();
		if (shopId) queryParams.append("shopId", shopId);
		if (status) queryParams.append("status", status);
		queryParams.append("page", page.toString());
		queryParams.append("size", size.toString());
		if (sort) queryParams.append("sort", sort);

		const response = await axiosClient.get<PageResponse<OrderListItemDTO>>(
			`${ORDERS_BASE}?${queryParams.toString()}`,
		);

		return response.data;
	},

	/**
	 * Get single order by ID
	 */
	getOrderById: async (id: number): Promise<OrderDTO> => {
		const response = await axiosClient.get<OrderDTO>(`${ORDERS_BASE}/${id}`);
		return response.data;
	},

	/**
	 * Confirm multiple orders
	 */
	confirmOrders: async (
		request: ConfirmOrdersRequest,
	): Promise<ConfirmOrdersResponse> => {
		const response = await axiosClient.post<ConfirmOrdersResponse>(
			`${ORDERS_BASE}/confirm`,
			request,
		);
		return response.data;
	},

	/**
	 * Update order status
	 */
	updateOrderStatus: async (
		id: number,
		status: OrderStatus,
	): Promise<OrderDTO> => {
		const response = await axiosClient.patch<OrderDTO>(
			`${ORDERS_BASE}/${id}/status`,
			null,
			{
				params: { status },
			},
		);
		return response.data;
	},

	/**
	 * Get order statistics
	 * TODO: Implement backend endpoint for this
	 */
	getOrderStats: async (userId: string, shopId?: string) => {
		// Temporary: fetch all orders to calculate stats
		// In production, this should be a dedicated backend endpoint
		try {
			const response = await axiosClient.get<PageResponse<OrderListItemDTO>>(
				`${ORDERS_BASE}?size=1000`,
				{
					headers: {
						'X-User-Id': userId,
					},
				},
			);

			const orders = response.data.content;
			const stats = {
				totalOrders: orders.length,
				statusCounts: {
					CREATED: 0,
					CONFIRMED: 0,
					PICKED_UP: 0,
					SHIPPED: 0,
					DELIVERED: 0,
					CANCELLED: 0,
					REFUNDED: 0,
					UNCONFIRMED: 0,
				},
				totalRevenue: 0,
			};

			orders.forEach((order) => {
				stats.statusCounts[order.status]++;
				if (order.status === 'DELIVERED') {
					stats.totalRevenue += order.totalAmount;
				}
			});

			return stats;
		} catch (error) {
			console.error('Failed to fetch order stats:', error);
			return {
				totalOrders: 0,
				statusCounts: {
					CREATED: 0,
					CONFIRMED: 0,
					PICKED_UP: 0,
					SHIPPED: 0,
					DELIVERED: 0,
					CANCELLED: 0,
					REFUNDED: 0,
					UNCONFIRMED: 0,
				},
				totalRevenue: 0,
			};
		}
	},
};
