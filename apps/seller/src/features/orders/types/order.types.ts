export enum OrderStatus {
	CONFIRMED = "CONFIRMED",
	PICKED_UP = "PICKED_UP",
	SHIPPED = "SHIPPED",
	DELIVERED = "DELIVERED",
	CANCELLED = "CANCELLED",
	REFUNDED = "REFUNDED",
	UNCONFIRMED = "UNCONFIRMED",
}

export interface OrderItemDTO {
	id: number;
	productId: number;
	productName: string;
	variantId?: number;
	variantName?: string;
	quantity: number;
	price: number;
	totalPrice: number;
	imageUrl?: string;
}

export interface OrderListItemDTO {
	id: number;
	orderNumber: string;
	userId: string;
	shopId: string;
	shopName?: string;
	status: OrderStatus;
	totalAmount: number;
	createdAt: string;
	updatedAt: string;
	itemCount: number;
	customerName?: string;
	shippingAddress?: string;
}

export interface OrderDTO {
	id: number;
	userId: string;
	shopId: string;
	shopName?: string;
	status: OrderStatus;
	items: OrderItemDTO[];
	totalAmount: number;
	shippingAddress: string;
	phoneNumber: string;
	customerName: string;
	notes?: string;
	createdAt: string;
	updatedAt: string;
}

export interface PageResponse<T> {
	content: T[];
	totalElements: number;
	totalPages: number;
	size: number;
	number: number;
	first: boolean;
	last: boolean;
	empty: boolean;
}

export interface ConfirmOrdersRequest {
	orderIds: number[];
}

export interface FailedOrder {
	orderId: number;
	reason: string;
}

export interface ConfirmOrdersResponse {
	totalRequested: number;
	successCount: number;
	failedCount: number;
	confirmedOrders: OrderDTO[];
	failedOrders: FailedOrder[];
}

export interface OrderFilters {
	status?: OrderStatus;
	shopId?: string;
	search?: string;
	dateFrom?: string;
	dateTo?: string;
}
