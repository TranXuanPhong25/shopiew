import axiosClient from "@/lib/clients/shopiewClient";
import type {
	OrderListItemDTO,
	OrderDTO,
	PageResponse,
	OrderStatus,
	ConfirmOrdersRequest,
	ConfirmOrdersResponse,
} from "../types";

const ORDERS_BASE = "/orders";

export interface GetOrdersParams {
	userId: string;
	shopId?: string;
	status?: OrderStatus;
	page?: number;
	size?: number;
	sort?: string;
}

export class OrderService {
	/**
	 * Get paginated orders with filters
	 */
	static async getOrders(
		params: GetOrdersParams,
	): Promise<PageResponse<OrderListItemDTO>> {
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
	}

	/**
	 * Get single order by ID
	 */
	static async getOrderById(id: number): Promise<OrderDTO> {
		const response = await axiosClient.get<OrderDTO>(`${ORDERS_BASE}/${id}`);
		return response.data;
	}

	/**
	 * Confirm multiple orders
	 */
	static async confirmOrders(
		orderIds: number[],
	): Promise<ConfirmOrdersResponse> {
		const request: ConfirmOrdersRequest = { orderIds };
		const response = await axiosClient.post<ConfirmOrdersResponse>(
			`${ORDERS_BASE}/confirm`,
			request,
		);
		return response.data;
	}

	/**
	 * Update order status
	 */
	static async updateOrderStatus(
		id: number,
		status: OrderStatus,
	): Promise<OrderDTO> {
		const response = await axiosClient.patch<OrderDTO>(
			`${ORDERS_BASE}/${id}/status`,
			null,
			{
				params: { status },
			},
		);
		return response.data;
	}
}
