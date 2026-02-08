import axiosClient from "@/utils/axiosClient";
import { CreateReviewRequest, ReviewResponse } from "./types";

class ReviewService {
	/**
	 * Create a new product review
	 * @param request Review data including productId, rating, comment
	 * @returns Created review response
	 */
	async createReview(request: CreateReviewRequest): Promise<ReviewResponse> {
		const response = await axiosClient.post<ReviewResponse>(
			"/reviews",
			request,
		);
		return response.data;
	}

	/**
	 * Get reviews for a specific product
	 * @param productId Product ID
	 * @param page Page number (default: 1)
	 * @param limit Items per page (default: 20)
	 */
	async getProductReviews(
		productId: number,
		page = 1,
		limit = 20,
	): Promise<{ reviews: ReviewResponse[]; total: number }> {
		const response = await axiosClient.get(`/reviews/products`, {
			params: { productId, page, limit },
		});
		return response.data;
	}

	/**
	 * Get reviews by user
	 * @param userId User ID
	 */
	async getUserReviews(userId: string): Promise<ReviewResponse[]> {
		const response = await axiosClient.get(`/reviews/users`, {
			params: { userId },
		});
		return response.data.reviews || [];
	}
}

export default new ReviewService();
