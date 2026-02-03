import { apiClient } from '@/lib/axiosClient'
import { handleApiError } from '@/lib/apiErrorHandler'
import type {
  EventBanner,
  PromoBar,
  CreateEventBannerRequest,
  UpdateEventBannerRequest,
  CreatePromoBarRequest,
  UpdatePromoBarRequest,
  ActivePromotionsResponse,
} from '@/models/promotion'

export class PromotionService {
  private static readonly BASE_URL = '/promotions'

  // Event Banner APIs
  static async createEventBanner(data: CreateEventBannerRequest): Promise<EventBanner> {
    try {
      const response = await apiClient.post(`${this.BASE_URL}/banners`, {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        linkUrl: data.linkUrl,
        startTime: data.startTime,
        endTime: data.endTime,
        priority: data.priority || 0,
        isActive: data.isActive ?? true,
        eventType: data.eventType,
        position: data.position || 'main',
      })
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getAllEventBanners(): Promise<EventBanner[]> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/banners`)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getEventBannerById(id: string): Promise<EventBanner> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/banners/${id}`)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getEventBannersByType(type: string): Promise<EventBanner[]> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/banners/type/${type}`)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getEventBannersByPosition(position: string): Promise<EventBanner[]> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/banners/position/${position}`)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async updateEventBanner(data: UpdateEventBannerRequest): Promise<EventBanner> {
    try {
      const requestBody = {
        id: data.id,
        ...(data.title && { title: data.title }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.imageUrl && { imageUrl: data.imageUrl }),
        ...(data.linkUrl !== undefined && { linkUrl: data.linkUrl }),
        ...(data.startTime && { startTime: data.startTime }),
        ...(data.endTime && { endTime: data.endTime }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.eventType && { eventType: data.eventType }),
        ...(data.position && { position: data.position }),
      }
      const response = await apiClient.put(`${this.BASE_URL}/banners`, requestBody)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async deleteEventBanner(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.BASE_URL}/banners/${id}`)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // Promo Bar APIs
  static async createPromoBar(data: CreatePromoBarRequest): Promise<PromoBar> {
    try {
      const response = await apiClient.post(`${this.BASE_URL}/bars`, {
        message: data.message,
        backgroundColor: data.backgroundColor || '#ff0000',
        textColor: data.textColor || '#ffffff',
        linkUrl: data.linkUrl,
        startTime: data.startTime,
        endTime: data.endTime,
        isActive: data.isActive ?? true,
        priority: data.priority || 0,
        isCloseable: data.isCloseable ?? true,
      })
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getAllPromoBars(): Promise<PromoBar[]> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/bars`)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getPromoBarById(id: string): Promise<PromoBar> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/bars/${id}`)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async updatePromoBar(data: UpdatePromoBarRequest): Promise<PromoBar> {
    try {
      const requestBody = {
        id: data.id,
        ...(data.message && { message: data.message }),
        ...(data.backgroundColor && { backgroundColor: data.backgroundColor }),
        ...(data.textColor && { textColor: data.textColor }),
        ...(data.linkUrl !== undefined && { linkUrl: data.linkUrl }),
        ...(data.startTime && { startTime: data.startTime }),
        ...(data.endTime && { endTime: data.endTime }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(data.isCloseable !== undefined && { isCloseable: data.isCloseable }),
      }
      const response = await apiClient.put(`${this.BASE_URL}/bars`, requestBody)
      return response.data
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async deletePromoBar(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.BASE_URL}/bars/${id}`)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // Combined API
  static async getActivePromotions(): Promise<ActivePromotionsResponse> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/active`)
      return {
        banners: response.data.banners || [],
        promoBars: response.data.promoBars || [],
      }
    } catch (error) {
      throw handleApiError(error)
    }
  }


}
