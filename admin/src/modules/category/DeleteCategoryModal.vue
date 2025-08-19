<script setup lang="ts">
import { useCategoryStore } from '@/stores/category'
import { NModal } from 'naive-ui'

const categoryStore = useCategoryStore()
</script>

<template>
  <n-modal v-model:show="categoryStore.showDeleteModal" :mask-closable="true" title="Delete Category" preset="dialog"
    content="Are you sure you want to delete this category?" positive-text="Confirm" negative-text="Cancel"
    :loading="categoryStore.isDeleting" @positive-click="categoryStore.confirmDeleteCategory"
    @negative-click="categoryStore.cancelDeleteCategory" />
</template>
