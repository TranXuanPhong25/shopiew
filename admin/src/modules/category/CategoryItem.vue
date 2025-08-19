<script setup lang="ts">
import { ref } from 'vue'
import { NButton } from 'naive-ui'
import CategoryItem from './CategoryItem.vue'
import { Pencil, Plus } from '@vicons/tabler'
import { CaretDown16Regular as CaretDown } from '@vicons/fluent'
import { TrashBinOutline as TrashBin } from '@vicons/ionicons5'
import { Category } from '@/models/category.ts'
import { useCategoryStore } from '@/stores/category'
defineProps({
  category: {
    type: Object as () => Category,
    required: true,
  },
  parent: {
    type: Object as () => Category,
    default: null,
  },
})
const categoryStore = useCategoryStore();
const collapsed = ref(false)

</script>

<template>
  <div class="category-item-container"
    :style="{ marginLeft: `20px`, borderLeft: collapsed ? 'none' : '1px solid #41B883' }">
    <div class="category-header" @mouseover="() => categoryStore.setPreviewCategory(category)">
      <n-button quaternary size="tiny" @click="collapsed = !collapsed">
        <n-icon>
          <CaretDown class="caret-down" :class="[!collapsed || 'caret-collapsed']" />
        </n-icon>
      </n-button>
      <div class="display-container">
        <span class="category-name" @click="collapsed = !collapsed">{{
          category.name
        }}</span>

        <n-button @click="() => categoryStore.openEditModal(category, parent)" size="tiny" quaternary>
          <n-icon>
            <Pencil />
          </n-icon>
        </n-button>

        <n-button @click="() => categoryStore.openDeleteCategoryModal(parent, category.id!)" size="tiny"
          class="appear-on-hover" style="display: none" type="error">
          <n-icon>
            <TrashBin />
          </n-icon>
        </n-button>
      </div>
    </div>

    <div v-if="category.children && category.children.length && !collapsed">
      <CategoryItem v-for="child in category.children" :key="child.id" :category="child" :parent="category"
        @mouseover="() => categoryStore.setPreviewCategory(category.children[category.children.indexOf(child)])" />
    </div>
    <n-button @click="() => categoryStore.showAddSubCategoryModal(category)" size="tiny" :focusable="false"
      v-if="!collapsed" :style="{ marginLeft: `20px`, marginTop: '8px' }">
      <n-icon>
        <Plus />
      </n-icon>
      New
    </n-button>
  </div>
</template>

<style scoped>
.category-item-container {
  margin-top: 8px;
  /* tương đương mt-2 */
}

.category-header:hover .appear-on-hover {
  display: block !important;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 8px;
  /* khoảng cách giữa các phần tử */
}

/* Container hiển thị tên và nút thêm */
.display-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Tên danh mục, cho phép double-click */
.category-name {
  cursor: pointer;
}

/* Container khi ở chế độ chỉnh sửa tên */
.edit-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Nút thêm sub */
.add-sub-button {
  margin-left: 10px;
}

/* Container input thêm sub-category */
.input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  margin-left: 20px;
}

.caret-collapsed {
  transform: rotate(-90deg);
}

.caret-down {
  transition: transform 0.2s;
}
</style>
