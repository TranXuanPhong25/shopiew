export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
}

export interface Voucher {
  id: number
  code: string
  discountType: DiscountType
  discountValue: number
  minOrderValue: number
  maxUsage: number
  usedCount: number
  expiresAt: string | null
  isActive: boolean
  description: string
  createdAt: string
  updatedAt: string
}

export interface CreateVoucherRequest {
  code: string
  discountType: DiscountType
  discountValue: number
  minOrderValue?: number
  maxUsage?: number
  expiresAt?: string
  description?: string
}

export interface UpdateVoucherRequest {
  discountValue?: number
  minOrderValue?: number
  maxUsage?: number
  expiresAt?: string
  isActive?: boolean
  description?: string
}

export interface ListVouchersResponse {
  vouchers: Voucher[]
  total: number
  page: number
  limit: number
}
