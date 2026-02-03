import { ProductDetail, Shop } from "../products/types";

export interface SearchResult {
	success: boolean;
	data: {
		products: ProductDetail[];
		shops: Shop[];
		total: number;
		page: number;
		limit: number;
	};
	message: string;
}
