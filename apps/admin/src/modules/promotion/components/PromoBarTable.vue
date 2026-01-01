<template>
  <div class="promo-bar-table">
    <n-data-table
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="paginationConfig"
      :row-key="(row: PromoBar) => row.id"
      size="small"
      striped
    />

    <!-- Delete Confirmation Dialog -->
    <n-modal
      v-model:show="showDeleteModal"
      preset="dialog"
      title="Xác nhận xóa"
      :content="`Bạn có chắc muốn xóa promo bar '${selectedPromoBar?.message}'? Hành động này không thể hoàn tác.`"
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
import type { PromoBar } from '@/models/promotion'

interface Props {
  data: PromoBar[]
  loading?: boolean
  pagination?: boolean
  pageSize?: number
}

interface Emits {
  (e: 'edit', promoBar: PromoBar): void
  (e: 'delete', id: string): void
  (e: 'view', promoBar: PromoBar): void
  (e: 'toggle-status', promoBar: PromoBar): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  pagination: true,
  pageSize: 10,
})

const emit = defineEmits<Emits>()

// State for delete modal
const showDeleteModal = ref(false)
const selectedPromoBar = ref<PromoBar | null>(null)

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

// Get status tag type
const getStatusTagType = (isActive: boolean, startTime: string, endTime: string) => {
  const now = new Date()
  const start = new Date(startTime)
  const end = new Date(endTime)

  if (!isActive) return 'default'
  if (now < start) return 'warning'
  if (now > end) return 'error'
  return 'success'
}

// Get status text
const getStatusText = (isActive: boolean, startTime: string, endTime: string) => {
  const now = new Date()
  const start = new Date(startTime)
  const end = new Date(endTime)

  if (!isActive) return 'Tắt'
  if (now < start) return 'Chưa bắt đầu'
  if (now > end) return 'Đã kết thúc'
  return 'Đang hoạt động'
}

// Handle delete click
const handleDeleteClick = (promoBar: PromoBar) => {
  selectedPromoBar.value = promoBar
  showDeleteModal.value = true
}

// Handle confirm delete
const handleConfirmDelete = () => {
  if (selectedPromoBar.value) {
    emit('delete', selectedPromoBar.value.id)
  }
  showDeleteModal.value = false
  selectedPromoBar.value = null
}

// Create color preview
const createColorPreview = (color: string, size = 20) => {
  return h('div', {
    style: {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: color,
      borderRadius: '50%',
      border: '1px solid #ddd',
      display: 'inline-block',
    },
  })
}

// Table columns definition
const columns: DataTableColumns<PromoBar> = [
  {
    title: 'Nội dung',
    key: 'message',
    width: 300,
    ellipsis: {
      tooltip: true,
    },
    render(row) {
      return h(
        'div',
        {
          style: {
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: row.backgroundColor,
            color: row.textColor,
            fontSize: '12px',
            textAlign: 'center',
          },
        },
        row.message,
      )
    },
  },
  {
    title: 'Màu nền',
    key: 'backgroundColor',
    width: 80,
    render(row) {
      return h(
        NSpace,
        { align: 'center', size: 'small' },
        {
          default: () => [
            createColorPreview(row.backgroundColor),
            h(
              NText,
              { depth: 3, style: 'font-size: 11px;' },
              {
                default: () => row.backgroundColor,
              },
            ),
          ],
        },
      )
    },
  },
  {
    title: 'Màu chữ',
    key: 'textColor',
    width: 80,
    render(row) {
      return h(
        NSpace,
        { align: 'center', size: 'small' },
        {
          default: () => [
            createColorPreview(row.textColor),
            h(
              NText,
              { depth: 3, style: 'font-size: 11px;' },
              {
                default: () => row.textColor,
              },
            ),
          ],
        },
      )
    },
  },
  {
    title: 'Thời gian bắt đầu',
    key: 'startTime',
    width: 140,
    render(row) {
      return h(NTime, {
        time: new Date(row.startTime),
        format: 'dd/MM/yyyy HH:mm',
      })
    },
  },
  {
    title: 'Thời gian kết thúc',
    key: 'endTime',
    width: 140,
    render(row) {
      return h(NTime, {
        time: new Date(row.endTime),
        format: 'dd/MM/yyyy HH:mm',
      })
    },
  },
  {
    title: 'Độ ưu tiên',
    key: 'priority',
    width: 80,
    sorter: (row1, row2) => row1.priority - row2.priority,
    render(row) {
      return h(
        NText,
        {
          type: row.priority > 5 ? 'success' : 'default',
        },
        {
          default: () => row.priority,
        },
      )
    },
  },
  {
    title: 'Có thể đóng',
    key: 'isCloseable',
    width: 80,
    render(row) {
      return h(
        NTag,
        {
          type: row.isCloseable ? 'success' : 'warning',
          size: 'small',
        },
        {
          default: () => (row.isCloseable ? 'Có' : 'Không'),
        },
      )
    },
  },
  {
    title: 'Trạng thái',
    key: 'status',
    width: 120,
    render(row) {
      const tagType = getStatusTagType(row.isActive, row.startTime, row.endTime)
      const statusText = getStatusText(row.isActive, row.startTime, row.endTime)

      return h(
        NTag,
        {
          type: tagType,
          size: 'small',
        },
        {
          default: () => statusText,
        },
      )
    },
  },
  {
    title: 'Thao tác',
    key: 'actions',
    width: 150,
    fixed: 'right',
    render(row) {
      return h(
        NSpace,
        { size: 'small' },
        {
          default: () => [
            h(
              NButton,
              {
                size: 'tiny',
                type: 'info',
                onClick: () => emit('view', row),
              },
              {
                default: () => 'Xem',
              },
            ),
            h(
              NButton,
              {
                size: 'tiny',
                type: 'primary',
                onClick: () => emit('edit', row),
              },
              {
                default: () => 'Sửa',
              },
            ),
            h(
              NButton,
              {
                size: 'tiny',
                type: row.isActive ? 'warning' : 'success',
                onClick: () => emit('toggle-status', row),
              },
              {
                default: () => (row.isActive ? 'Tắt' : 'Bật'),
              },
            ),
            h(
              NButton,
              {
                size: 'tiny',
                type: 'error',
                onClick: () => handleDeleteClick(row),
              },
              {
                default: () => 'Xóa',
              },
            ),
          ],
        },
      )
    },
  },
]
</script>

<style scoped>
.promo-bar-table {
  width: 100%;
}
</style>
