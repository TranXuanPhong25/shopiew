/**
 * Hook for managing shop creation state and logic
 * Now using Zustand store for better state management
 */
"use client"

import { useRouter } from 'next/navigation'
import { useShopCreationStore } from '@/stores'

// Re-export the store hook for backward compatibility and add router integration
export const useShopCreation = () => {
   const store = useShopCreationStore()
   const router = useRouter()
   
   // Wrap submitForm to include navigation
   const handleSubmit = async () => {
      await store.submitForm(() => {
         router.push('/dashboard') // Redirect to dashboard after creation
      })
   }
   
   return {
      ...store,
      // Add alias for backward compatibility with router navigation
      handleSubmit
   }
}
