"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import ProductCategoriesService from "@/features/product-categories/service";

// Product query keys for better cache management
export const categoriesKey = {
	all: ["categories"],
	details: () => [...categoriesKey.all, "detail"],
	detail: (id: string) => [...categoriesKey.details(), id],
};

export function useGetProductCategoriesCatalog(
	options?: Omit<
		UseQueryOptions<any, Error, any, any[]>,
		"queryKey" | "queryFn"
	>
) {
	return useQuery({
		queryKey: categoriesKey.all,
		queryFn: async () => {
			try {
				let categories =
					await ProductCategoriesService.getProductCategoriesCatalog();
				categories = categories.sort((a: any, b: any) => a.id - b.id);
				console.log("Fetched categories:", categories);
				return categories;
			} catch (error) {
				console.error("Error fetching categories:", error);
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
}
