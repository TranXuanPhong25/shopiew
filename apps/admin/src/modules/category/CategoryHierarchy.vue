<script setup lang="ts">
import { onMounted } from 'vue'
import { NButton } from 'naive-ui'
import CategoryItem from './CategoryItem.vue'
import CategoryPreview from './CategoryPreview.vue'
import CategoryEditModal from './CategoryEditModal.vue'
import CategoryAddSubModal from './CategoryAddSubModal.vue'
import CategoryAddRootModal from './CategoryAddRootModal.vue'
import DeleteCategoryModal from './DeleteCategoryModal.vue'
import { useCategoryStore } from '@/stores/category'
import LoadingBlock from '@/components/ui/LoadingBlock.vue'

const categoryStore = useCategoryStore()

onMounted(async () => {
  await categoryStore.getProductCategoriesHierarchy()
})



</script>

<template>
  <div class="category-hierarchy">
    <n-h1>Category Hierarchy</n-h1>
    <template v-if="categoryStore.loading">
      <LoadingBlock />
    </template>
    <template v-else>
      <div v-for="category in categoryStore.categories" :key="category.id" :style="{ marginLeft: '-20px' }">
        <CategoryItem :category="category" />
      </div>
      <n-button class="new-root-button" dashed block @click="() => categoryStore.showAddRootCategoryModal()">
        + New root category
      </n-button>
    </template>
  </div>
  <CategoryPreview />

  <CategoryEditModal :show="categoryStore.showEditModal" :category="categoryStore.edittingCategory" />

  <CategoryAddSubModal :show="categoryStore.showAddSubModal" :parentCategory="categoryStore.parentOfEditingCategory" />

  <CategoryAddRootModal :show="categoryStore.showAddRootModal" />

  <DeleteCategoryModal />
</template>

<style scoped>
.category-hierarchy {
  flex-grow: 1;
  padding: 8px;
  background-color: #ffffff;
  border-radius: 12px;
}

.n-button--dashed {
  border: 1px dashed #d1d5db;
  display: block;
  width: 100%;
  margin-top: 10px;
}

.new-root-input {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.n-h1 {
  font-weight: bold;
}
</style>
