import axiosClient from "@/utils/axiosClient";

class ProductCategoriesService {
	async getProductCategoriesCatalog() {
		const response = await axiosClient.get(`/product-categories`);
		return response.data;
	}
}

export default new ProductCategoriesService();
