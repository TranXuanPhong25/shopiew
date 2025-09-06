import { ShopData } from '../../features/shops/models'

export interface ShopCreationStoreState {
   // Shop data
   shopData: ShopData
   logo: File | null
   banner: File | null
   // Form state
   currentStep: number
   isSubmitting: boolean
   isCompleted: boolean
   
   // Validation
   errors: Partial<Record<keyof ShopData, string>>
}

export interface ShopCreationStoreActions {
   // Step navigation
   nextStep: () => void
   prevStep: () => void
   goToStep: (step: number) => void

   // Data management
   updateShopData: (field: keyof ShopData, value: string | boolean) => void
   setShopData: (data: Partial<ShopData>) => void
   resetForm: () => void

   // UI state
   setSubmitting: (submitting: boolean) => void
   setCompleted: (completed: boolean) => void

   // Validation
   setFieldError: (field: keyof ShopData, error: string) => void
   clearFieldError: (field: keyof ShopData) => void
   clearAllErrors: () => void

   // Form submission
   submitForm: (onSuccess?: () => void) => Promise<void>

   // File uploads
   setLogo: (file: File | null) => void
   setBanner: (file: File | null) => void
}export type ShopCreationStore = ShopCreationStoreState & ShopCreationStoreActions
