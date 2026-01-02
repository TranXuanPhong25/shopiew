"use client";

import { PromotionService } from "@/features/promotions/service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { EventBanner, PromoBar } from "../types";
import { useEffect, useRef, useState, useTransition } from "react";

export function useGetPromoBars(
	options?: Omit<
		UseQueryOptions<any, Error, any, any[]>,
		"queryKey" | "queryFn"
	>
) {
	const {
		data = [],
		isLoading,
	}: { data: PromoBar[] | undefined; isLoading: boolean } = useQuery({
		queryKey: ["promo-bars"],
		queryFn: async (): Promise<PromoBar[]> => {
			try {
				return await PromotionService.getActivePromoBars();
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
	return { bars: data, isLoading };
}
export function usePromoBars() {
	const { bars, isLoading } = useGetPromoBars();
	const [activeIndex, setActiveIndex] = useState(0);
	const timeOutId = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!isLoading && bars && bars.length > 0) {
			if (timeOutId.current) {
				clearTimeout(timeOutId.current);
			}
			timeOutId.current = setTimeout(() => {
				setActiveIndex((prevIndex) =>
					prevIndex + 1 < bars.length ? prevIndex + 1 : 0
				);
			}, 10000);
		}
		return () => {
			if (timeOutId.current) {
				clearTimeout(timeOutId.current);
			}
		};
	}, [activeIndex, bars, isLoading]);
	return { bars, isLoading, activeBar: bars[activeIndex], setActiveIndex };
}
