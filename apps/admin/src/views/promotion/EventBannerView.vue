<template>
  <div class="event-banner-management">
    <n-layout>
      <n-layout-header bordered style="height: 96px; padding: 16px">
        <n-space align="center" justify="space-between" >
          <div>
            <n-h2 style="margin: 0">Quản lý Event Banner</n-h2>
            <n-text depth="3">Quản lý banner sự kiện và khuyến mãi</n-text>
          </div>
          <n-space>
            <n-button type="primary" @click="handleCreateNew">
              <template #icon>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 4.5a.75.75 0 01.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6A.75.75 0 0112 4.5z"
                    />
                  </svg>
                </n-icon>
              </template>
              Tạo Banner Mới
            </n-button>
            <n-button @click="handleRefresh" :loading="store.isLoading">
              <template #icon>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                    />
                  </svg>
                </n-icon>
              </template>
              Làm mới
            </n-button>
          </n-space>
        </n-space>
      </n-layout-header>

      <n-layout-content content-style="padding: 24px;">
        <!-- Filters -->
        <n-card class="filters-card" style="margin-bottom: 16px">
          <n-space align="center">
            <n-input
              v-model:value="filters.search"
              placeholder="Tìm kiếm theo tiêu đề..."
              clearable
              style="width: 300px"
            >
              <template #prefix>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm0-13a5.5 5.5 0 110 11 5.5 5.5 0 010-11z"
                    />
                    <path d="m21 21-5.197-5.197" />
                  </svg>
                </n-icon>
              </template>
            </n-input>

            <n-select
              v-model:value="filters.eventType"
              :options="eventTypeFilterOptions"
              placeholder="Lọc theo loại sự kiện"
              clearable
              style="width: 180px"
            />

            <n-select
              v-model:value="filters.position"
              :options="positionFilterOptions"
              placeholder="Lọc theo vị trí"
              clearable
              style="width: 150px"
            />

            <n-select
              v-model:value="filters.status"
              :options="statusFilterOptions"
              placeholder="Lọc theo trạng thái"
              clearable
              style="width: 150px"
            />
          </n-space>
        </n-card>

        <!-- Statistics -->
        <n-grid :cols="4" :x-gap="16" style="margin-bottom: 16px">
          <n-grid-item>
            <n-card>
              <n-statistic label="Tổng số banner" :value="store.eventBanners.length" />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card>
              <n-statistic label="Đang hoạt động" :value="store.activeEventBanners.length" />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card>
              <n-statistic label="Chưa bắt đầu" :value="upcomingBanners.length" />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card>
              <n-statistic label="Đã kết thúc" :value="expiredBanners.length" />
            </n-card>
          </n-grid-item>
        </n-grid>

        <!-- Table -->
        <n-card>
          <EventBannerTable
            :data="filteredBanners"
            :loading="store.isLoading"
            @edit="handleEdit"
            @delete="handleDelete"
            @view="handleView"
            @toggle-status="handleToggleStatus"
          />
        </n-card>

        <!-- Form Modal -->
        <n-modal
          v-model:show="showFormModal"
          preset="card"
          :title="formModalTitle"
          size="large"
          :mask-closable="false"
          style="width: 90%; max-width: 800px"
        >
          <EventBannerForm
            :initial-data="currentBanner"
            :is-editing="isEditing"
            :loading="formLoading"
            @submit="handleFormSubmit"
            @cancel="handleFormCancel"
          />
        </n-modal>

        <!-- View Modal -->
        <n-modal
          v-model:show="showViewModal"
          preset="card"
          title="Chi tiết Event Banner"
          size="large"
          style="width: 90%; max-width: 800px"
        >
          <div v-if="currentBanner" class="banner-details">
            <n-descriptions :column="2" bordered>
              <n-descriptions-item label="Tiêu đề">
                {{ currentBanner.title }}
              </n-descriptions-item>
              <n-descriptions-item label="Loại sự kiện">
                <n-tag type="info">{{ getEventTypeLabel(currentBanner.eventType) }}</n-tag>
              </n-descriptions-item>
              <n-descriptions-item label="Vị trí">
                <n-tag>{{ getPositionLabel(currentBanner.position) }}</n-tag>
              </n-descriptions-item>
              <n-descriptions-item label="Độ ưu tiên">
                {{ currentBanner.priority }}
              </n-descriptions-item>
              <n-descriptions-item label="Thời gian bắt đầu">
                <n-time :time="new Date(currentBanner.startTime)" format="dd/MM/yyyy HH:mm" />
              </n-descriptions-item>
              <n-descriptions-item label="Thời gian kết thúc">
                <n-time :time="new Date(currentBanner.endTime)" format="dd/MM/yyyy HH:mm" />
              </n-descriptions-item>
              <n-descriptions-item label="Mô tả" :span="2">
                {{ currentBanner.description || 'Không có mô tả' }}
              </n-descriptions-item>
              <n-descriptions-item label="URL liên kết" :span="2">
                <a v-if="currentBanner.linkUrl" :href="currentBanner.linkUrl" target="_blank">
                  {{ currentBanner.linkUrl }}
                </a>
                <span v-else>Không có</span>
              </n-descriptions-item>
            </n-descriptions>

            <div style="margin-top: 16px">
              <n-h3>Hình ảnh banner</n-h3>
              <n-image
                :src="currentBanner.imageUrl"
                width="100%"
                height="200"
                object-fit="cover"
                preview
              />
            </div>
          </div>
        </n-modal>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NSpace,
  NH2,
  NText,
  NButton,
  NIcon,
  NCard,
  NInput,
  NSelect,
  NGrid,
  NGridItem,
  NStatistic,
  NModal,
  NDescriptions,
  NDescriptionsItem,
  NTag,
  NTime,
  NImage,
  NH3,
  useMessage,
} from 'naive-ui'
import { usePromotionStore } from '@/stores/promotion'
import EventBannerTable from '@/modules/promotion/components/EventBannerTable.vue'
import EventBannerForm from '@/modules/promotion/components/EventBannerForm.vue'
import type {
  EventBanner,
  CreateEventBannerRequest,
  UpdateEventBannerRequest,
} from '@/models/promotion'
import { EVENT_TYPE_OPTIONS, POSITION_OPTIONS } from '@/models/promotion'

const message = useMessage()
const store = usePromotionStore()

// State
const showFormModal = ref(false)
const showViewModal = ref(false)
const currentBanner = ref<EventBanner | null>(null)
const isEditing = ref(false)
const formLoading = ref(false)

// Filters
const filters = ref({
  search: '',
  eventType: null as string | null,
  position: null as string | null,
  status: null as string | null,
})

// Filter options
const eventTypeFilterOptions = [{ label: 'Tất cả', value: null as string | null }, ...EVENT_TYPE_OPTIONS] as any

const positionFilterOptions = [{ label: 'Tất cả', value: null as string | null }, ...POSITION_OPTIONS] as any

const statusFilterOptions = [
  { label: 'Tất cả', value: null as string | null },
  { label: 'Đang hoạt động', value: 'active' },
  { label: 'Chưa bắt đầu', value: 'upcoming' },
  { label: 'Đã kết thúc', value: 'expired' },
  { label: 'Tắt', value: 'inactive' },
] as any

// Computed
const formModalTitle = computed(() => {
  return isEditing.value ? 'Chỉnh sửa Event Banner' : 'Tạo Event Banner mới'
})

const upcomingBanners = computed(() => {
  const now = new Date()
  return store.eventBanners.filter((banner) => banner.isActive && new Date(banner.startTime) > now)
})

const expiredBanners = computed(() => {
  const now = new Date()
  return store.eventBanners.filter((banner) => banner.isActive && new Date(banner.endTime) < now)
})

const filteredBanners = computed(() => {
  let result = [...store.eventBanners]

  // Search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    result = result.filter((banner) => banner.title.toLowerCase().includes(search))
  }

  // Event type filter
  if (filters.value.eventType) {
    result = result.filter((banner) => banner.eventType === filters.value.eventType)
  }

  // Position filter
  if (filters.value.position) {
    result = result.filter((banner) => banner.position === filters.value.position)
  }

  // Status filter
  if (filters.value.status) {
    const now = new Date()
    result = result.filter((banner) => {
      switch (filters.value.status) {
        case 'active':
          return (
            banner.isActive && new Date(banner.startTime) <= now && new Date(banner.endTime) >= now
          )
        case 'upcoming':
          return banner.isActive && new Date(banner.startTime) > now
        case 'expired':
          return banner.isActive && new Date(banner.endTime) < now
        case 'inactive':
          return !banner.isActive
        default:
          return true
      }
    })
  }

  return result
})

// Helper functions
const getEventTypeLabel = (value: string) => {
  return EVENT_TYPE_OPTIONS.find((option) => option.value === value)?.label || value
}

const getPositionLabel = (value: string) => {
  return POSITION_OPTIONS.find((option) => option.value === value)?.label || value
}

// Event handlers
const handleCreateNew = () => {
  currentBanner.value = null
  isEditing.value = false
  showFormModal.value = true
}

const handleEdit = (banner: EventBanner) => {
  currentBanner.value = banner
  isEditing.value = true
  showFormModal.value = true
}

const handleView = (banner: EventBanner) => {
  currentBanner.value = banner
  showViewModal.value = true
}

const handleDelete = async (id: string) => {
  try {
    await store.deleteEventBanner(id)
    message.success('Đã xóa event banner thành công')
  } catch (error) {
    message.error('Không thể xóa event banner')
    console.error('Delete error:', error)
  }
}

const handleToggleStatus = async (banner: EventBanner) => {
  try {
    await store.updateEventBanner({
      id: banner.id,
      isActive: !banner.isActive,
    })
    message.success(`Đã ${banner.isActive ? 'tắt' : 'bật'} event banner`)
  } catch (error) {
    message.error('Không thể cập nhật trạng thái')
    console.error('Toggle status error:', error)
  }
}

const handleFormSubmit = async (data: CreateEventBannerRequest | UpdateEventBannerRequest) => {
  formLoading.value = true
  try {
    if (isEditing.value && 'id' in data) {
      await store.updateEventBanner(data as UpdateEventBannerRequest)
      message.success('Cập nhật event banner thành công')
    } else {
      await store.createEventBanner(data as CreateEventBannerRequest)
      message.success('Tạo event banner thành công')
    }
    showFormModal.value = false
    currentBanner.value = null
  } catch (error) {
    message.error('Có lỗi xảy ra, vui lòng thử lại')
    console.error('Form submit error:', error)
  } finally {
    formLoading.value = false
  }
}

const handleFormCancel = () => {
  showFormModal.value = false
  currentBanner.value = null
}

const handleRefresh = async () => {
  try {
    await store.fetchAllEventBanners()
    message.success('Đã làm mới dữ liệu')
  } catch (error) {
    message.error('Không thể làm mới dữ liệu')
  }
}

// Initialize
onMounted(async () => {
  if (store.eventBanners.length === 0) {
    try {
      await store.fetchAllEventBanners()
    } catch (error) {
      message.error('Không thể tải dữ liệu event banner')
    }
  }
})
</script>

<style scoped>
.event-banner-management {
  height: 100%;
}

.filters-card {
  margin-bottom: 16px;
}

.banner-details {
  max-width: 100%;
}
</style>
