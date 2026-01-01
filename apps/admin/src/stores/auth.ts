import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AuthService } from '@/services/AuthService'
import type { User, LoginRequest } from '@/models/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isSuperAdmin = computed(() => user.value?.role === 'super_admin')

  const initializeAuth = async () => {
    const currentUser = await AuthService.getCurrentUser()
    if (currentUser) {
      user.value = currentUser.userInfo
    }
  }

  const login = async (credentials: LoginRequest) => {
    isLoading.value = true
    error.value = null

    try {
      const response = await AuthService.login(credentials)
      user.value = response.userInfo
      return response
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Đăng nhập thất bại'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    isLoading.value = true
    try {
      await AuthService.logout()
      user.value = null
      error.value = null
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      isLoading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    user,
    isLoading,
    error,
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    initializeAuth,
    login,
    logout,
    clearError,
  }
})
