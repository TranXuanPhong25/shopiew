<script setup lang="ts">
import { ref, watch } from 'vue'
import { NModal, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import { Category } from '@/models/category.ts'
import { useCategoryStore } from '@/stores/category'

const props = defineProps({
   show: {
      type: Boolean,
      default: false,
   },
   parentCategory: {
      type: Object as () => Category | null,
      default: null,
   },
})

const categoryStore = useCategoryStore()
const formData = ref({
   name: '',
   imageUrl: '/logo.svg', // Default image URL
})

const message = useMessage()

// Reset form when modal is opened
watch(
   () => props.show,
   (isVisible) => {
      if (isVisible) {
         formData.value.name = ''
      }
   },
   { immediate: true },
)


// Submit the form
const handleSubmit = async () => {
   if (!formData.value.name.trim()) {
      message.error('Tên danh mục không được để trống')
      return
   }

   if (!props.parentCategory || !props.parentCategory.id) {
      message.error('Không tìm thấy danh mục cha')
      return
   }


   await categoryStore.addSubCategory({
      name: formData.value.name.trim(),
      imageUrl: formData.value.imageUrl.trim(),
   })
   formData.value.name = '' // Reset the name field after submission
   formData.value.imageUrl = '/logo.svg' // Reset the image URL to default
   // Close the modal
   categoryStore.closeAddSubCategoryModal()
}
</script>

<template>
   <n-modal style="width: 600px" class="category-add-sub-modal" :show="show" title="Thêm danh mục con"
      :style="{ width: '500px' }" preset="card" :mask-closable="false" @close="categoryStore.closeAddSubCategoryModal">
      <n-form v-if="parentCategory" label-placement="left" label-width="100px">
         <p class="parent-info">
            Thêm vào danh mục: <strong>{{ parentCategory.name }}</strong>
         </p>

         <n-form-item label="Tên danh mục">
            <n-input v-model:value="formData.name" placeholder="Nhập tên danh mục con" />
         </n-form-item>

         <n-form-item label="Ảnh">
            <n-input v-model:value="formData.imageUrl" placeholder="URL ảnh danh mục" />
         </n-form-item>

         <div class="action-buttons">
            <n-button @click="categoryStore.closeAddSubCategoryModal">Hủy</n-button>
            <n-button type="primary" @click="handleSubmit">Lưu</n-button>
         </div>
      </n-form>
   </n-modal>
</template>

<style scoped>
.action-buttons {
   display: flex;
   justify-content: flex-end;
   gap: 12px;
   margin-top: 16px;
}

.parent-info {
   margin-bottom: 16px;
   padding: 8px;
   background-color: rgba(0, 0, 0, 0.03);
   border-radius: 4px;
}
</style>
