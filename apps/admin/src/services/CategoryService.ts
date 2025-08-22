import { apiClient } from '@/lib/axiosClient'
import { Category } from '@/models/category'
import { handleApiError } from '@/lib/apiErrorHandler';

export class CategoryService {
   async getProductCategoriesHierarchy(): Promise<Category[]> {
      try {
         const response = await apiClient.get<Category[]>('/product-categories/hierarchy');
         return response.data;
      } catch (error) {
         throw new Error(handleApiError(error));
      }
   }
   async updateProductCategories(categoryData: Category): Promise<Category> {
      try {
         const response = await apiClient.put<Category>(`/product-categories`, categoryData);
         return response.data;
      } catch (error) {
         throw new Error(handleApiError(error));
      }
   }
   async deleteProductCategory(categoryId: number): Promise<void> {
      try {
         await apiClient.delete(`/product-categories/${categoryId}`);
      } catch (error) {
         throw new Error(handleApiError(error));
      }
   }
   async createProductCategory(categoryData: Category, parentId: number | null = null): Promise<Category> {
      try {
         const response = await apiClient.post<Category>(`/product-categories`, { ...categoryData, parentId });
         return response.data;
      } catch (error) {
         throw new Error(handleApiError(error));
      }
   }




}
