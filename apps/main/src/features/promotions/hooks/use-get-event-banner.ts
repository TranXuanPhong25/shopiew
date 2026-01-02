"use client";

import { PromotionService } from "@/features/promotions/service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { EventBanner } from "../types";

export function useGetEventBanners(
	options?: Omit<
		UseQueryOptions<any, Error, any, any[]>,
		"queryKey" | "queryFn"
	>
) {
	const {
		data = [],
		isLoading,
	}: { data: EventBanner[] | undefined; isLoading: boolean } = useQuery({
		queryKey: ["event-banners"],
		queryFn: async (): Promise<EventBanner[]> => {
			try {
				return await PromotionService.getActiveEventBanners();
			} catch (error) {
				console.error("Error fetching event banners:", error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
		gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
		retry: (failureCount, error: any) => {
			// Don't retry if it's a 404 error
			if (error?.message?.includes("not found")) {
				return false;
			}
			return failureCount < 3;
		},
		...options,
	});
	return { events: data, isLoading };
}
