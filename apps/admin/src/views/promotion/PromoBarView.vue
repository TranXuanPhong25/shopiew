<template>
  <div class="promo-bar-management">
    <n-layout>
      <n-layout-header bordered style="height: 96px; padding: 16px">
        <n-space align="center" justify="space-between">
          <div>
            <n-h2 style="margin: 0">Quản lý Promo Bar</n-h2>
            <n-text depth="3">Quản lý thanh thông báo khuyến mãi</n-text>
          </div>
          <n-space>
            <n-button type="primary" @click="handleCreateNew">
              <template #icon>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M12 4.5a.75.75 0 01.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6A.75.75 0 0112 4.5z" />
                  </svg>
                </n-icon>
              </template>
              Tạo Promo Bar Mới
            </n-button>
            <n-button @click="handleRefresh" :loading="store.isLoading">
              <template #icon>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z" />
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
            <n-input v-model:value="filters.search" placeholder="Tìm kiếm theo nội dung..." clearable
              style="width: 300px">
              <template #prefix>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15zm0-13a5.5 5.5 0 110 11 5.5 5.5 0 010-11z" />
                    <path d="m21 21-5.197-5.197" />
                  </svg>
                </n-icon>
              </template>
            </n-input>

            <n-select v-model:value="filters.status" :options="statusFilterOptions" placeholder="Lọc theo trạng thái"
              clearable style="width: 150px" />

            <n-select v-model:value="filters.closeable" :options="closeableFilterOptions" placeholder="Có thể đóng"
              clearable style="width: 150px" />
          </n-space>
        </n-card>

        <!-- Statistics -->
        <n-grid :cols="4" :x-gap="16" style="margin-bottom: 16px">
          <n-grid-item>
            <n-card>
              <n-statistic label="Tổng số promo bar" :value="store.promoBars.length" />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card>
              <n-statistic label="Đang hoạt động" :value="store.activePromoBars.length" />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card>
              <n-statistic label="Chưa bắt đầu" :value="upcomingBars.length" />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card>
              <n-statistic label="Đã kết thúc" :value="expiredBars.length" />
            </n-card>
          </n-grid-item>
        </n-grid>

        <!-- Table -->
        <n-card>
          <PromoBarTable :data="filteredBars" :loading="store.isLoading" @edit="handleEdit" @delete="handleDelete"
            @view="handleView" @toggle-status="handleToggleStatus" />
        </n-card>

        <!-- Form Modal -->
        <n-modal v-model:show="showFormModal" preset="card" :title="formModalTitle" size="large" :mask-closable="false"
          style="width: 90%; max-width: 800px">
          <PromoBarForm :initial-data="currentBar" :is-editing="isEditing" :loading="formLoading"
            @submit="handleFormSubmit" @cancel="handleFormCancel" />
        </n-modal>

        <!-- View Modal -->
        <n-modal v-model:show="showViewModal" preset="card" title="Chi tiết Promo Bar" size="large"
          style="width: 90%; max-width: 700px">
          <div v-if="currentBar" class="bar-details">
            <n-descriptions :column="2" bordered>
              <n-descriptions-item label="Nội dung" :span="2">
                {{ currentBar.message }}
              </n-descriptions-item>
              <n-descriptions-item label="Màu nền">
                <n-space align="center" size="small">
                  <div :style="{
                    width: '24px',
                    height: '24px',
                    backgroundColor: currentBar.backgroundColor,
                    borderRadius: '50%',
                    border: '1px solid #ddd',
                  }"></div>
                  <n-text>{{ currentBar.backgroundColor }}</n-text>
                </n-space>
              </n-descriptions-item>
              <n-descriptions-item label="Màu chữ">
                <n-space align="center" size="small">
                  <div :style="{
                    width: '24px',
                    height: '24px',
                    backgroundColor: currentBar.textColor,
                    borderRadius: '50%',
                    border: '1px solid #ddd',
                  }"></div>
                  <n-text>{{ currentBar.textColor }}</n-text>
                </n-space>
              </n-descriptions-item>
              <n-descriptions-item label="Độ ưu tiên">
                {{ currentBar.priority }}
              </n-descriptions-item>
              <n-descriptions-item label="Có thể đóng">
                <n-tag :type="currentBar.isCloseable ? 'success' : 'warning'">
                  {{ currentBar.isCloseable ? 'Có' : 'Không' }}
                </n-tag>
              </n-descriptions-item>
              <n-descriptions-item label="Thời gian bắt đầu">
                <n-time :time="new Date(currentBar.startTime)" format="dd/MM/yyyy HH:mm" />
              </n-descriptions-item>
              <n-descriptions-item label="Thời gian kết thúc">
                <n-time :time="new Date(currentBar.endTime)" format="dd/MM/yyyy HH:mm" />
              </n-descriptions-item>
              <n-descriptions-item label="URL liên kết" :span="2">
                <a v-if="currentBar.linkUrl" :href="currentBar.linkUrl" target="_blank">
                  {{ currentBar.linkUrl }}
                </a>
                <span v-else>Không có</span>
              </n-descriptions-item>
            </n-descriptions>

            <div style="margin-top: 16px">
              <n-h3>Xem trước</n-h3>
              <div class="promo-bar-preview" :style="{
                backgroundColor: currentBar.backgroundColor,
                color: currentBar.textColor,
                padding: '16px',
                borderRadius: '4px',
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '500',
              }">
                {{ currentBar.message }}
                <n-icon v-if="currentBar.isCloseable" :size="18"
                  style="position: absolute; right: 16px; cursor: pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z" />
                  </svg>
                </n-icon>
              </div>
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
  NH3,
  useMessage,
} from 'naive-ui'
import { usePromotionStore } from '@/stores/promotion'
import PromoBarTable from '@/modules/promotion/components/PromoBarTable.vue'
import PromoBarForm from '@/modules/promotion/components/PromoBarForm.vue'
import type { PromoBar, CreatePromoBarRequest, UpdatePromoBarRequest } from '@/models/promotion'

const message = useMessage()
const store = usePromotionStore()

// State
const showFormModal = ref(false)
const showViewModal = ref(false)
const currentBar = ref<PromoBar | null>(null)
const isEditing = ref(false)
const formLoading = ref(false)

// Filters
const filters = ref({
  search: '',
  status: null as string | null,
  closeable: null as boolean | null,
})

// Filter options
const statusFilterOptions = [
  { label: 'Tất cả', value: null },
  { label: 'Đang hoạt động', value: 'active' },
  { label: 'Chưa bắt đầu', value: 'upcoming' },
  { label: 'Đã kết thúc', value: 'expired' },
  { label: 'Tắt', value: 'inactive' },
]

const closeableFilterOptions = [
  { label: 'Tất cả', value: null },
  { label: 'Có thể đóng', value: true },
  { label: 'Không thể đóng', value: false },
]

// Computed
const formModalTitle = computed(() => {
  return isEditing.value ? 'Chỉnh sửa Promo Bar' : 'Tạo Promo Bar mới'
})

const upcomingBars = computed(() => {
  const now = new Date()
  return store.promoBars.filter((bar) => bar.isActive && new Date(bar.startTime) > now)
})

const expiredBars = computed(() => {
  const now = new Date()
  return store.promoBars.filter((bar) => bar.isActive && new Date(bar.endTime) < now)
})

const filteredBars = computed(() => {
  let result = [...store.promoBars]

  // Search filter
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    result = result.filter((bar) => bar.message.toLowerCase().includes(search))
  }

  // Status filter
  if (filters.value.status) {
    const now = new Date()
    result = result.filter((bar) => {
      switch (filters.value.status) {
        case 'active':
          return bar.isActive && new Date(bar.startTime) <= now && new Date(bar.endTime) >= now
        case 'upcoming':
          return bar.isActive && new Date(bar.startTime) > now
        case 'expired':
          return bar.isActive && new Date(bar.endTime) < now
        case 'inactive':
          return !bar.isActive
        default:
          return true
      }
    })
  }

  // Closeable filter
  if (filters.value.closeable !== null) {
    result = result.filter((bar) => bar.isCloseable === filters.value.closeable)
  }

  return result
})

// Event handlers
const handleCreateNew = () => {
  currentBar.value = null
  isEditing.value = false
  showFormModal.value = true
}

const handleEdit = (bar: PromoBar) => {
  currentBar.value = bar
  isEditing.value = true
  showFormModal.value = true
}

const handleView = (bar: PromoBar) => {
  currentBar.value = bar
  showViewModal.value = true
}

const handleDelete = async (id: string) => {
  try {
    await store.deletePromoBar(id)
    message.success('Đã xóa promo bar thành công')
  } catch (error) {
    message.error('Không thể xóa promo bar')
    console.error('Delete error:', error)
  }
}

const handleToggleStatus = async (bar: PromoBar) => {
  try {
    await store.updatePromoBar({
      id: bar.id,
      isActive: !bar.isActive,
    })
    message.success(`Đã ${bar.isActive ? 'tắt' : 'bật'} promo bar`)
  } catch (error) {
    message.error('Không thể cập nhật trạng thái')
    console.error('Toggle status error:', error)
  }
}

const handleFormSubmit = async (data: CreatePromoBarRequest | UpdatePromoBarRequest) => {
  formLoading.value = true
  try {
    if (isEditing.value && 'id' in data) {
      await store.updatePromoBar(data as UpdatePromoBarRequest)
      message.success('Cập nhật promo bar thành công')
    } else {
      await store.createPromoBar(data as CreatePromoBarRequest)
      message.success('Tạo promo bar thành công')
    }
    showFormModal.value = false
    currentBar.value = null
  } catch (error) {
    message.error('Có lỗi xảy ra, vui lòng thử lại')
    console.error('Form submit error:', error)
  } finally {
    formLoading.value = false
  }
}

const handleFormCancel = () => {
  showFormModal.value = false
  currentBar.value = null
}

const handleRefresh = async () => {
  try {
    await store.fetchAllPromoBars()
    message.success('Đã làm mới dữ liệu')
  } catch (error) {
    message.error('Không thể làm mới dữ liệu')
  }
}

// Initialize
onMounted(async () => {
  if (store.promoBars.length === 0) {
    try {
      await store.fetchAllPromoBars()
    } catch (error) {
      message.error('Không thể tải dữ liệu promo bar')
    }
  }
})
</script>

<style scoped>
.promo-bar-management {
  height: 100%;
}

.filters-card {
  margin-bottom: 16px;
}

.bar-details {
  max-width: 100%;
}

.promo-bar-preview {
  width: 100%;
  min-height: 50px;
  border: 1px dashed #d0d0d0;
}
</style>
