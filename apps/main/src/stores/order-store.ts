import { create } from "zustand";

interface OrderState {
	// Pending order ID that was just created (used for showing loading state on redirect)
	pendingOrderId: string | null;

	// Actions
	setPendingOrderId: (orderId: string | null) => void;
	clearPendingOrderId: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
	pendingOrderId: null,

	setPendingOrderId: (orderId) => set({ pendingOrderId: orderId }),
	clearPendingOrderId: () => set({ pendingOrderId: null }),
}));
