// Review-related types for the rating feature

export interface CreateReviewRequest {
	productId: number;
	userId: string;
	username: string;
	rating: number; // 1-5
	comment: string; // 20-1000 chars
}

export interface ReviewResponse {
	id: number;
	productId: number;
	userId: string;
	username: string;
	rating: number;
	comment: string;
	createdAt: string;
	updatedAt: string;
}

// Product item for rating form
export interface ProductRatingItem {
	productId: string;
	productName: string;
	productSku?: string;
	imageUrl: string;
	variantId?: string;
	variantName?: string;
	quantity: number;
}

// Local form state for each product review
export interface ReviewFormState {
	productId: string;
	rating: number;
	comment: string;
	images: File[];
	imagePreviews: string[];
	isSubmitted: boolean;
	error?: string;
}

// Order data needed for rating page
export interface RatingOrderData {
	id: number;
	orderNumber: string;
	status: string;
	items: ProductRatingItem[];
}
