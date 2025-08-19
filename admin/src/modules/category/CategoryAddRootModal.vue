<script setup lang="ts">
import { ref } from 'vue'
import { NModal, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import { useCategoryStore } from '@/stores/category'
import { Category } from '@/models/category'

defineProps({
   show: {
      type: Boolean,
      default: false,
   },
})
const categoryStorage = useCategoryStore()
const formData = ref({
   name: '',
   imageUrl: '/logo.svg', // Default image URL
})

const message = useMessage()

// Submit the form
const handleSubmit = async () => {
   if (!formData.value.name.trim()) {
      message.error('Tên danh mục không được để trống')
      return
   }

   await categoryStorage.addRootCategory(new Category({
      name: formData.value.name.trim(),
      imageUrl: formData.value.imageUrl.trim(),
      children: []
   }))
   formData.value.name = ''
   formData.value.imageUrl = '/logo.svg'
   categoryStorage.closeAddRootCategoryModal()

}
</script>

<template>
   <n-modal :show="show" preset="card" title="Thêm danh mục gốc" :mask-closable="false" :style="{ width: '500px' }"
      @close="categoryStorage.closeAddRootCategoryModal">
      <n-form label-placement="left" label-width="100px">
         <n-form-item label="Tên danh mục">
            <n-input v-model:value="formData.name" placeholder="Nhập tên danh mục gốc" />
         </n-form-item>

         <n-form-item label="Ảnh">
            <n-input v-model:value="formData.imageUrl" placeholder="URL ảnh danh mục" />
         </n-form-item>

         <div class="action-buttons">
            <n-button @click="categoryStorage.closeAddRootCategoryModal">Hủy</n-button>
            <n-button type="primary" @click="handleSubmit">Thêm</n-button>
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
</style>
