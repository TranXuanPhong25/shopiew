import axiosClient from "@/utils/axiosClient";
import {
	CreateOrderRequest,
	CreateOrderResponse,
	OrderDTO,
	OrderListItemDTO,
	PageResponse,
} from "./types";

class OrderService {
	async createOrder(
		request: CreateOrderRequest,
	): Promise<CreateOrderResponse> {
		const response = await axiosClient.post<CreateOrderResponse>(
			`/orders/placement`,
			request,
		);
		return response.data;
	}

	async getOrder(orderId: string): Promise<OrderDTO> {
		const response = await axiosClient.get<OrderDTO>(`/orders/${orderId}`);
		return response.data;
	}

	async getMyOrders(
		page = 0,
		size = 10,
	): Promise<PageResponse<OrderListItemDTO>> {
		const response = await axiosClient.get<PageResponse<OrderListItemDTO>>(
			`/orders`,
			{
				params: { page, size },
			},
		);
		return response.data;
	}
}

export default new OrderService();
