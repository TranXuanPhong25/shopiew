<template>
  <n-card :title="isEditing ? 'Chỉnh sửa Promo Bar' : 'Tạo Promo Bar mới'">
    <n-form ref="formRef" :model="formData" :rules="rules" label-placement="left" label-width="auto"
      require-mark-placement="right-hanging" @submit.prevent="handleSubmit">
      <n-grid :cols="24" :x-gap="16">
        <!-- Message -->
        <n-form-item-gi :span="24" path="message" label="Nội dung thông báo">
          <n-input v-model:value="formData.message" placeholder="Nhập nội dung thông báo khuyến mãi" maxlength="300"
            show-count />
        </n-form-item-gi>

        <!-- Preview -->
        <n-form-item-gi v-if="formData.message" :span="24" label="Xem trước">
          <div class="promo-bar-preview" :style="{
            backgroundColor: formData.backgroundColor,
            color: formData.textColor,
            padding: '12px 16px',
            borderRadius: '4px',
            textAlign: 'center',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }">
            {{ formData.message }}
            <n-icon v-if="formData.isCloseable" :size="16" style="position: absolute; right: 12px; cursor: pointer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z" />
              </svg>
            </n-icon>
          </div>
        </n-form-item-gi>

        <!-- Background Color -->
        <n-form-item-gi :span="12" path="backgroundColor" label="Màu nền">
          <n-color-picker v-model:value="formData.backgroundColor" :modes="['hex']" :show-alpha="false"
            style="width: 100%" />
        </n-form-item-gi>

        <!-- Text Color -->
        <n-form-item-gi :span="12" path="textColor" label="Màu chữ">
          <n-color-picker v-model:value="formData.textColor" :modes="['hex']" :show-alpha="false" style="width: 100%" />
        </n-form-item-gi>

        <!-- Link URL -->
        <n-form-item-gi :span="24" path="linkUrl" label="URL liên kết">
          <n-input v-model:value="formData.linkUrl" placeholder="https://example.com/promotion (tùy chọn)" />
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
        <n-form-item-gi :span="8" path="priority" label="Độ ưu tiên">
          <n-input-number v-model:value="formData.priority" :min="0" :max="100" placeholder="0" style="width: 100%" />
        </n-form-item-gi>

        <!-- Active Status -->
        <n-form-item-gi :span="8" path="isActive" label="Trạng thái">
          <n-switch v-model:value="formData.isActive" checked-value="true" unchecked-value="false">
            <template #checked>Kích hoạt</template>
            <template #unchecked>Tắt</template>
          </n-switch>
        </n-form-item-gi>

        <!-- Is Closeable -->
        <n-form-item-gi :span="8" path="isCloseable" label="Có thể đóng">
          <n-switch v-model:value="formData.isCloseable" checked-value="true" unchecked-value="false">
            <template #checked>Có</template>
            <template #unchecked>Không</template>
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
import { ref, computed, watch } from 'vue'
import {
  NCard,
  NForm,
  NFormItemGi,
  NGrid,
  NInput,
  NColorPicker,
  NDatePicker,
  NInputNumber,
  NSwitch,
  NSpace,
  NButton,
  NIcon,
  type FormInst,
  type FormRules,
} from 'naive-ui'
import type { CreatePromoBarRequest, UpdatePromoBarRequest, PromoBar } from '@/models/promotion'

interface Props {
  initialData?: PromoBar | null
  loading?: boolean
  isEditing?: boolean
}

interface Emits {
  (e: 'submit', data: CreatePromoBarRequest | UpdatePromoBarRequest): void
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
  message: string
  backgroundColor: string
  textColor: string
  linkUrl: string
  priority: number
  isActive: boolean
  isCloseable: boolean
}

const formData = ref<FormData>({
  message: '',
  backgroundColor: '#ff0000',
  textColor: '#ffffff',
  linkUrl: '',
  priority: 0,
  isActive: true,
  isCloseable: true,
})

// Date picker values (timestamps)
const startTimeValue = ref<number | null>(null)
const endTimeValue = ref<number | null>(null)

// Validation rules
const rules: FormRules = {
  message: [
    { required: true, message: 'Vui lòng nhập nội dung thông báo', trigger: 'blur' },
    { min: 3, max: 300, message: 'Nội dung phải có từ 3-300 ký tự', trigger: 'blur' },
  ],
  backgroundColor: [
    { required: true, message: 'Vui lòng chọn màu nền', trigger: 'change' },
    {
      pattern: /^#[0-9A-F]{6}$/i,
      message: 'Mã màu không hợp lệ',
      trigger: 'change',
    },
  ],
  textColor: [
    { required: true, message: 'Vui lòng chọn màu chữ', trigger: 'change' },
    {
      pattern: /^#[0-9A-F]{6}$/i,
      message: 'Mã màu không hợp lệ',
      trigger: 'change',
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
}

// Computed for form validation with time
const isValidForm = computed(() => {
  return (
    formData.value.message &&
    formData.value.backgroundColor &&
    formData.value.textColor &&
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
        message: newData.message,
        backgroundColor: newData.backgroundColor,
        textColor: newData.textColor,
        linkUrl: newData.linkUrl || '',
        priority: newData.priority,
        isActive: newData.isActive,
        isCloseable: newData.isCloseable,
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
      window.$message?.error('Vui lòng chọn thời gian bắt đầu và kết thúc')
      return
    }

    if (startTimeValue.value >= endTimeValue.value) {
      window.$message?.error('Thời gian kết thúc phải sau thời gian bắt đầu')
      return
    }

    const submitData = {
      ...(props.isEditing && props.initialData && { id: props.initialData.id }),
      message: formData.value.message,
      backgroundColor: formData.value.backgroundColor,
      textColor: formData.value.textColor,
      linkUrl: formData.value.linkUrl || undefined,
      startTime: new Date(startTimeValue.value).toISOString(),
      endTime: new Date(endTimeValue.value).toISOString(),
      priority: formData.value.priority,
      isActive: Boolean(formData.value.isActive),
      isCloseable: formData.value.isCloseable,
    }

    emit('submit', submitData)
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}

// Reset form
const resetForm = () => {
  formData.value = {
    message: '',
    backgroundColor: '#ff0000',
    textColor: '#ffffff',
    linkUrl: '',
    priority: 0,
    isActive: true,
    isCloseable: true,
  }
  startTimeValue.value = null
  endTimeValue.value = null
}

defineExpose({
  resetForm,
})
</script>

<style scoped>
.promo-bar-preview {
  width: 100%;
  min-height: 48px;
  border: 1px dashed #d0d0d0;
  font-weight: 500;
}
</style>
