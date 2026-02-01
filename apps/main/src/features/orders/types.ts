// Order Item Input - for creating orders
export interface OrderItemInput {
	productId: string;
	productName: string;
	productSku?: string;
	imageUrl: string;
	variantId?: string;
	variantName?: string;
	originalPrice: number;
	salePrice: number;
	quantity: number;
}

// Request to create a new order
export interface CreateOrderRequest {
	shopId: string;
	recipientName: string;
	recipientPhone: string;
	deliveryAddress: string;
	paymentMethod: string;
	shippingMethod?: string;
	shippingFee?: number;
	discount?: Record<string, unknown>;
	customerNote?: string;
	items: OrderItemInput[];
}

// Order Item DTO - from server response
export interface OrderItemDTO {
	productId: string;
	productName: string;
	productSku?: string;
	imageUrl: string;
	variantId?: string;
	variantName?: string;
	originalPrice: number;
	salePrice: number;
	quantity: number;
	subtotal: number;
}

// Order DTO - full order data from server
export interface OrderDTO {
	id: number;
	orderNumber: string;
	userId: string;
	shopId: string;

	// Shipping information
	recipientName: string;
	recipientPhone: string;
	deliveryAddress: string;

	// Status
	status: OrderStatus;
	paymentMethod: string;
	paymentStatus: PaymentStatus;
	paidAt?: string;

	// Pricing
	subtotal: number;
	shippingFee: number;
	discount?: Record<string, unknown>;
	totalAmount: number;

	// Shipping details
	shippingMethod?: string;
	shippingProvider?: string;
	trackingNumber?: string;
	estimatedDelivery?: string;
	actualDelivery?: string;

	// Notes
	customerNote?: string;
	sellerNote?: string;
	cancelReason?: string;

	// Timestamps
	confirmedAt?: string;
	processingAt?: string;
	shippedAt?: string;
	deliveredAt?: string;
	completedAt?: string;
	cancelledAt?: string;
	createdAt: string;
	updatedAt: string;

	orderItems: OrderItemDTO[];
}

// Pagination response wrapper
export interface PageResponse<T> {
	content: T[];
	pageNumber: number;
	pageSize: number;
	totalElements: number;
	totalPages: number;
}

// Order summary for listing
export interface OrderListItemDTO {
	id: number;
	orderNumber: string;
	status: OrderStatus;
	paymentStatus: PaymentStatus;
	totalAmount: number;
	itemCount: number;
	firstItemName?: string | null;
	firstItemImage?: string | null;
	createdAt: string;
}

// Response after creating an order
export interface CreateOrderResponse {
	order: OrderDTO;
	message: string;
}

// Order status enum
export type OrderStatus =
	| "CREATED"
	| "UNCONFIRMED"
	| "CONFIRMED"
	| "PROCESSING"
	| "SHIPPING"
	| "DELIVERED"
	| "COMPLETED"
	| "CANCELLED"
	| "RETURNED"
	| "REFUNDED";

// Payment status enum
export type PaymentStatus = "UNPAID" | "PAID" | "REFUNDED";

// Order status display info
export const ORDER_STATUS_INFO: Record<
	OrderStatus,
	{ label: string; color: string; description: string }
> = {
	CREATED: {
		label: "Đã tạo",
		color: "!bg-blue-100 !text-blue-800",
		description: "Đơn hàng đang được xử lý",
	},
	UNCONFIRMED: {
		label: "Chưa xác nhận",
		color: "!bg-gray-100 !text-gray-800",
		description: "Đơn hàng chờ xác nhận từ người bán",
	},
	CONFIRMED: {
		label: "Đã xác nhận",
		color: "!bg-indigo-100 !text-indigo-800",
		description: "Đơn hàng đã được xác nhận bởi người bán",
	},
	PROCESSING: {
		label: "Đang xử lý",
		color: "!bg-yellow-100 !text-yellow-800",
		description: "Đơn hàng đang được chuẩn bị",
	},
	SHIPPING: {
		label: "Đang giao",
		color: "!bg-purple-100 !text-purple-800",
		description: "Đơn hàng đang được vận chuyển",
	},
	DELIVERED: {
		label: "Đã giao",
		color: "!bg-green-100 !text-green-800",
		description: "Đơn hàng đã được giao thành công",
	},
	COMPLETED: {
		label: "Hoàn thành",
		color: "!bg-green-100 !text-green-800",
		description: "Đơn hàng đã hoàn thành",
	},
	CANCELLED: {
		label: "Đã hủy",
		color: "!bg-red-100 !text-red-800",
		description: "Đơn hàng đã bị hủy",
	},
	RETURNED: {
		label: "Đã trả hàng",
		color: "!bg-orange-100 !text-orange-800",
		description: "Đơn hàng đã được trả lại",
	},
	REFUNDED: {
		label: "Đã hoàn tiền",
		color: "!bg-gray-100 !text-gray-800",
		description: "Đơn hàng đã được hoàn tiền",
	},
};
