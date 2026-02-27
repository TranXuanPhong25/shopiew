import axiosClient from "@/lib/clients/shopiewClient";
import type { OrderStatsResponse } from "../types/order-stats.types";

const ORDERS_BASE = "/orders";

interface BackendOrderStats {
	totalOrders: number;
	unconfirmedCount: number;
	confirmedCount: number;
	readyToShipCount: number;
	shippingCount: number;
	deliveredCount: number;
	completedCount: number;
	cancelledCount: number;
	totalRevenue: number;
	pendingRevenue: number;
}

export class OrderStatsService {
	/**
	 * Get order statistics from backend
	 */
	static async getStats(shopId: string): Promise<OrderStatsResponse> {
		try {
			const response = await axiosClient.get<BackendOrderStats>(
				`${ORDERS_BASE}/stats/shop/${shopId}`,
			);

			const data = response.data;

			const stats: OrderStatsResponse = {
				totalOrders: data.totalOrders,
				statusCounts: {
					CREATED: 0,
					CONFIRMED: data.confirmedCount,
					READY_TO_SHIP: data.readyToShipCount,
					SHIPPING: data.shippingCount,
					DELIVERED: data.deliveredCount,
					CANCELLED: data.cancelledCount,
					REFUNDED: 0,
					UNCONFIRMED: data.unconfirmedCount,
				},
				totalRevenue: data.totalRevenue,
			};

			return stats;
		} catch (error) {
			console.error("Failed to fetch order stats:", error);
			throw error;
		}
	}

	/**
	 * Transform backend stats to UI-friendly format
	 */
	static transformStats(response: OrderStatsResponse) {
		return {
			totalOrders: response.totalOrders,
			pendingConfirmation: response.statusCounts.UNCONFIRMED,
			processing: response.statusCounts.CONFIRMED,
			readyToShip: response.statusCounts.READY_TO_SHIP,
			shipping: response.statusCounts.SHIPPING,
			completed: response.statusCounts.DELIVERED,
			cancelled: response.statusCounts.CANCELLED,
			returns: response.statusCounts.REFUNDED,
			totalRevenue: response.totalRevenue,
		};
	}
}
