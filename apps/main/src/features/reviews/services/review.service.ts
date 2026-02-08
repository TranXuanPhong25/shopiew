import axiosClient from "@/utils/axiosClient";
import type {
	Review,
	ReviewStats,
	ReviewListResponse,
	SuccessResponse,
	GetReviewsParams,
} from "../types/review.types";

const REVIEWS_BASE = "/reviews";

export class ReviewService {
	/**
	 * Get paginated reviews for a product
	 */
	static async getReviews(
		params: GetReviewsParams,
		productId: string,
	): Promise<ReviewListResponse> {
		const {
			page = 0,
			limit = 10,
			rating,
			withMedia,
			withComments,
			sortBy = "newest",
		} = params;

		const queryParams = new URLSearchParams();
		queryParams.append("page", page.toString());
		queryParams.append("limit", limit.toString());
		if (rating) queryParams.append("rating", rating.toString());
		if (withMedia !== undefined)
			queryParams.append("withMedia", withMedia.toString());
		if (withComments !== undefined)
			queryParams.append("withComments", withComments.toString());
		queryParams.append("sortBy", sortBy);

		try {
			const response = await axiosClient.get<
				SuccessResponse<ReviewListResponse>
			>(`${REVIEWS_BASE}/products/${productId}?${queryParams.toString()}`);
			return response.data.data;
		} catch (error) {
			console.error("Failed to fetch reviews:", error);
			return {
				reviews: [],
				page,
				limit,
				total: 0,
			};
		}
	}

	/**
	 * Get review statistics for a product
	 */
	static async getReviewStats(productId: string): Promise<ReviewStats> {
		try {
			const response = await axiosClient.get<SuccessResponse<ReviewStats>>(
				`${REVIEWS_BASE}/products/${productId}/stats`,
			);
			return response.data.data;
		} catch (error) {
			console.error("Failed to fetch review stats:", error);
			return {
				productId: parseInt(productId),
				averageRating: 0,
				totalReviews: 0,
				fiveStarCount: 0,
				fourStarCount: 0,
				threeStarCount: 0,
				twoStarCount: 0,
				oneStarCount: 0,
			};
		}
	}

	/**
	 * Mark review as helpful
	 */
	static async markAsHelpful(reviewId: string): Promise<void> {
		await axiosClient.post(`${REVIEWS_BASE}/${reviewId}/helpful`);
	}

	/**
	 * Unmark review as helpful
	 */
	static async unmarkAsHelpful(reviewId: string): Promise<void> {
		await axiosClient.delete(`${REVIEWS_BASE}/${reviewId}/helpful`);
	}
}
