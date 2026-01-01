<template>
  <div class="event-banner-table">
    <n-data-table
      :columns="columns"
      :data="data"
      :loading="loading"
      :pagination="paginationConfig"
      :row-key="(row: EventBanner) => row.id"
      size="small"
      striped
    />

    <!-- Delete Confirmation Dialog -->
    <n-modal
      v-model:show="showDeleteModal"
      preset="dialog"
      title="Xác nhận xóa"
      :content="`Bạn có chắc muốn xóa banner '${selectedBanner?.title}'? Hành động này không thể hoàn tác.`"
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
  NImage,
  NModal,
  NText,
  NTime,
  type DataTableColumns,
  type PaginationProps,
} from 'naive-ui'
import type { EventBanner } from '@/models/promotion'
import { EVENT_TYPE_OPTIONS, POSITION_OPTIONS } from '@/models/promotion'

interface Props {
  data: EventBanner[]
  loading?: boolean
  pagination?: boolean
  pageSize?: number
}

interface Emits {
  (e: 'edit', banner: EventBanner): void
  (e: 'delete', id: string): void
  (e: 'view', banner: EventBanner): void
  (e: 'toggle-status', banner: EventBanner): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  pagination: true,
  pageSize: 10,
})

const emit = defineEmits<Emits>()

// State for delete modal
const showDeleteModal = ref(false)
const selectedBanner = ref<EventBanner | null>(null)

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

// Get event type label
const getEventTypeLabel = (value: string) => {
  return EVENT_TYPE_OPTIONS.find((option) => option.value === value)?.label || value
}

// Get position label
const getPositionLabel = (value: string) => {
  return POSITION_OPTIONS.find((option) => option.value === value)?.label || value
}

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
const handleDeleteClick = (banner: EventBanner) => {
  selectedBanner.value = banner
  showDeleteModal.value = true
}

// Handle confirm delete
const handleConfirmDelete = () => {
  if (selectedBanner.value) {
    emit('delete', selectedBanner.value.id)
  }
  showDeleteModal.value = false
  selectedBanner.value = null
}

// Table columns definition
const columns: DataTableColumns<EventBanner> = [
  {
    title: 'Hình ảnh',
    key: 'imageUrl',
    width: 80,
    render(row) {
      return h(NImage, {
        src: row.imageUrl,
        width: 60,
        height: 40,
        objectFit: 'cover',
        previewDisabled: false,
        fallbackSrc: '/placeholder-image.svg',
      })
    },
  },
  {
    title: 'Tiêu đề',
    key: 'title',
    width: 200,
    ellipsis: {
      tooltip: true,
    },
  },
  {
    title: 'Loại sự kiện',
    key: 'eventType',
    width: 120,
    render(row) {
      return h(
        NTag,
        {
          type: 'info',
          size: 'small',
        },
        {
          default: () => getEventTypeLabel(row.eventType),
        },
      )
    },
  },
  {
    title: 'Vị trí',
    key: 'position',
    width: 100,
    render(row) {
      return h(
        NTag,
        {
          type: 'default',
          size: 'small',
        },
        {
          default: () => getPositionLabel(row.position),
        },
      )
    },
  },
  {
    title: 'Thời gian bắt đầu',
    key: 'startTime',
    width: 150,
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
    width: 150,
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
.event-banner-table {
  width: 100%;
}
</style>
