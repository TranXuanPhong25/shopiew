<template>
  <div class="voucher-table">
    <n-data-table
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="paginationConfig"
      :row-key="(row: Voucher) => row.id"
      size="small"
      striped
    />

    <!-- Delete Confirmation Dialog -->
    <n-modal
      v-model:show="showDeleteModal"
      preset="dialog"
      title="Xác nhận xóa"
      :content="`Bạn có chắc muốn xóa voucher '${selectedVoucher?.code}'? Hành động này không thể hoàn tác.`"
      positive-text="Xóa"
      negative-text="Hủy"
      @positive-click="handleConfirmDelete"
      @negative-click="showDeleteModal = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue'
import {
  NDataTable,
  NButton,
  NTag,
  NSpace,
  NModal,
  NText,
  NTime,
  type DataTableColumns,
  type PaginationProps,
} from 'naive-ui'
import type { Voucher } from '@/models/voucher'
import { DiscountType } from '@/models/voucher'

interface Props {
  data: Voucher[]
  loading?: boolean
  pagination?: boolean
  pageSize?: number
}

interface Emits {
  (e: 'edit', voucher: Voucher): void
  (e: 'delete', id: number): void
  (e: 'view', voucher: Voucher): void
  (e: 'toggle-status', voucher: Voucher): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  pagination: true,
  pageSize: 10,
})

const emit = defineEmits<Emits>()

// State for delete modal
const showDeleteModal = ref(false)
const selectedVoucher = ref<Voucher | null>(null)

// Pagination config
const paginationConfig = computed((): PaginationProps | false => {
  if (!props.pagination) return false
  return {
    pageSize: props.pageSize,
    showSizePicker: true,
    pageSizes: [5, 10, 20, 50],
    showQuickJumper: true,
    simple: false,
  }
})

// Format discount value
const formatDiscountValue = (value: number, type: DiscountType) => {
  if (type === DiscountType.PERCENTAGE) {
    return `${value}%`
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

// Format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

// Get discount type tag
const getDiscountTypeTag = (type: DiscountType) => {
  return type === DiscountType.PERCENTAGE ? 'info' : 'success'
}

// Get discount type label
const getDiscountTypeLabel = (type: DiscountType) => {
  return type === DiscountType.PERCENTAGE ? 'Phần trăm' : 'Số tiền'
}

// Get status tag type
const getStatusTagType = (isActive: boolean, expiresAt: string | null) => {
  if (!isActive) return 'default'
  if (!expiresAt) return 'success'
  
  const now = new Date()
  const expiration = new Date(expiresAt)
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  
  if (expiration < now) return 'error'
  if (expiration <= sevenDaysLater) return 'warning'
  return 'success'
}

// Get status text
const getStatusText = (isActive: boolean, expiresAt: string | null) => {
  if (!isActive) return 'Tạm dừng'
  if (!expiresAt) return 'Hoạt động'
  
  const now = new Date()
  const expiration = new Date(expiresAt)
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  
  if (expiration < now) return 'Đã hết hạn'
  if (expiration <= sevenDaysLater) return 'Sắp hết hạn'
  return 'Hoạt động'
}

// Handle delete click
const handleDeleteClick = (voucher: Voucher) => {
  selectedVoucher.value = voucher
  showDeleteModal.value = true
}

// Handle confirm delete
const handleConfirmDelete = () => {
  if (selectedVoucher.value) {
    emit('delete', selectedVoucher.value.id)
  }
  showDeleteModal.value = false
  selectedVoucher.value = null
}

// Table columns definition
const columns: DataTableColumns<Voucher> = [
  {
    title: 'Mã voucher',
    key: 'code',
    width: 140,
    render(row) {
      return h(
        NTag,
        {
          type: 'info',
          bordered: false,
          strong: true,
        },
        { default: () => row.code }
      )
    },
  },
  {
    title: 'Loại',
    key: 'discountType',
    width: 100,
    render(row) {
      return h(
        NTag,
        {
          type: getDiscountTypeTag(row.discountType),
          size: 'small',
        },
        { default: () => getDiscountTypeLabel(row.discountType) }
      )
    },
  },
  {
    title: 'Giá trị',
    key: 'discountValue',
    width: 120,
    render(row) {
      return h(
        NText,
        { strong: true, type: 'success' },
        { default: () => formatDiscountValue(row.discountValue, row.discountType) }
      )
    },
  },
  {
    title: 'Đơn tối thiểu',
    key: 'minOrderValue',
    width: 130,
    render(row) {
      return row.minOrderValue > 0 ? formatCurrency(row.minOrderValue) : 'Không giới hạn'
    },
  },
  {
    title: 'Số lần dùng',
    key: 'maxUsage',
    width: 110,
    align: 'center',
    render(row) {
      if (row.maxUsage === 0) return 'Không giới hạn'
      return `${row.usedCount}/${row.maxUsage}`
    },
  },
  {
    title: 'Hạn dùng',
    key: 'expiresAt',
    width: 150,
    render(row) {
      if (!row.expiresAt) {
        return h(NText, { depth: 3 }, { default: () => 'Vô hạn' })
      }
      return h(NTime, {
        time: new Date(row.expiresAt),
        format: 'dd/MM/yyyy HH:mm',
      })
    },
  },
  {
    title: 'Trạng thái',
    key: 'isActive',
    width: 130,
    render(row) {
      return h(
        NTag,
        {
          type: getStatusTagType(row.isActive, row.expiresAt),
          size: 'small',
        },
        { default: () => getStatusText(row.isActive, row.expiresAt) }
      )
    },
  },
  {
    title: 'Thao tác',
    key: 'actions',
    width: 200,
    fixed: 'right' as const,
    render(row) {
      return h(
        NSpace,
        { size: 'small' },
        {
          default: () => [
            h(
              NButton,
              {
                size: 'small',
                onClick: () => emit('view', row),
              },
              { default: () => 'Xem' }
            ),
            h(
              NButton,
              {
                size: 'small',
                type: 'primary',
                onClick: () => emit('edit', row),
              },
              { default: () => 'Sửa' }
            ),
            h(
              NButton,
              {
                size: 'small',
                type: row.isActive ? 'warning' : 'success',
                onClick: () => emit('toggle-status', row),
              },
              { default: () => (row.isActive ? 'Tắt' : 'Bật') }
            ),
            h(
              NButton,
              {
                size: 'small',
                type: 'error',
                onClick: () => handleDeleteClick(row),
              },
              { default: () => 'Xóa' }
            ),
          ],
        }
      )
    },
  },
]
</script>

<style scoped>
.voucher-table {
  width: 100%;
}
</style>
