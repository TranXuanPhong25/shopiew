import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { VoucherService } from '@/services/VoucherService'
import type { Voucher, CreateVoucherRequest, UpdateVoucherRequest } from '@/models/voucher'

export const useVoucherStore = defineStore('voucher', () => {
  // State
  const vouchers = ref<Voucher[]>([])
  const currentVoucher = ref<Voucher | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
  })

  // Computed
  const activeVouchers = computed(() =>
    vouchers.value.filter((voucher) => voucher.isActive)
  )

  const expiredVouchers = computed(() => {
    const now = new Date()
    return vouchers.value.filter(
      (voucher) => voucher.expiresAt && new Date(voucher.expiresAt) < now
    )
  })

  const expiringSoonVouchers = computed(() => {
    const now = new Date()
    const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    return vouchers.value.filter(
      (voucher) =>
        voucher.expiresAt &&
        new Date(voucher.expiresAt) > now &&
        new Date(voucher.expiresAt) <= sevenDaysLater
    )
  })

  const upcomingVouchers = computed(() => {
    // For future use if we add start_time field
    return []
  })

  const statistics = computed(() => ({
    total: vouchers.value.length,
    active: activeVouchers.value.length,
    expired: expiredVouchers.value.length,
    expiringSoon: expiringSoonVouchers.value.length,
  }))

  // Actions
  const clearError = () => {
    error.value = null
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (errorMessage: string) => {
    error.value = errorMessage
    console.error('Voucher Store Error:', errorMessage)
  }

  const fetchVouchers = async (page: number = 1, limit: number = 20, active?: boolean) => {
    try {
      setLoading(true)
      clearError()
      const response = await VoucherService.getAllVouchers(page, limit, active)
      vouchers.value = response.vouchers
      pagination.value = {
        page: response.page,
        limit: response.limit,
        total: response.total,
      }
    } catch (err: any) {
      setError(err?.message || 'Không thể tải danh sách voucher')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchVoucherById = async (id: number) => {
    try {
      setLoading(true)
      clearError()
      currentVoucher.value = await VoucherService.getVoucherById(id)
      return currentVoucher.value
    } catch (err: any) {
      setError(err?.message || 'Không thể tải thông tin voucher')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const fetchVoucherByCode = async (code: string) => {
    try {
      setLoading(true)
      clearError()
      currentVoucher.value = await VoucherService.getVoucherByCode(code)
      return currentVoucher.value
    } catch (err: any) {
      setError(err?.message || 'Không thể tìm thấy voucher')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createVoucher = async (data: CreateVoucherRequest) => {
    try {
      setLoading(true)
      clearError()
      const newVoucher = await VoucherService.createVoucher(data)
      vouchers.value.unshift(newVoucher)
      pagination.value.total++
      return newVoucher
    } catch (err: any) {
      setError(err?.message || 'Không thể tạo voucher')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateVoucher = async (id: number, data: UpdateVoucherRequest) => {
    try {
      setLoading(true)
      clearError()
      const updatedVoucher = await VoucherService.updateVoucher(id, data)
      const index = vouchers.value.findIndex((v) => v.id === id)
      if (index !== -1) {
        vouchers.value[index] = updatedVoucher
      }
      if (currentVoucher.value?.id === id) {
        currentVoucher.value = updatedVoucher
      }
      return updatedVoucher
    } catch (err: any) {
      setError(err?.message || 'Không thể cập nhật voucher')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteVoucher = async (id: number) => {
    try {
      setLoading(true)
      clearError()
      await VoucherService.deleteVoucher(id)
      vouchers.value = vouchers.value.filter((v) => v.id !== id)
      pagination.value.total--
      if (currentVoucher.value?.id === id) {
        currentVoucher.value = null
      }
    } catch (err: any) {
      setError(err?.message || 'Không thể xóa voucher')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const toggleVoucherStatus = async (id: number) => {
    try {
      const voucher = vouchers.value.find((v) => v.id === id)
      if (!voucher) throw new Error('Voucher not found')

      await updateVoucher(id, { isActive: !voucher.isActive })
    } catch (err: any) {
      setError(err?.message || 'Không thể thay đổi trạng thái voucher')
      throw err
    }
  }

  const clearCurrent = () => {
    currentVoucher.value = null
  }

  return {
    // State
    vouchers,
    currentVoucher,
    isLoading,
    error,
    pagination,

    // Computed
    activeVouchers,
    expiredVouchers,
    expiringSoonVouchers,
    upcomingVouchers,
    statistics,

    // Actions
    clearError,
    setLoading,
    setError,
    fetchVouchers,
    fetchVoucherById,
    fetchVoucherByCode,
    createVoucher,
    updateVoucher,
    deleteVoucher,
    toggleVoucherStatus,
    clearCurrent,
  }
})
