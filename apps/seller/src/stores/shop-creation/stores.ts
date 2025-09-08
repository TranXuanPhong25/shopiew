import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Types } from './types'
import { ShopData } from '../../features/shops/models'
import { ShopService } from '../../features/shops/service'
import { toast } from 'sonner'

const initialShopData: ShopData = {
   shopName: "",
   location: "",
   businessType: "individual",
   logo: null,
   banner: null,
   email: "",
   phone: "",
   city: "",
   country: "",
   zipCode: "",
}

export const useShopCreationStore = create<Types>()(
   devtools(
      (set, get) => ({
         // Initial state
         shopData: initialShopData,
         currentStep: 0,
         logo: null,
         banner: null,
         isSubmitting: false,
         isCompleted: false,
         errors: {},

         // Step navigation
         nextStep: () => {
            const { currentStep } = get()
            const maxSteps = 3 // We now have 3 steps: basic, contact, social
            if (currentStep < maxSteps - 1) {
               set({ currentStep: currentStep + 1 })
            }
         },

         prevStep: () => {
            const { currentStep } = get()
            if (currentStep > 0) {
               set({ currentStep: currentStep - 1 })
            }
         },

         goToStep: (step: number) => {
            const maxSteps = 3
            if (step >= 0 && step < maxSteps) {
               set({ currentStep: step })
            }
         },

         // Data management
         updateShopData: (field, value) => {
            set((state) => ({
               shopData: {
                  ...state.shopData,
                  [field]: value
               }
            }))
            
            // Clear field error when user updates the field
            get().clearFieldError(field)
         },

         setShopData: (data) => {
            set((state) => ({
               shopData: {
                  ...state.shopData,
                  ...data
               }
            }))
         },

         resetForm: () => {
            set({
               shopData: initialShopData,
               currentStep: 0,
               isSubmitting: false,
               isCompleted: false,
               errors: {}
            })
         },

         // UI state
         setSubmitting: (submitting) => {
            set({ isSubmitting: submitting })
         },

         setCompleted: (completed) => {
            set({ isCompleted: completed })
         },

         // Validation
         setFieldError: (field, error) => {
            set((state) => ({
               errors: {
                  ...state.errors,
                  [field]: error
               }
            }))
         },

         clearFieldError: (field) => {
            set((state) => {
               const newErrors = { ...state.errors }
               delete newErrors[field]
               return { errors: newErrors }
            })
         },

         clearAllErrors: () => {
            set({ errors: {} })
         },

         // Form submission
         submitForm: async (onSuccess?: () => void) => {
            const { shopData, setSubmitting, setCompleted } = get()
            
            setSubmitting(true)
            get().clearAllErrors()

            try {
               // Basic validation
               const errors: Partial<Record<keyof ShopData, string>> = {}
               
               if (!shopData.shopName.trim()) {
                  errors.shopName = "Shop name is required"
               }

               if (!shopData.email.trim()) {
                  errors.email = "Email address is required"
               } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shopData.email)) {
                  errors.email = "Please enter a valid email address"
               }

               if (Object.keys(errors).length > 0) {
                  set({ errors })
                  toast.error("Please fix the validation errors")
                  return
               }

               // Submit to API
               // await ShopService.createShop(shopData)
               console.log("Submitting shop data:", shopData)
               toast.success("Shop created successfully!")
               
               // Mark as completed
               setCompleted(true)
               
               // Call success callback if provided (for navigation)
               onSuccess?.()
               
            } catch (error) {
               console.error('Error creating shop:', error)
               toast.error("Failed to create shop. Please try again.")
            } finally {
               setSubmitting(false)
            }
         },
         
         // File uploads
         setLogo: (file) => {
            set({ logo: file })
         },
         setBanner: (file) => {
            set({ banner: file })
         }

      }),
      {
         name: 'shop-creation-store'
      }
   )
)
