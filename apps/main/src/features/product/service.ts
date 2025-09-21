import axiosClient from "@/utils/axiosClient";

class ProductService {
      async getProductById(id: string) {
         const response = await axiosClient.get(`/products/${id}`);
         return response.data;
      }
      async searchProducts(query: string, page: number = 1, limit: number = 10) {
         const response = await axiosClient.get('/products/search', {
            params: { query, page, limit }
         });
         return response.data;
      }
      async getRelatedProducts(categoryId: string, limit: number = 5) {
         const response = await axiosClient.get('/products/related', {
            params: { categoryId, limit }
         });
         return response.data;
      }
}

export default new ProductService();