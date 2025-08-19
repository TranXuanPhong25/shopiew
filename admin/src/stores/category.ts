// src/stores/category.ts
import { defineStore } from 'pinia';
import { CategoryService } from '@/services/CategoryService';
import { Category } from '@/models/category';

const categoryService = new CategoryService();

export const useCategoryStore = defineStore('category', {
   state: () => ({
      categories: [] as Category[],
      loading: false,
      error: null as string | null,

      previewCategory: null as Category | null,

      showEditModal: false,
      showAddRootModal: false,
      showAddSubModal: false,
      showDeleteModal: false,
      isDeleting: false,

      deleteProductCategoryId: null as number | string | null,
      parentOfEditingCategory: null as Category | null,
      edittingCategory: null as Category | null,
   }),

   actions: {
      async getProductCategoriesHierarchy() {
         this.loading = true;
         try {
            this.categories = await categoryService.getProductCategoriesHierarchy();
            this.error = null;
         } catch (err) {
            this.error = err instanceof Error ? err.message : 'Failed to fetch categories';
            console.error('Error fetching product categories hierarchy:', this.error);
         } finally {
            this.loading = false;
         }
      },
      async updateProductCategory(categoryData: Category) {
         this.loading = true;
         try {
            await categoryService.updateProductCategories(categoryData);
            this.error = null;
         } catch (err) {
            this.error = err instanceof Error ? err.message : 'Failed to update product categories';
            console.error('Error updating product categories:', this.error);
         } finally {
            this.loading = false;
         }
      },
      async deleteProductCategory(categoryId: number) {
         this.loading = true;
         try {
            await categoryService.deleteProductCategory(categoryId);
            this.categories = this.categories.filter(cat => cat.id !== categoryId);
            this.error = null;
         } catch (err) {
            this.error = err instanceof Error ? err.message : 'Failed to delete product category';
            console.error('Error deleting product category:', this.error);
         } finally {
            this.loading = false;
         }
      },
      async createProductCategory(categoryData: Category, parentId: number | null = null) {
         this.loading = true;
         try {
            const categoryResponse = await categoryService.createProductCategory(categoryData, parentId);
            this.error = null;
            return new Category(categoryResponse);
         } catch (err) {
            this.error = err instanceof Error ? err.message : 'Failed to create product category';
            console.error('Error creating product category:', this.error);
         } finally {
            this.loading = false;
         }
         return null;
      },

      setPreviewCategory(category: Category | null) {
         this.previewCategory = category;
      },
      setEditCategory(category: Category | null) {
         this.previewCategory = category;
      },
      cancelDeleteCategory() {
         this.showDeleteModal = false;
      },
      openDeleteCategoryModal(parent: Category | null, categoryId: number | string) {
         this.deleteProductCategoryId = categoryId;
         this.parentOfEditingCategory = parent;
         this.showDeleteModal = true;
      },

      openEditModal(category: Category | null, parentCategory: Category | null = null) {
         this.edittingCategory = category;
         this.parentOfEditingCategory = parentCategory;
         this.showEditModal = true;
      },
      closeEditModal() {
         this.showEditModal = false;
         this.edittingCategory = null;
         this.parentOfEditingCategory = null;
      },
      showAddRootCategoryModal() {
         this.showAddRootModal = true;
      },
      closeAddRootCategoryModal() {
         this.showAddRootModal = false;
      },

      showAddSubCategoryModal(category: Category | null) {
         this.parentOfEditingCategory = category;
         this.showAddSubModal = true;
      },
      closeAddSubCategoryModal() {
         this.showAddSubModal = false;
         this.parentOfEditingCategory = null;
      },
      async addRootCategory(category: Category) {
         const createdCategory = await this.createProductCategory(category);
         if (!createdCategory) {
            console.error('Error creating root category:', this.error);
            return;
         }

         this.categories.push(createdCategory);
      },
      async addSubCategory({ name, imageUrl }: { name: string; imageUrl: string }) {
         if (!this.parentOfEditingCategory) {
            console.error('No parent category specified for sub-category');
            return;
         }

         const newCategory = new Category({
            name: name.trim(),
            imageUrl: imageUrl.trim()
         });
         const createdCategory = await this.createProductCategory(newCategory, this.parentOfEditingCategory.id)
         if (!createdCategory) {
            console.error('Error creating sub-category:', this.error);
            return;
         }
         this.parentOfEditingCategory.children.push(createdCategory);
      },
      async updateCategory(category: Category) {
         await this.updateProductCategory(category);
         if (this.error) {
            console.error('Error updating category:', this.error);
            return;
         }
         const parentEditingCategory = this.parentOfEditingCategory
         if (parentEditingCategory) {

            const index = parentEditingCategory.children.findIndex(c => c.id === category.id)
            if (index !== -1) {
               parentEditingCategory.children[index] = category
            }
         } else {
            const index = this.categories.findIndex(c => c.id === category.id)
            if (index !== -1) {
               this.categories[index] = category
            }
         }
      },
      async confirmDeleteCategory() {
         this.isDeleting = true;
         try {
            const categoryId = this.deleteProductCategoryId;
            await this.deleteProductCategory(categoryId as number);
            if (this.error) {
               console.error('Error deleting category:', this.error);
               return;
            }
            let index
            if (this.parentOfEditingCategory) {
               index = this?.parentOfEditingCategory?.children.findIndex((c) => c.id == categoryId);
               if (index !== -1) {
                  this?.parentOfEditingCategory?.children.splice(index, 1)
               }
            } else {
               index = this.categories.findIndex((c) => c.id === categoryId) || -1;
               if (index !== -1) {
                  this.categories.splice(index, 1)
               }
            }
            if (this.previewCategory?.id === categoryId) {
               this.previewCategory = null;
            }
            this.deleteProductCategoryId = null;
            this.showDeleteModal = false;
         } finally {
            this.isDeleting = false;
         }
      }
   }
});