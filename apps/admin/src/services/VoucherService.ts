import { apiClient } from '@/lib/axiosClient'
import { handleApiError } from '@/lib/apiErrorHandler'
import type {
  Voucher,
  CreateVoucherRequest,
  UpdateVoucherRequest,
  ListVouchersResponse,
} from '@/models/voucher'

export class VoucherService {
  private static readonly BASE_URL = '/vouchers'

  static async createVoucher(data: CreateVoucherRequest): Promise<Voucher> {
    try {
      const response = await apiClient.post(this.BASE_URL, {
        code: data.code,
        discount_type: data.discountType,
        discount_value: data.discountValue,
        min_order_value: data.minOrderValue || 0,
        max_usage: data.maxUsage || 0,
        expires_at: data.expiresAt,
        description: data.description,
      })
      return this.transformVoucher(response.data.data)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getAllVouchers(
    page: number = 1,
    limit: number = 20,
    active?: boolean
  ): Promise<ListVouchersResponse> {
    try {
      const params: any = { page, limit }
      if (active !== undefined) {
        params.active = active
      }

      const response = await apiClient.get(this.BASE_URL, { params })
      const data = response.data.data

      return {
        vouchers: data.vouchers.map(this.transformVoucher),
        total: data.total,
        page: data.page,
        limit: data.limit,
      }
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getVoucherById(id: number): Promise<Voucher> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/${id}`)
      return this.transformVoucher(response.data.data)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async getVoucherByCode(code: string): Promise<Voucher> {
    try {
      const response = await apiClient.get(`${this.BASE_URL}/code/${code}`)
      return this.transformVoucher(response.data.data)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async updateVoucher(id: number, data: UpdateVoucherRequest): Promise<Voucher> {
    try {
      const requestBody: any = {}
      if (data.discountValue !== undefined) requestBody.discount_value = data.discountValue
      if (data.minOrderValue !== undefined) requestBody.min_order_value = data.minOrderValue
      if (data.maxUsage !== undefined) requestBody.max_usage = data.maxUsage
      if (data.expiresAt !== undefined) requestBody.expires_at = data.expiresAt
      if (data.isActive !== undefined) requestBody.is_active = data.isActive
      if (data.description !== undefined) requestBody.description = data.description

      const response = await apiClient.put(`${this.BASE_URL}/${id}`, requestBody)
      return this.transformVoucher(response.data.data)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  static async deleteVoucher(id: number): Promise<void> {
    try {
      await apiClient.delete(`${this.BASE_URL}/${id}`)
    } catch (error) {
      throw handleApiError(error)
    }
  }

  private static transformVoucher(data: any): Voucher {
    return {
      id: data.id,
      code: data.code,
      discountType: data.discount_type || data.discountType,
      discountValue: data.discount_value || data.discountValue,
      minOrderValue: data.min_order_value ?? data.minOrderValue ?? 0,
      maxUsage: data.max_usage ?? data.maxUsage ?? 0,
      usedCount: data.used_count ?? data.usedCount ?? 0,
      expiresAt: data.expires_at || data.expiresAt || null,
      isActive: data.is_active ?? data.isActive ?? true,
      description: data.description || '',
      createdAt: data.created_at || data.createdAt,
      updatedAt: data.updated_at || data.updatedAt,
    }
  }
}
