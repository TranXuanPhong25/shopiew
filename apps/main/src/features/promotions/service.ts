import axiosClient from "@/utils/axiosClient";
import { handleApiError } from "@/lib/apiErrorHandler";
import type { EventBanner, PromoBar, ActivePromotionsResponse } from "./types";

export class PromotionService {
	private static readonly BASE_URL = "/promotions";

	static async getEventBannerById(id: string): Promise<EventBanner> {
		try {
			const response = await axiosClient.get(
				`${this.BASE_URL}/banners/${id}`
			);
			return response.data;
		} catch (error) {
			throw handleApiError(error);
		}
	}

	static async getEventBannersByType(type: string): Promise<EventBanner[]> {
		try {
			const response = await axiosClient.get(
				`${this.BASE_URL}/banners/type/${type}`
			);
			return response.data;
		} catch (error) {
			throw handleApiError(error);
		}
	}
	static async getActiveEventBanners(): Promise<EventBanner[]> {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API}/promotions/banners?active_only=true`
			);
			return await response.json();
		} catch (error) {
			throw handleApiError(error);
		}
	}
	static async getActivePromoBars(): Promise<PromoBar[]> {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API}/promotions/bars?active_only=true`,
				{
					next: { revalidate: 3600 },
				}
			);
			return await response.json();
		} catch (error) {
			throw handleApiError(error);
		}
	}

	static async getPromoBarById(id: string): Promise<PromoBar> {
		try {
			const response = await axiosClient.get(`${this.BASE_URL}/bars/${id}`);
			return response.data;
		} catch (error) {
			throw handleApiError(error);
		}
	}
	// Combined API
	static async getActivePromotions(): Promise<ActivePromotionsResponse> {
		try {
			const response = await axiosClient.get(`${this.BASE_URL}/active`);
			return {
				banners: response.data.banners || [],
				promoBars: response.data.promoBars || [],
			};
		} catch (error) {
			throw handleApiError(error);
		}
	}


}
