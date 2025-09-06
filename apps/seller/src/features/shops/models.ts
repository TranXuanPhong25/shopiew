/**
 * Shop-related models and types
 */

export interface ShopData {
   // Basic Info
   shopName: string
   location: string
   businessType: string
   logo: File| null
   banner: File| null

   // Contact
   email: string
   phone: string
   city: string
   country: string
   zipCode: string
}

export interface ShopCreationStep {
   id: string
   title: string
   icon: any // React component type
}
