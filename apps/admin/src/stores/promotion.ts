import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { PromotionService } from '@/services/PromotionService'
import type {
  EventBanner,
  PromoBar,
  CreateEventBannerRequest,
  UpdateEventBannerRequest,
  CreatePromoBarRequest,
  UpdatePromoBarRequest,
  ActivePromotionsResponse,
} from '@/models/promotion'

export const usePromotionStore = defineStore('promotion', () => {
  // State
  const eventBanners = ref<EventBanner[]>([])
  const promoBars = ref<PromoBar[]>([])
  const currentEventBanner = ref<EventBanner | null>(null)
  const currentPromoBar = ref<PromoBar | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const activeEventBanners = computed(() =>
    eventBanners.value.filter(
      (banner) =>
        banner.isActive &&
        new Date(banner.startTime) <= new Date() &&
        new Date(banner.endTime) >= new Date(),
    ),
  )

  const activePromoBars = computed(() =>
    promoBars.value.filter(
      (bar) =>
        bar.isActive &&
        new Date(bar.startTime) <= new Date() &&
        new Date(bar.endTime) >= new Date(),
    ),
  )

  const sortedEventBanners = computed(() =>
    [...eventBanners.value].sort(
      (a, b) =>
        b.priority - a.priority ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ),
  )

  const sortedPromoBars = computed(() =>
    [...promoBars.value].sort(
      (a, b) =>
        b.priority - a.priority ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    ),
  )

  // Actions
  const clearError = () => {
    error.value = null
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (errorMessage: string) => {
    error.value = errorMessage
    console.error('Promotion Store Error:', errorMessage)
  }

  // Event Banner Actions
  const fetchAllEventBanners = async () => {
    try {
      setLoading(true)
      clearError()
      eventBanners.value = await PromotionService.getAllEventBanners()
    } catch (err: any) {
      setError(err || 'Failed to fetch event banners')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchEventBannerById = async (id: string) => {
    try {
      setLoading(true)
      clearError()
      currentEventBanner.value = await PromotionService.getEventBannerById(id)
      return currentEventBanner.value
    } catch (err: any) {
      setError(err || 'Failed to fetch event banner')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchEventBannersByType = async (type: string) => {
    try {
      setLoading(true)
      clearError()
      const banners = await PromotionService.getEventBannersByType(type)
      return banners
    } catch (err: any) {
      setError(err || 'Failed to fetch event banners by type')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchEventBannersByPosition = async (position: string) => {
    try {
      setLoading(true)
      clearError()
      const banners = await PromotionService.getEventBannersByPosition(position)
      return banners
    } catch (err: any) {
      setError(err || 'Failed to fetch event banners by position')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createEventBanner = async (data: CreateEventBannerRequest) => {
    try {
      setLoading(true)
      clearError()
      const newBanner = await PromotionService.createEventBanner(data)
      eventBanners.value.push(newBanner)
      return newBanner
    } catch (err: any) {
      setError(err || 'Failed to create event banner')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateEventBanner = async (data: UpdateEventBannerRequest) => {
    try {
      setLoading(true)
      clearError()
      const updatedBanner = await PromotionService.updateEventBanner(data)
      const index = eventBanners.value.findIndex((banner) => banner.id === data.id)
      if (index !== -1) {
        eventBanners.value[index] = updatedBanner
      }
      if (currentEventBanner.value?.id === data.id) {
        currentEventBanner.value = updatedBanner
      }
      return updatedBanner
    } catch (err: any) {
      setError(err || 'Failed to update event banner')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteEventBanner = async (id: string) => {
    try {
      setLoading(true)
      clearError()
      await PromotionService.deleteEventBanner(id)
      eventBanners.value = eventBanners.value.filter((banner) => banner.id !== id)
      if (currentEventBanner.value?.id === id) {
        currentEventBanner.value = null
      }
    } catch (err: any) {
      setError(err || 'Failed to delete event banner')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Promo Bar Actions
  const fetchAllPromoBars = async () => {
    try {
      setLoading(true)
      clearError()
      promoBars.value = await PromotionService.getAllPromoBars()
    } catch (err: any) {
      setError(err || 'Failed to fetch promo bars')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchPromoBarById = async (id: string) => {
    try {
      setLoading(true)
      clearError()
      currentPromoBar.value = await PromotionService.getPromoBarById(id)
      return currentPromoBar.value
    } catch (err: any) {
      setError(err || 'Failed to fetch promo bar')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createPromoBar = async (data: CreatePromoBarRequest) => {
    try {
      setLoading(true)
      clearError()
      const newBar = await PromotionService.createPromoBar(data)
      promoBars.value.push(newBar)
      return newBar
    } catch (err: any) {
      setError(err || 'Failed to create promo bar')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updatePromoBar = async (data: UpdatePromoBarRequest) => {
    try {
      setLoading(true)
      clearError()
      const updatedBar = await PromotionService.updatePromoBar(data)
      const index = promoBars.value.findIndex((bar) => bar.id === data.id)
      if (index !== -1) {
        promoBars.value[index] = updatedBar
      }
      if (currentPromoBar.value?.id === data.id) {
        currentPromoBar.value = updatedBar
      }
      return updatedBar
    } catch (err: any) {
      setError(err || 'Failed to update promo bar')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deletePromoBar = async (id: string) => {
    try {
      setLoading(true)
      clearError()
      await PromotionService.deletePromoBar(id)
      promoBars.value = promoBars.value.filter((bar) => bar.id !== id)
      if (currentPromoBar.value?.id === id) {
        currentPromoBar.value = null
      }
    } catch (err: any) {
      setError(err || 'Failed to delete promo bar')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Combined Actions
  const fetchActivePromotions = async (): Promise<ActivePromotionsResponse> => {
    try {
      setLoading(true)
      clearError()
      const activePromotions = await PromotionService.getActivePromotions()
      eventBanners.value = activePromotions.banners
      promoBars.value = activePromotions.promoBars
      return activePromotions
    } catch (err: any) {
      setError(err || 'Failed to fetch active promotions')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const refreshAllData = async () => {
    try {
      setLoading(true)
      clearError()
      await Promise.all([fetchAllEventBanners(), fetchAllPromoBars()])
    } catch (err: any) {
      setError(err || 'Failed to refresh promotion data')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Reset functions
  const resetCurrentEventBanner = () => {
    currentEventBanner.value = null
  }

  const resetCurrentPromoBar = () => {
    currentPromoBar.value = null
  }

  const resetStore = () => {
    eventBanners.value = []
    promoBars.value = []
    currentEventBanner.value = null
    currentPromoBar.value = null
    error.value = null
    isLoading.value = false
  }

  return {
    // State
    eventBanners,
    promoBars,
    currentEventBanner,
    currentPromoBar,
    isLoading,
    error,

    // Computed
    activeEventBanners,
    activePromoBars,
    sortedEventBanners,
    sortedPromoBars,

    // Actions
    clearError,
    setLoading,
    setError,

    // Event Banner Actions
    fetchAllEventBanners,
    fetchEventBannerById,
    fetchEventBannersByType,
    fetchEventBannersByPosition,
    createEventBanner,
    updateEventBanner,
    deleteEventBanner,

    // Promo Bar Actions
    fetchAllPromoBars,
    fetchPromoBarById,
    createPromoBar,
    updatePromoBar,
    deletePromoBar,

    // Combined Actions
    fetchActivePromotions,
    refreshAllData,

    // Reset functions
    resetCurrentEventBanner,
    resetCurrentPromoBar,
    resetStore,
  }
})
