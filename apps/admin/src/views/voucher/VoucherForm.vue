<template>
  <n-card :title="isEditing ? 'Chỉnh sửa Voucher' : 'Tạo Voucher mới'">
    <n-form
      ref="formRef"
      :model="formData"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      @submit.prevent="handleSubmit"
    >
      <n-grid :cols="24" :x-gap="16">
        <!-- Code -->
        <n-form-item-gi :span="12" path="code" label="Mã voucher">
          <n-input
            v-model:value="formData.code"
            placeholder="Nhập mã voucher (VD: SUMMER2024)"
            maxlength="50"
            show-count
            :disabled="isEditing"
            @input="handleCodeInput"
          >
            <template #suffix>
              <n-text depth="3" style="font-size: 12px"></n-text>
            </template>
          </n-input>
        </n-form-item-gi>

        <!-- Discount Type -->
        <n-form-item-gi :span="12" path="discountType" label="Loại giảm giá">
          <n-select
            v-model:value="formData.discountType"
            :options="discountTypeOptions"
            placeholder="Chọn loại giảm giá"
          />
        </n-form-item-gi>

      

        <!-- Min Order Value -->
        <n-form-item-gi :span="12" path="minOrderValue" label="Đơn tối thiểu">
          <n-input-number
            v-model:value="formData.minOrderValue"
            :min="0"
            :step="10000"
            placeholder="0 (không giới hạn)"
            style="width: 100%"
          >
            <template #suffix>
              <n-text depth="3">VND</n-text>
            </template>
          </n-input-number>
        </n-form-item-gi>
        <!-- Discount Value -->
        <n-form-item-gi :span="12" path="discountValue" label="Giá trị giảm">
          <n-input-number
            v-model:value="formData.discountValue"
            :min="0.01"
            :max="formData.discountType === 'PERCENTAGE' ? 100 : undefined"
            :step="formData.discountType === 'PERCENTAGE' ? 1 : 1000"
            placeholder="Nhập giá trị"
            style="width: 100%"
          >
            <template #suffix>
              <n-text depth="3">
                {{ formData.discountType === 'PERCENTAGE' ? '%' : 'VND' }}
              </n-text>
            </template>
          </n-input-number>
          <template #feedback>
            <n-text depth="3" style="font-size: 12px">
              {{ 
                formData.discountType === 'PERCENTAGE' 
                  ? 'Giá trị từ 0.01 đến 100%' 
                  : 'Giá trị tối thiểu 0.01 VND' 
              }}
            </n-text>
          </template>
        </n-form-item-gi>
        <!-- Max Usage -->
        <n-form-item-gi :span="12" path="maxUsage" label="Số lần sử dụng">
          <n-input-number
            v-model:value="formData.maxUsage"
            :min="0"
            :step="1"
            placeholder="0 (không giới hạn)"
            style="width: 100%"
          />
          <template #feedback>
            <n-text depth="3" style="font-size: 12px">
              0 = không giới hạn
            </n-text>
          </template>
        </n-form-item-gi>

        <!-- Expires At -->
        <n-form-item-gi :span="12" path="expiresAt" label="Ngày hết hạn">
          <n-date-picker
            v-model:value="expiresAtValue"
            type="datetime"
            placeholder="Chọn ngày hết hạn (tùy chọn)"
            style="width: 100%"
            format="dd/MM/yyyy HH:mm"
            clearable
          />
          <template #feedback>
            <n-text depth="3" style="font-size: 12px">
              Để trống nếu voucher không hết hạn
            </n-text>
          </template>
        </n-form-item-gi>

        <!-- Description -->
        <n-form-item-gi :span="24" path="description" label="Mô tả">
          <n-input
            v-model:value="formData.description"
            type="textarea"
            placeholder="Nhập mô tả voucher (tùy chọn)"
            :rows="3"
            maxlength="500"
            show-count
          />
        </n-form-item-gi>

        <!-- Active Status (only in edit mode) -->
        <n-form-item-gi v-if="isEditing" :span="24" path="isActive" label="Trạng thái">
          <n-switch v-model:value="formData.isActive">
            <template #checked>Hoạt động</template>
            <template #unchecked>Tạm dừng</template>
          </n-switch>
        </n-form-item-gi>
      </n-grid>

      <!-- Actions -->
      <n-space justify="end" style="margin-top: 16px">
        <n-button @click="$emit('cancel')">Hủy</n-button>
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
  NText,
  type FormInst,
  type FormRules,
} from 'naive-ui'
import type { Voucher, CreateVoucherRequest, UpdateVoucherRequest } from '@/models/voucher'
import { DiscountType } from '@/models/voucher'

interface Props {
  initialData?: Voucher | null
  isEditing?: boolean
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: CreateVoucherRequest | UpdateVoucherRequest): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  initialData: null,
  isEditing: false,
  loading: false,
})

const emit = defineEmits<Emits>()

// Form ref
const formRef = ref<FormInst | null>(null)

// Discount type options
const discountTypeOptions = [
  { label: 'Phần trăm (%)', value: DiscountType.PERCENTAGE },
  { label: 'Số tiền cố định', value: DiscountType.FIXED_AMOUNT },
]

// Form data
const formData = ref({
  code: '',
  discountType: DiscountType.PERCENTAGE as DiscountType,
  discountValue: 0,
  minOrderValue: 0,
  maxUsage: 0,
  expiresAt: '',
  description: '',
  isActive: true,
})

// Expires at timestamp (for date picker)
const expiresAtValue = ref<number | null>(null)

// Handle code input (convert to uppercase)
const handleCodeInput = (value: string) => {
  formData.value.code = value.toUpperCase()
}

// Validation rules
const rules: FormRules = {
  code: [
    {
      required: true,
      message: 'Vui lòng nhập mã voucher',
      trigger: 'blur',
    },
    {
      min: 4,
      max: 50,
      message: 'Mã voucher phải từ 4-50 ký tự',
      trigger: 'blur',
    },
    {
      pattern: /^[A-Z0-9_-]+$/,
      message: 'Mã voucher chỉ chứa chữ in hoa, số, gạch ngang và gạch dưới',
      trigger: 'blur',
    },
  ],
  discountType: [
    {
      required: true,
      message: 'Vui lòng chọn loại giảm giá',
      trigger: 'change',
    },
  ],
  discountValue: [
    {
      required: true,
      type: 'number',
      message: 'Vui lòng nhập giá trị giảm',
      trigger: 'blur',
    },
    {
      type: 'number',
      validator: (rule: any, value: number) => {
        if (value <= 0) {
          return new Error('Giá trị giảm phải lớn hơn 0')
        }
        if (
          formData.value.discountType === DiscountType.PERCENTAGE &&
          value > 100
        ) {
          return new Error('Giá trị phần trăm không được vượt quá 100')
        }
        return true
      },
      trigger: 'blur',
    },
  ],
  minOrderValue: [
    {
      type: 'number',
      validator: (rule: any, value: number) => {
        if (value < 0) {
          return new Error('Giá trị đơn tối thiểu không được âm')
        }
        return true
      },
      trigger: 'blur',
    },
  ],
  maxUsage: [
    {
      type: 'number',
      validator: (rule: any, value: number) => {
        if (value < 0) {
          return new Error('Số lần sử dụng không được âm')
        }
        return true
      },
      trigger: 'blur',
    },
  ],
  expiresAt: [
    {
      validator: (rule: any, value: string) => {
        if (value && new Date(value) < new Date()) {
          return new Error('Ngày hết hạn phải ở tương lai')
        }
        return true
      },
      trigger: 'change',
    },
  ],
  description: [
    {
      max: 500,
      message: 'Mô tả không được vượt quá 500 ký tự',
      trigger: 'blur',
    },
  ],
}

// Watch expires at value to update form data
watch(expiresAtValue, (newValue) => {
  if (newValue) {
    formData.value.expiresAt = new Date(newValue).toISOString()
  } else {
    formData.value.expiresAt = ''
  }
})

// Initialize form with initial data
onMounted(() => {
  if (props.initialData) {
    formData.value = {
      code: props.initialData.code,
      discountType: props.initialData.discountType,
      discountValue: props.initialData.discountValue,
      minOrderValue: props.initialData.minOrderValue,
      maxUsage: props.initialData.maxUsage,
      expiresAt: props.initialData.expiresAt || '',
      description: props.initialData.description || '',
      isActive: props.initialData.isActive,
    }

    if (props.initialData.expiresAt) {
      expiresAtValue.value = new Date(props.initialData.expiresAt).getTime()
    }
  }
})

// Handle form submit
const handleSubmit = async () => {
  try {
    await formRef.value?.validate()

    if (props.isEditing) {
      // Update request (exclude code)
      const updateData: UpdateVoucherRequest = {
        discountValue: formData.value.discountValue,
        minOrderValue: formData.value.minOrderValue,
        maxUsage: formData.value.maxUsage,
        expiresAt: formData.value.expiresAt || undefined,
        description: formData.value.description || undefined,
        isActive: formData.value.isActive,
      }
      emit('submit', updateData)
    } else {
      // Create request
      const createData: CreateVoucherRequest = {
        code: formData.value.code,
        discountType: formData.value.discountType,
        discountValue: formData.value.discountValue,
        minOrderValue: formData.value.minOrderValue || undefined,
        maxUsage: formData.value.maxUsage || undefined,
        expiresAt: formData.value.expiresAt || undefined,
        description: formData.value.description || undefined,
      }
      emit('submit', createData)
    }
  } catch (error) {
    console.error('Form validation failed:', error)
  }
}
</script>

<style scoped>
:deep(.n-form-item-feedback-wrapper) {
  min-height: 20px;
}
</style>
