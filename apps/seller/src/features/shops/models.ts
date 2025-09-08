/**
 * Shop-related models and types
 */

export interface ShopData {
   // Basic Info
   name: string
   location: string
   businessType: string
   logo: File| null
   banner: File| null

   // Contact
   email: string
   phone: string
   
   // Owner information (optional for form data, will be added during submission)
   ownerId?: string
}

export interface ShopCreationStep {
   id: string
   title: string
   icon: any // React component type
}
