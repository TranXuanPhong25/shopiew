import axiosClient from "@/utils/axiosClient";
import { handleApiError } from "@/lib/apiErrorHandler";
import type { EventBanner, PromoBar, ActivePromotionsResponse } from "./types";

export class PromotionService {
	private static readonly BASE_URL = "/promotions";

	static async getAllEventBanners(): Promise<EventBanner[]> {
		try {
			const response = await axiosClient.get(`${this.BASE_URL}/banners`);
			return response.data.map(this.transformEventBanner);
		} catch (error) {
			throw handleApiError(error);
		}
	}

	static async getEventBannerById(id: string): Promise<EventBanner> {
		try {
			const response = await axiosClient.get(
				`${this.BASE_URL}/banners/${id}`
			);
			return this.transformEventBanner(response.data);
		} catch (error) {
			throw handleApiError(error);
		}
	}

	static async getEventBannersByType(type: string): Promise<EventBanner[]> {
		try {
			const response = await axiosClient.get(
				`${this.BASE_URL}/banners/type/${type}`
			);
			return response.data.map(this.transformEventBanner);
		} catch (error) {
			throw handleApiError(error);
		}
	}

	static async getEventBannersByPosition(
		position: string
	): Promise<EventBanner[]> {
		try {
			const response = await axiosClient.get(
				`${this.BASE_URL}/banners/position/${position}`
			);
			return response.data.map(this.transformEventBanner);
		} catch (error) {
			throw handleApiError(error);
		}
	}
	static async getActiveEventBanners(): Promise<EventBanner[]> {
		try {
			const response = await axiosClient.get(
				`${this.BASE_URL}/banners?active_only=true`
			);
			return response.data.map(this.transformEventBanner);
		} catch (error) {
			throw handleApiError(error);
		}
	}
	static async getActivePromoBars(): Promise<PromoBar[]> {
		try {
			const response = await axiosClient.get(
				`${this.BASE_URL}/bars?active_only=true`
			);
			return response.data.map(this.transformPromoBar);
		} catch (error) {
			throw handleApiError(error);
		}
	}
	static async getAllPromoBars(): Promise<PromoBar[]> {
		try {
			const response = await axiosClient.get(`${this.BASE_URL}/bars`);
			return response.data.map(this.transformPromoBar);
		} catch (error) {
			throw handleApiError(error);
		}
	}

	static async getPromoBarById(id: string): Promise<PromoBar> {
		try {
			const response = await axiosClient.get(`${this.BASE_URL}/bars/${id}`);
			return this.transformPromoBar(response.data);
		} catch (error) {
			throw handleApiError(error);
		}
	}
	// Combined API
	static async getActivePromotions(): Promise<ActivePromotionsResponse> {
		try {
			const response = await axiosClient.get(`${this.BASE_URL}/active`);
			return {
				banners:
					response.data.banners?.map(this.transformEventBanner) || [],
				promoBars:
					response.data.promoBars?.map(this.transformPromoBar) || [],
			};
		} catch (error) {
			throw handleApiError(error);
		}
	}

	// Transform functions to convert snake_case to camelCase
	private static transformEventBanner(data: any): EventBanner {
		return {
			id: data.id || data.ID,
			title: data.title,
			description: data.description,
			imageUrl: data.image_url || data.imageUrl,
			linkUrl: data.link_url || data.linkUrl,
			startTime: data.start_time || data.startTime,
			endTime: data.end_time || data.endTime,
			priority: data.priority,
			isActive: data.is_active ?? data.isActive,
			eventType: data.event_type || data.eventType,
			position: data.position,
			createdAt: data.created_at || data.createdAt || data.CreatedAt,
			updatedAt: data.updated_at || data.updatedAt || data.UpdatedAt,
		};
	}

	private static transformPromoBar(data: any): PromoBar {
		return {
			id: data.id || data.ID,
			message: data.message,
			backgroundColor: data.background_color || data.backgroundColor,
			textColor: data.text_color || data.textColor,
			linkUrl: data.link_url || data.linkUrl,
			startTime: data.start_time || data.startTime,
			endTime: data.end_time || data.endTime,
			isActive: data.is_active ?? data.isActive,
			priority: data.priority,
			isCloseable: data.is_closeable ?? data.isCloseable,
			createdAt: data.created_at || data.createdAt || data.CreatedAt,
			updatedAt: data.updated_at || data.updatedAt || data.UpdatedAt,
		};
	}
}
