<template>
  <n-card :title="isEditing ? 'Chỉnh sửa Event Banner' : 'Tạo Event Banner mới'">
    <n-form ref="formRef" :model="formData" :rules="rules" label-placement="left" label-width="auto"
      require-mark-placement="right-hanging" @submit.prevent="handleSubmit">
      <n-grid :cols="24" :x-gap="16">
        <!-- Title -->
        <n-form-item-gi :span="24" path="title" label="Tiêu đề">
          <n-input v-model:value="formData.title" placeholder="Nhập tiêu đề banner" maxlength="200" show-count />
        </n-form-item-gi>

        <!-- Description -->
        <n-form-item-gi :span="24" path="description" label="Mô tả">
          <n-input v-model:value="formData.description" type="textarea" placeholder="Nhập mô tả (tùy chọn)" :rows="3" />
        </n-form-item-gi>

        <!-- Image URL -->
        <n-form-item-gi :span="24" path="imageUrl" label="URL hình ảnh">
          <n-input v-model:value="formData.imageUrl" placeholder="https://example.com/banner.jpg" />
        </n-form-item-gi>

        <!-- Image Preview -->
        <n-form-item-gi v-if="formData.imageUrl" :span="24" label="Xem trước">
          <div class="image-preview">
            <n-image :src="formData.imageUrl" fallback-src="/placeholder-image.svg" height="120" object-fit="cover"
              preview-disabled />
          </div>
        </n-form-item-gi>

        <!-- Link URL -->
        <n-form-item-gi :span="24" path="linkUrl" label="URL liên kết">
          <n-input v-model:value="formData.linkUrl" placeholder="https://example.com/promotion (tùy chọn)" />
        </n-form-item-gi>

        <!-- Event Type -->
        <n-form-item-gi :span="12" path="eventType" label="Loại sự kiện">
          <n-select v-model:value="formData.eventType" :options="EVENT_TYPE_OPTIONS" placeholder="Chọn loại sự kiện" />
        </n-form-item-gi>

        <!-- Position -->
        <n-form-item-gi :span="12" path="position" label="Vị trí">
          <n-select v-model:value="formData.position" :options="POSITION_OPTIONS" placeholder="Chọn vị trí hiển thị" />
        </n-form-item-gi>

        <!-- Start Time -->
        <n-form-item-gi :span="12" path="startTime" label="Thời gian bắt đầu">
          <n-date-picker v-model:value="startTimeValue" type="datetime" placeholder="Chọn thời gian bắt đầu"
            style="width: 100%" format="dd/MM/yyyy HH:mm" />
        </n-form-item-gi>

        <!-- End Time -->
        <n-form-item-gi :span="12" path="endTime" label="Thời gian kết thúc">
          <n-date-picker v-model:value="endTimeValue" type="datetime" placeholder="Chọn thời gian kết thúc"
            style="width: 100%" format="dd/MM/yyyy HH:mm" />
        </n-form-item-gi>

        <!-- Priority -->
        <n-form-item-gi :span="12" path="priority" label="Độ ưu tiên">
          <n-input-number v-model:value="formData.priority" :min="0" :max="100" placeholder="0" style="width: 100%" />
          <template #suffix>
            <n-text depth="3" style="font-size: 12px; margin-left: 8px">
              Số càng cao càng ưu tiên
            </n-text>
          </template>
        </n-form-item-gi>

        <!-- Active Status -->
        <n-form-item-gi :span="12" path="isActive" label="Trạng thái">
          <n-switch v-model:value="formData.isActive" checked-value="true" unchecked-value="false">
            <template #checked>Kích hoạt</template>
            <template #unchecked>Tắt</template>
          </n-switch>
        </n-form-item-gi>
      </n-grid>

      <!-- Actions -->
      <n-space justify="end" style="margin-top: 16px">
        <n-button @click="$emit('cancel')"> Hủy </n-button>
        <n-button type="primary" :loading="loading" attr-type="submit">
          {{ isEditing ? 'Cập nhật' : 'Tạo mới' }}
        </n-button>
      </n-space>
    </n-form>
  </n-card>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import {
  NCard,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NSelect,
  NDatePicker,
  NInputNumber,
  NSwitch,
  NSpace,
  NButton,
  NImage,
  NText,
  type FormInst,
  type FormRules,
} from 'naive-ui'
import { EVENT_TYPE_OPTIONS, POSITION_OPTIONS } from '@/models/promotion'
import type {
  CreateEventBannerRequest,
  UpdateEventBannerRequest,
  EventBanner,
} from '@/models/promotion'

interface Props {
  initialData?: EventBanner | null
  loading?: boolean
  isEditing?: boolean
}

interface Emits {
  (e: 'submit', data: CreateEventBannerRequest | UpdateEventBannerRequest): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  initialData: null,
  loading: false,
  isEditing: false,
})

const emit = defineEmits<Emits>()

const formRef = ref<FormInst | null>(null)

// Form data with proper typing
interface FormData {
  title: string
  description: string
  imageUrl: string
  linkUrl: string
  eventType: string
  position: string
  priority: number
  isActive: boolean
}

const formData = ref<FormData>({
  title: '',
  description: '',
  imageUrl: '',
  linkUrl: '',
  eventType: 'other',
  position: 'main',
  priority: 0,
  isActive: true,
})

// Date picker values (timestamps)
const startTimeValue = ref<number | null>(null)
const endTimeValue = ref<number | null>(null)

// Validation rules
const rules: FormRules = {
  title: [
    { required: true, message: 'Vui lòng nhập tiêu đề', trigger: 'blur' },
    { min: 3, max: 200, message: 'Tiêu đề phải có từ 3-200 ký tự', trigger: 'blur' },
  ],
  imageUrl: [
    { required: true, message: 'Vui lòng nhập URL hình ảnh', trigger: 'blur' },
    {
      // pattern: /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i,
      message: 'URL hình ảnh không hợp lệ',
      trigger: 'blur',
    },
  ],
  linkUrl: [
    {
      validator: (rule: any, value: string) => {
        if (!value) return true
        return /^https?:\/\/.+/.test(value)
      },
      message: 'URL liên kết không hợp lệ',
      trigger: 'blur',
    },
  ],
  eventType: [{ required: true, message: 'Vui lòng chọn loại sự kiện', trigger: 'change' }],
}

// Computed for form validation with time
const isValidForm = computed(() => {
  return (
    formData.value.title &&
    formData.value.imageUrl &&
    formData.value.eventType &&
    startTimeValue.value &&
    endTimeValue.value &&
    startTimeValue.value < endTimeValue.value
  )
})

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = {
        title: newData.title,
        description: newData.description || '',
        imageUrl: newData.imageUrl,
        linkUrl: newData.linkUrl || '',
        eventType: newData.eventType,
        position: newData.position,
        priority: newData.priority,
        isActive: newData.isActive,
      }
      startTimeValue.value = new Date(newData.startTime).getTime()
      endTimeValue.value = new Date(newData.endTime).getTime()
    }
  },
  { immediate: true },
)

// Handle form submission
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    if (!startTimeValue.value || !endTimeValue.value) {
      console.log('Missing start or end time')
      window.$message?.error('Vui lòng chọn thời gian bắt đầu và kết thúc')
      return
    }

    if (startTimeValue.value >= endTimeValue.value) {
      window.$message?.error('Thời gian kết thúc phải sau thời gian bắt đầu')
      return
    }

    const submitData = {
      ...(props.isEditing && props.initialData && { id: props.initialData.id }),
      title: formData.value.title,
      description: formData.value.description || undefined,
      imageUrl: formData.value.imageUrl,
      linkUrl: formData.value.linkUrl || undefined,
      startTime: new Date(startTimeValue.value).toISOString(),
      endTime: new Date(endTimeValue.value).toISOString(),
      priority: formData.value.priority,
      isActive: formData.value.isActive,
      eventType: formData.value.eventType as any,
      position: formData.value.position as any,
    }

    emit('submit', submitData)
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

// Reset form
const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    imageUrl: '',
    linkUrl: '',
    eventType: 'other',
    position: 'main',
    priority: 0,
    isActive: true,
  }
  startTimeValue.value = null
  endTimeValue.value = null
}

defineExpose({
  resetForm,
})
</script>

<style scoped>
.image-preview {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 8px;
  display: inline-block;
}
</style>
