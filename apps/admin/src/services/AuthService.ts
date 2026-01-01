import { apiClient } from '@/lib/axiosClient'
import type { LoginRequest, LoginResponse, User } from '@/models/auth'
/**
 * Auth service handling API interactions
 */
export const AuthService = {
  /**
   * Get the current user profile
   */
  getCurrentUser: async (): Promise<LoginResponse> => {
    try {
      const response = await apiClient.get(`/auth/me`)
      return response.data
    } catch (error) {
      throw error
    }
  },

  /**
   * Login with email and password
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const body = { email: credentials.email, password: credentials.password }
      const response = await apiClient.post(`/auth/login`, body)

      // Return the data including the access token to the client
      return response.data
    } catch (error: any) {
      console.error('Login action failed:', error.response?.data || error.message)
      throw error
    }
  },

  /**
   * Logout the current user
   */
  logout: async (): Promise<boolean> => {
    try {
      await apiClient.post(`/auth/logout`, {})

      return true
    } catch (error: any) {
      console.error('Logout action failed:', error.response?.data || error.message)
      throw error
    }
  },
}
