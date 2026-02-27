export interface ReadyToShipRequest {
	pickupAddress: string;
	pickupContactName: string;
	pickupContactPhone: string;
	weightGrams?: number;
	specialInstructions?: string;
}

export interface ReadyToShipResponse {
	orderId: number;
	orderNumber: string;
	packageNumber: string;
	pickupScheduledAt: string;
	estimatedDelivery: string;
	message: string;
}
