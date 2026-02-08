import { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewService } from "../services";
import type { Review, ReviewStats, ReviewFilters } from "../types/review.types";

export interface UseReviewsResult {
	reviews: Review[];
	stats: ReviewStats | null;
	loading: boolean;
	error: Error | null;
	pageInfo: {
		total: number;
		totalPages: number;
		currentPage: number;
		limit: number;
		hasNext: boolean;
		hasPrev: boolean;
	} | null;
	filters: ReviewFilters;
	setFilters: (filters: ReviewFilters) => void;
	goToPage: (page: number) => void;
	refetch: () => void;
	markAsHelpful: (reviewId: string) => Promise<void>;
}

export function useReviews(productId: string): UseReviewsResult {
	const queryClient = useQueryClient();
	const [filters, setFilters] = useState<ReviewFilters>({
		sortBy: "newest",
	});
	const [currentPage, setCurrentPage] = useState(0);

	// Fetch reviews
	const {
		data: reviewsData,
		isLoading: reviewsLoading,
		error: reviewsError,
		refetch: refetchReviews,
	} = useQuery({
		queryKey: ["reviews", productId, currentPage, filters],
		queryFn: async () => {
			if (!productId) return null;
			return await ReviewService.getReviews(
				{
					page: currentPage,
					limit: 10,
					rating: filters.rating,
					withMedia: filters.withMedia,
					withComments: filters.withComments,
					sortBy: filters.sortBy,
				},
				productId,
			);
		},
		enabled: !!productId,
		staleTime: 30000, // 30 seconds
	});

	// Fetch stats
	const {
		data: stats,
		isLoading: statsLoading,
		error: statsError,
	} = useQuery({
		queryKey: ["reviewStats", productId],
		queryFn: async () => {
			if (!productId) return null;
			return await ReviewService.getReviewStats(productId);
		},
		enabled: !!productId,
		staleTime: 60000, // 1 minute
	});

	// Mark as helpful mutation
	const markAsHelpfulMutation = useMutation({
		mutationFn: (reviewId: string) => ReviewService.markAsHelpful(reviewId),
		onSuccess: () => {
			// Invalidate to refetch
			queryClient.invalidateQueries({
				queryKey: ["reviews", productId],
			});
		},
		onError: (err) => {
			console.error("Failed to mark review as helpful:", err);
		},
	});

	const handleSetFilters = useCallback((newFilters: ReviewFilters) => {
		setFilters(newFilters);
		setCurrentPage(0);
	}, []);

	const goToPage = useCallback((page: number) => {
		setCurrentPage(page);
	}, []);

	const markAsHelpful = useCallback(
		async (reviewId: string) => {
			await markAsHelpfulMutation.mutateAsync(reviewId);
		},
		[markAsHelpfulMutation],
	);

	const reviews = reviewsData?.reviews || [];
	const pageInfo = reviewsData
		? {
				total: reviewsData.total,
				totalPages: Math.ceil(reviewsData.total / reviewsData.limit),
				currentPage: reviewsData.page,
				limit: reviewsData.limit,
				hasNext: reviewsData.page < Math.ceil(reviewsData.total / reviewsData.limit) - 1,
				hasPrev: reviewsData.page > 0,
			}
		: null;

	return {
		reviews,
		stats: stats || null,
		loading: reviewsLoading || statsLoading,
		error: (reviewsError || statsError) as Error | null,
		pageInfo,
		filters,
		setFilters: handleSetFilters,
		goToPage,
		refetch: refetchReviews,
		markAsHelpful,
	};
}
