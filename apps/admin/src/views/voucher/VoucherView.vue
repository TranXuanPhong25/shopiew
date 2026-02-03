<template>
  <div class="voucher-management">
    <n-layout>
      <n-layout-header bordered style="height: 96px; padding: 16px">
        <n-space align="center" justify="space-between">
          <div>
            <n-h2 style="margin: 0">Quản lý Voucher</n-h2>
            <n-text depth="3">Quản lý mã giảm giá và khuyến mãi</n-text>
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
              Tạo Voucher Mới
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
              placeholder="Tìm kiếm theo mã voucher..."
              clearable
              style="width: 300px"
            >
              <template #prefix>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </n-icon>
              </template>
            </n-input>

            <n-select
              v-model:value="filters.discountType"
              :options="discountTypeFilterOptions as any"
              placeholder="Lọc theo loại"
              clearable
              style="width: 180px"
            />

            <n-select
              v-model:value="filters.status"
              :options="statusFilterOptions as any"
              placeholder="Lọc theo trạng thái"
              clearable
              style="width: 180px"
            />

            <n-select
              v-model:value="filters.expiration"
              :options="expirationFilterOptions as any"
              placeholder="Lọc theo hạn dùng"
              clearable
              style="width: 180px"
            />
          </n-space>
        </n-card>

        <!-- Statistics -->
        <n-grid :cols="4" :x-gap="16" style="margin-bottom: 16px">
          <n-grid-item>
            <n-card>
              <n-statistic label="Tổng số voucher" :value="store.statistics.total" />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card>
              <n-statistic label="Đang hoạt động" :value="store.statistics.active" />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card>
              <n-statistic label="Sắp hết hạn" :value="store.statistics.expiringSoon" />
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card>
              <n-statistic label="Đã hết hạn" :value="store.statistics.expired" />
            </n-card>
          </n-grid-item>
        </n-grid>

        <!-- Table -->
        <n-card>
          <VoucherTable
            :data="filteredVouchers"
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
          <VoucherForm
            :initial-data="currentVoucher"
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
          title="Chi tiết Voucher"
          size="large"
          style="width: 90%; max-width: 800px"
        >
          <div v-if="currentVoucher" class="voucher-details">
            <n-descriptions :column="2" bordered>
              <n-descriptions-item label="Mã voucher">
                <n-tag type="info" size="medium" strong>{{ currentVoucher.code }}</n-tag>
              </n-descriptions-item>

              <n-descriptions-item label="Loại giảm giá">
                <n-tag :type="currentVoucher.discountType === 'PERCENTAGE' ? 'info' : 'success'" size="medium">
                  {{ currentVoucher.discountType === 'PERCENTAGE' ? 'Phần trăm' : 'Số tiền' }}
                </n-tag>
              </n-descriptions-item>

              <n-descriptions-item label="Giá trị giảm">
                <n-text strong type="success">
                  {{ formatDiscountValue(currentVoucher.discountValue, currentVoucher.discountType) }}
                </n-text>
              </n-descriptions-item>

              <n-descriptions-item label="Đơn tối thiểu">
                {{ currentVoucher.minOrderValue > 0 ? formatCurrency(currentVoucher.minOrderValue) : 'Không giới hạn' }}
              </n-descriptions-item>

              <n-descriptions-item label="Số lần sử dụng">
                {{ currentVoucher.maxUsage === 0 ? 'Không giới hạn' : `${currentVoucher.usedCount}/${currentVoucher.maxUsage}` }}
              </n-descriptions-item>

              <n-descriptions-item label="Hạn dùng">
                <template v-if="currentVoucher.expiresAt">
                  <n-time :time="new Date(currentVoucher.expiresAt)" format="dd/MM/yyyy HH:mm" />
                </template>
                <n-text v-else depth="3">Vô hạn</n-text>
              </n-descriptions-item>

              <n-descriptions-item label="Trạng thái">
                <n-tag :type="getStatusTagType(currentVoucher)" size="medium">
                  {{ getStatusText(currentVoucher) }}
                </n-tag>
              </n-descriptions-item>

              <n-descriptions-item label="Ngày tạo">
                <n-time :time="new Date(currentVoucher.createdAt)" format="dd/MM/yyyy HH:mm" />
              </n-descriptions-item>

              <n-descriptions-item :span="2" label="Mô tả">
                <n-text>{{ currentVoucher.description || 'Không có mô tả' }}</n-text>
              </n-descriptions-item>
            </n-descriptions>
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
  useMessage,
} from 'naive-ui'
import { useVoucherStore } from '@/stores/voucher'
import VoucherTable from './VoucherTable.vue'
import VoucherForm from './VoucherForm.vue'
import type { Voucher, CreateVoucherRequest, UpdateVoucherRequest } from '@/models/voucher'
import { DiscountType } from '@/models/voucher'

const message = useMessage()
const store = useVoucherStore()

// State
const showFormModal = ref(false)
const showViewModal = ref(false)
const currentVoucher = ref<Voucher | null>(null)
const isEditing = ref(false)
const formLoading = ref(false)

// Filters
const filters = ref({
  search: '',
  discountType: null as string | null,
  status: null as string | null,
  expiration: null as string | null,
})

// Filter options
const discountTypeFilterOptions = [
  { label: 'Tất cả', value: null },
  { label: 'Phần trăm', value: DiscountType.PERCENTAGE },
  { label: 'Số tiền', value: DiscountType.FIXED_AMOUNT },
]

const statusFilterOptions = [
  { label: 'Tất cả', value: null },
  { label: 'Đang hoạt động', value: 'active' },
  { label: 'Tạm dừng', value: 'inactive' },
]

const expirationFilterOptions = [
  { label: 'Tất cả', value: null },
  { label: 'Còn hạn', value: 'valid' },
  { label: 'Sắp hết hạn', value: 'expiring' },
  { label: 'Đã hết hạn', value: 'expired' },
  { label: 'Vô hạn', value: 'unlimited' },
]

// Computed
const formModalTitle = computed(() => {
  return isEditing.value ? 'Chỉnh sửa Voucher' : 'Tạo Voucher mới'
})

const filteredVouchers = computed(() => {
  let result = [...store.vouchers]

  // Search filter
  if (filters.value.search) {
    const search = filters.value.search.toUpperCase()
    result = result.filter((voucher) => voucher.code.includes(search))
  }

  // Discount type filter
  if (filters.value.discountType) {
    result = result.filter((voucher) => voucher.discountType === filters.value.discountType)
  }

  // Status filter
  if (filters.value.status) {
    result = result.filter((voucher) => {
      if (filters.value.status === 'active') return voucher.isActive
      if (filters.value.status === 'inactive') return !voucher.isActive
      return true
    })
  }

  // Expiration filter
  if (filters.value.expiration) {
    const now = new Date()
    const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    result = result.filter((voucher) => {
      switch (filters.value.expiration) {
        case 'valid':
          return !voucher.expiresAt || new Date(voucher.expiresAt) > now
        case 'expiring':
          return (
            voucher.expiresAt &&
            new Date(voucher.expiresAt) > now &&
            new Date(voucher.expiresAt) <= sevenDaysLater
          )
        case 'expired':
          return voucher.expiresAt && new Date(voucher.expiresAt) < now
        case 'unlimited':
          return !voucher.expiresAt
        default:
          return true
      }
    })
  }

  return result
})

// Helper functions
const formatDiscountValue = (value: number, type: DiscountType) => {
  if (type === DiscountType.PERCENTAGE) {
    return `${value}%`
  }
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value)
}

const getStatusTagType = (voucher: Voucher) => {
  if (!voucher.isActive) return 'default'
  if (!voucher.expiresAt) return 'success'

  const now = new Date()
  const expiration = new Date(voucher.expiresAt)
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  if (expiration < now) return 'error'
  if (expiration <= sevenDaysLater) return 'warning'
  return 'success'
}

const getStatusText = (voucher: Voucher) => {
  if (!voucher.isActive) return 'Tạm dừng'
  if (!voucher.expiresAt) return 'Hoạt động'

  const now = new Date()
  const expiration = new Date(voucher.expiresAt)
  const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  if (expiration < now) return 'Đã hết hạn'
  if (expiration <= sevenDaysLater) return 'Sắp hết hạn'
  return 'Hoạt động'
}

// Event handlers
const handleCreateNew = () => {
  currentVoucher.value = null
  isEditing.value = false
  showFormModal.value = true
}

const handleEdit = (voucher: Voucher) => {
  currentVoucher.value = voucher
  isEditing.value = true
  showFormModal.value = true
}

const handleView = (voucher: Voucher) => {
  currentVoucher.value = voucher
  showViewModal.value = true
}

const handleDelete = async (id: number) => {
  try {
    await store.deleteVoucher(id)
    message.success('Xóa voucher thành công!')
  } catch (error: any) {
    message.error(error?.message || 'Không thể xóa voucher')
  }
}

const handleToggleStatus = async (voucher: Voucher) => {
  try {
    await store.toggleVoucherStatus(voucher.id)
    message.success('Thay đổi trạng thái thành công!')
  } catch (error: any) {
    message.error(error?.message || 'Không thể thay đổi trạng thái')
  }
}

const handleFormSubmit = async (data: CreateVoucherRequest | UpdateVoucherRequest) => {
  try {
    formLoading.value = true

    if (isEditing.value && currentVoucher.value) {
      await store.updateVoucher(currentVoucher.value.id, data as UpdateVoucherRequest)
      message.success('Cập nhật voucher thành công!')
    } else {
      await store.createVoucher(data as CreateVoucherRequest)
      message.success('Tạo voucher thành công!')
    }

    showFormModal.value = false
    currentVoucher.value = null
  } catch (error: any) {
    message.error(error?.message || 'Có lỗi xảy ra')
  } finally {
    formLoading.value = false
  }
}

const handleFormCancel = () => {
  showFormModal.value = false
  currentVoucher.value = null
}

const handleRefresh = async () => {
  try {
    await store.fetchVouchers()
    message.success('Làm mới thành công!')
  } catch (error: any) {
    message.error(error?.message || 'Không thể làm mới dữ liệu')
  }
}

// Initialize
onMounted(async () => {
  try {
    await store.fetchVouchers()
  } catch (error: any) {
    message.error(error?.message || 'Không thể tải danh sách voucher')
  }
})
</script>

<style scoped>
.voucher-management {
  height: 100%;
}

.filters-card {
  margin-bottom: 16px;
}

.voucher-details {
  padding: 16px 0;
}
</style>
