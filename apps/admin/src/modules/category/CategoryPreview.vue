<script lang="ts" setup>
import { NImage } from 'naive-ui'
import { useCategoryStore } from '@/stores/category';

const categoryStore = useCategoryStore();
</script>
<template>
  <div class="category-preview flex items-center justify-center">
    <template v-if="categoryStore.previewCategory">
      <h2>{{ categoryStore.previewCategory.name }}</h2>
      <NImage :src="categoryStore.previewCategory.imageUrl" :alt="categoryStore.previewCategory.name" width="100%"
        height="200px" G fit="cover" />
    </template>
    <template v-else>
      <p>Hover a category to view details</p>
    </template>
  </div>
</template>

<style scoped>
.category-preview {
  flex-direction: column;
  gap: 16px;
  width: 300px;
  padding: 32px;
}
</style>
