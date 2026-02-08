export interface ReviewUser {
	id: string;
	name: string;
	avatar?: string;
}

export interface ReviewMedia {
	id: string;
	type: "image" | "video";
	url: string;
	thumbnailUrl?: string;
	duration?: number;
}

export interface ReviewAttributes {
	style?: string;
	quality?: string;
	occasion?: string;
}

export interface SellerResponse {
	content: string;
	createdAt: string;
}

export interface Review {
	id: number;
	productId: number;
	userId: string;
	username: string;
	rating: number;
	comment: string;
	createdAt: string;
	updatedAt: string;
}

export interface ReviewStats {
	productId: number;
	averageRating: number;
	totalReviews: number;
	fiveStarCount: number;
	fourStarCount: number;
	threeStarCount: number;
	twoStarCount: number;
	oneStarCount: number;
}

export interface ReviewFilters {
	rating?: number;
	withMedia?: boolean;
	withComments?: boolean;
	sortBy?: "newest" | "oldest" | "helpful";
}

export interface ReviewListResponse {
	reviews: Review[];
	page: number;
	limit: number;
	total: number;
}

export interface SuccessResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export interface GetReviewsParams {
	page?: number;
	limit?: number;
	rating?: number;
	withMedia?: boolean;
	withComments?: boolean;
	sortBy?: "newest" | "oldest" | "helpful";
}
