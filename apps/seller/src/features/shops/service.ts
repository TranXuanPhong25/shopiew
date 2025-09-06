/**
 * Shop service for API interactions
 */
import axiosClient from '@/lib/clients/shopiewClient'
import { ShopData } from './models'

export class ShopService {
   /**
    * Create a new shop
    */
   static async createShop(shopData: ShopData): Promise<any> {
      try {
         const response = await axiosClient.post('/shops', shopData)
         return response.data
      } catch (error) {
         console.error('Error creating shop:', error)
         throw error
      }
   }

   /**
    * Update shop data
    */
   static async updateShop(shopId: string, shopData: Partial<ShopData>): Promise<any> {
      try {
         const response = await axiosClient.put(`/shops/${shopId}`, shopData)
         return response.data
      } catch (error) {
         console.error('Error updating shop:', error)
         throw error
      }
   }

   /**
    * Get shop by ID
    */
   static async getShop(shopId: string): Promise<any> {
      try {
         const response = await axiosClient.get(`/shops/${shopId}`)
         return response.data
      } catch (error) {
         console.error('Error fetching shop:', error)
         throw error
      }
   }

   /**
    * Upload shop media (logo, banner)
    */
   static async uploadShopMedia(file: File, type: 'logo' | 'banner'): Promise<string> {
      try {
         const formData = new FormData()
         formData.append('file', file)
         formData.append('type', type)
         
         const response = await axiosClient.post('/shops/upload', formData, {
            headers: {
               'Content-Type': 'multipart/form-data',
            },
         })
         
         return response.data.url
      } catch (error) {
         console.error('Error uploading shop media:', error)
         throw error
      }
   }

   /**
    * Validate shop name availability
    */
   static async validateShopName(shopName: string): Promise<boolean> {
      try {
         const response = await axiosClient.get(`/shops/validate-name?name=${encodeURIComponent(shopName)}`)
         return response.data.available
      } catch (error) {
         console.error('Error validating shop name:', error)
         throw error
      }
   }
}
