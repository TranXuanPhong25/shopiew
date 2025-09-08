/**
 * Hook for managing shop creation state and logic
 * Now using Zustand store for better state management
 */
"use client"

import { useRouter } from 'next/navigation'
import { useShopCreationStore } from '@/stores'
import { useAuth } from '@/features/auth'

// Re-export the store hook for backward compatibility and add router integration
export const useShopCreation = () => {
   const store = useShopCreationStore()
   const router = useRouter()
   const { user } = useAuth()
   
   // Wrap submitForm to include navigation and userId
   const handleSubmit = async () => {
      if (!user?.userId) {
         console.error('User ID not available')
         return
      }
      
      await store.submitForm(user.userId, () => {
         router.push('/dashboard') // Redirect to dashboard after creation
      })
   }
   
   return {
      ...store,
      // Add alias for backward compatibility with router navigation
      handleSubmit
   }
}
