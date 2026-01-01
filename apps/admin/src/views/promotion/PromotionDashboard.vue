<template>
  <div class="promotion-dashboard">
    <n-layout>
      <n-layout-header bordered style="height: 96px; padding: 16px">
        <n-space align="center" justify="space-between">
          <div>
            <n-h2 style="margin: 0">Dashboard Promotion</n-h2>
            <n-text depth="3">Tổng quan về các chương trình khuyến mãi</n-text>
          </div>
          <n-space>
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
        <!-- Quick Actions -->
        <n-card title="Thao tác nhanh" style="margin-bottom: 24px">
          <n-space>
            <n-button type="primary" @click="$router.push('/promotions/banners')">
              <template #icon>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path
                      d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                  </svg>
                </n-icon>
              </template>
              Quản lý Event Banner
            </n-button>
            <n-button type="info" @click="$router.push('/promotions/bars')">
              <template #icon>
                <n-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 9a.75.75 0 01.75.75v6.75h-1.5V9.75A.75.75 0 0112 9z" />
                    <path fill-rule="evenodd"
                      d="M5.25 2.25a3 3 0 00-3 3v13.5a3 3 0 003 3h13.5a3 3 0 003-3V5.25a3 3 0 00-3-3H5.25zm13.5 1.5a1.5 1.5 0 011.5 1.5v13.5a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5h13.5z"
                      clip-rule="evenodd" />
                  </svg>
                </n-icon>
              </template>
              Quản lý Promo Bar
            </n-button>
          </n-space>
        </n-card>

        <!-- Summary Statistics -->
        <n-grid :cols="4" :x-gap="16" style="margin-bottom: 24px">
          <n-grid-item>
            <n-card>
              <n-statistic label="Tổng Event Banner" :value="store.eventBanners.length" style="text-align: center">
                <template #prefix>
                  <n-icon color="#18a058">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path
                        d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                    </svg>
                  </n-icon>
                </template>
              </n-statistic>
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card>
              <n-statistic label="Banner Đang Hoạt Động" :value="store.activeEventBanners.length"
                style="text-align: center">
                <template #prefix>
                  <n-icon color="#2080f0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clip-rule="evenodd" />
                    </svg>
                  </n-icon>
                </template>
              </n-statistic>
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card>
              <n-statistic label="Tổng Promo Bar" :value="store.promoBars.length" style="text-align: center">
                <template #prefix>
                  <n-icon color="#f0a020">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 9a.75.75 0 01.75.75v6.75h-1.5V9.75A.75.75 0 0112 9z" />
                      <path fill-rule="evenodd"
                        d="M5.25 2.25a3 3 0 00-3 3v13.5a3 3 0 003 3h13.5a3 3 0 003-3V5.25a3 3 0 00-3-3H5.25zm13.5 1.5a1.5 1.5 0 011.5 1.5v13.5a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5h13.5z"
                        clip-rule="evenodd" />
                    </svg>
                  </n-icon>
                </template>
              </n-statistic>
            </n-card>
          </n-grid-item>
          <n-grid-item>
            <n-card>
              <n-statistic label="Promo Bar Hoạt Động" :value="store.activePromoBars.length" style="text-align: center">
                <template #prefix>
                  <n-icon color="#d03050">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd"
                        d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                        clip-rule="evenodd" />
                    </svg>
                  </n-icon>
                </template>
              </n-statistic>
            </n-card>
          </n-grid-item>
        </n-grid>

        <!-- Active Promotions -->
        <n-grid :cols="2" :x-gap="24">
          <n-grid-item>
            <n-card title="Event Banner Đang Hoạt Động" style="height: 400px">
              <template #header-extra>
                <n-button text type="primary" @click="$router.push('/promotions/banners')">
                  Xem tất cả
                </n-button>
              </template>

              <div class="active-promotions-list" style="height: 300px; overflow-y: auto">
                <n-empty v-if="store.activeEventBanners.length === 0" description="Không có banner nào đang hoạt động"
                  style="margin-top: 80px" />
                <n-list v-else>
                  <n-list-item v-for="banner in store.activeEventBanners.slice(0, 5)" :key="banner.id">
                    <n-thing>
                      <template #avatar>
                        <n-image :src="banner.imageUrl" width="50" height="30" object-fit="cover" preview-disabled
                          fallback-src="/placeholder-image.svg" />
                      </template>
                      <template #header>
                        <n-ellipsis style="max-width: 200px" :tooltip="false">
                          {{ banner.title }}
                        </n-ellipsis>
                      </template>
                      <template #description>
                        <n-space size="small">
                          <n-tag size="small" type="info">
                            {{ getEventTypeLabel(banner.eventType) }}
                          </n-tag>
                          <n-tag size="small" type="default">
                            {{ getPositionLabel(banner.position) }}
                          </n-tag>
                          <n-text depth="3" style="font-size: 12px">
                            Độ ưu tiên: {{ banner.priority }}
                          </n-text>
                        </n-space>
                      </template>
                      <template #action>
                        <n-button size="small" type="primary" @click="viewBanner(banner)">
                          Xem
                        </n-button>
                      </template>
                    </n-thing>
                  </n-list-item>
                </n-list>
              </div>
            </n-card>
          </n-grid-item>

          <n-grid-item>
            <n-card title="Promo Bar Đang Hoạt Động" style="height: 400px">
              <template #header-extra>
                <n-button text type="primary" @click="$router.push('/promotions/bars')">
                  Xem tất cả
                </n-button>
              </template>

              <div class="active-promotions-list" style="height: 300px; overflow-y: auto">
                <n-empty v-if="store.activePromoBars.length === 0" description="Không có promo bar nào đang hoạt động"
                  style="margin-top: 80px" />
                <n-list v-else>
                  <n-list-item v-for="bar in store.activePromoBars.slice(0, 5)" :key="bar.id">
                    <n-thing>
                      <template #header>
                        <n-ellipsis style="max-width: 250px" :tooltip="false">
                          {{ bar.message }}
                        </n-ellipsis>
                      </template>
                      <template #description>
                        <n-space size="small" align="center">
                          <div :style="{
                            width: '16px',
                            height: '16px',
                            backgroundColor: bar.backgroundColor,
                            borderRadius: '50%',
                            border: '1px solid #ddd',
                          }"></div>
                          <n-text depth="3" style="font-size: 12px">
                            Độ ưu tiên: {{ bar.priority }}
                          </n-text>
                          <n-tag size="small" :type="bar.isCloseable ? 'success' : 'warning'">
                            {{ bar.isCloseable ? 'Có thể đóng' : 'Không thể đóng' }}
                          </n-tag>
                        </n-space>
                      </template>
                      <template #action>
                        <n-button size="small" type="primary" @click="viewBar(bar)"> Xem </n-button>
                      </template>
                    </n-thing>
                  </n-list-item>
                </n-list>
              </div>
            </n-card>
          </n-grid-item>
        </n-grid>
      </n-layout-content>
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
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
  NGrid,
  NGridItem,
  NStatistic,
  NEmpty,
  NList,
  NListItem,
  NThing,
  NTag,
  NImage,
  NEllipsis,
  useMessage,
} from 'naive-ui'
import { useRouter } from 'vue-router'
import { usePromotionStore } from '@/stores/promotion'
import { EVENT_TYPE_OPTIONS, POSITION_OPTIONS } from '@/models/promotion'
import type { EventBanner, PromoBar } from '@/models/promotion'

const message = useMessage()
const router = useRouter()
const store = usePromotionStore()

// Helper functions
const getEventTypeLabel = (value: string) => {
  return EVENT_TYPE_OPTIONS.find((option) => option.value === value)?.label || value
}

const getPositionLabel = (value: string) => {
  return POSITION_OPTIONS.find((option) => option.value === value)?.label || value
}

// Event handlers
const handleRefresh = async () => {
  try {
    await store.refreshAllData()
    message.success('Đã làm mới dữ liệu')
  } catch (error) {
    message.error('Không thể làm mới dữ liệu')
  }
}

const viewBanner = (banner: EventBanner) => {
  router.push(`/promotions/banners?view=${banner.id}`)
}

const viewBar = (bar: PromoBar) => {
  router.push(`/promotions/bars?view=${bar.id}`)
}

// Initialize
onMounted(async () => {
  if (store.eventBanners.length === 0 && store.promoBars.length === 0) {
    try {
      await store.refreshAllData()
    } catch (error) {
      message.error('Không thể tải dữ liệu promotion')
    }
  }
})
</script>

<style scoped>
.promotion-dashboard {
  height: 100%;
}

.active-promotions-list {
  padding-right: 8px;
}

.active-promotions-list::-webkit-scrollbar {
  width: 6px;
}

.active-promotions-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.active-promotions-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.active-promotions-list::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>
