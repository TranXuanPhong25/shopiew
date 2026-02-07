import { CartItem } from "../carts/types";

export type CheckoutItem = CartItem;

export type CheckoutData = {
	items: CheckoutItem[];
	totalOriginal: number;
	totalAfterDiscount: number;
	selectedCount: number;
};

export type CheckoutFormData = {
	recipientName: string;
	recipientPhone: string;
	deliveryAddress: string;
	paymentMethod: string;
	customerNote?: string;
};

export type SavedAddress = {
	id: string;
	recipientName: string;
	recipientPhone: string;
	address: string;
	isDefault: boolean;
	label?: string; // e.g., "Home", "Office"
};
