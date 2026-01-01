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
        image_url: data.imageUrl,
        link_url: data.linkUrl,
        start_time: data.startTime,
        end_time: data.endTime,
        priority: data.priority || 0,
        is_active: data.isActive ?? true,
        event_type: data.eventType,
        position: data.position || 'main',
      })
      return this.transformEventBanner(response.data)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getAllEventBanners(): Promise<EventBanner[]> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/banners`)
      return response.data.map(this.transformEventBanner)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getEventBannerById(id: string): Promise<EventBanner> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/banners/${id}`)
      return this.transformEventBanner(response.data)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getEventBannersByType(type: string): Promise<EventBanner[]> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/banners/type/${type}`)
      return response.data.map(this.transformEventBanner)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getEventBannersByPosition(position: string): Promise<EventBanner[]> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/banners/position/${position}`)
      return response.data.map(this.transformEventBanner)
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
        ...(data.imageUrl && { image_url: data.imageUrl }),
        ...(data.linkUrl !== undefined && { link_url: data.linkUrl }),
        ...(data.startTime && { start_time: data.startTime }),
        ...(data.endTime && { end_time: data.endTime }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(data.isActive !== undefined && { is_active: data.isActive }),
        ...(data.eventType && { event_type: data.eventType }),
        ...(data.position && { position: data.position }),
      }
      const response = await apiClient.put(`${this.BASE_URL}/banners`, requestBody)
      return this.transformEventBanner(response.data)
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
        background_color: data.backgroundColor || '#ff0000',
        text_color: data.textColor || '#ffffff',
        link_url: data.linkUrl,
        start_time: data.startTime,
        end_time: data.endTime,
        is_active: data.isActive ?? true,
        priority: data.priority || 0,
        is_closeable: data.isCloseable ?? true,
      })
      return this.transformPromoBar(response.data)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getAllPromoBars(): Promise<PromoBar[]> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/bars`)
      return response.data.map(this.transformPromoBar)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getPromoBarById(id: string): Promise<PromoBar> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/bars/${id}`)
      return this.transformPromoBar(response.data)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async updatePromoBar(data: UpdatePromoBarRequest): Promise<PromoBar> {
    try {
      const requestBody = {
        id: data.id,
        ...(data.message && { message: data.message }),
        ...(data.backgroundColor && { background_color: data.backgroundColor }),
        ...(data.textColor && { text_color: data.textColor }),
        ...(data.linkUrl !== undefined && { link_url: data.linkUrl }),
        ...(data.startTime && { start_time: data.startTime }),
        ...(data.endTime && { end_time: data.endTime }),
        ...(data.isActive !== undefined && { is_active: data.isActive }),
        ...(data.priority !== undefined && { priority: data.priority }),
        ...(data.isCloseable !== undefined && { is_closeable: data.isCloseable }),
      }
      const response = await apiClient.put(`${this.BASE_URL}/bars`, requestBody)
      return this.transformPromoBar(response.data)
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
        banners: response.data.banners?.map(this.transformEventBanner) || [],
        promoBars: response.data.promoBars?.map(this.transformPromoBar) || [],
      }
    } catch (error) {
      throw handleApiError(error)
    }
  }

  // Transform functions to convert snake_case to camelCase
  private static transformEventBanner(data: any): EventBanner {
    return {
      id: data.id || data.ID,
      title: data.title,
      description: data.description,
      imageUrl: data.image_url || data.imageUrl,
      linkUrl: data.link_url || data.linkUrl,
      startTime: data.start_time || data.startTime,
      endTime: data.end_time || data.endTime,
      priority: data.priority,
      isActive: data.is_active ?? data.isActive,
      eventType: data.event_type || data.eventType,
      position: data.position,
      createdAt: data.created_at || data.createdAt || data.CreatedAt,
      updatedAt: data.updated_at || data.updatedAt || data.UpdatedAt,
    }
  }

  private static transformPromoBar(data: any): PromoBar {
    return {
      id: data.id || data.ID,
      message: data.message,
      backgroundColor: data.background_color || data.backgroundColor,
      textColor: data.text_color || data.textColor,
      linkUrl: data.link_url || data.linkUrl,
      startTime: data.start_time || data.startTime,
      endTime: data.end_time || data.endTime,
      isActive: data.is_active ?? data.isActive,
      priority: data.priority,
      isCloseable: data.is_closeable ?? data.isCloseable,
      createdAt: data.created_at || data.createdAt || data.CreatedAt,
      updatedAt: data.updated_at || data.updatedAt || data.UpdatedAt,
    }
  }
}
