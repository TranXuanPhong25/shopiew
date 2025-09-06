import { z } from 'zod'

// Basic Info Step Schema
export const basicInfoSchema = z.object({
  shopName: z.string()
    .min(1, 'Shop name is required')
    .min(3, 'Shop name must be at least 3 characters')
    .max(50, 'Shop name must be less than 50 characters'),
  location: z.string()
    .min(1, 'Location is required'),
  businessType: z.enum(['individual', 'business'], {
    message: 'Business type is required'
  }),
})

// Contact Step Schema
export const contactSchema = z.object({
  email: z.email('Please enter a valid email address')
    .min(1, 'Email is required'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^[+]?[\d\s\-\(\)]{10,}$/, 'Please enter a valid phone number'),
  city: z.string()
    .min(1, 'City is required'),
  country: z.string()
    .min(1, 'Country is required'),
  zipCode: z.string()
    .min(1, 'Zip code is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid zip code'),
})

// Combined schema for final validation
export const completeShopSchema = basicInfoSchema.extend(contactSchema.shape)

// Type definitions
export type BasicInfoFormData = z.infer<typeof basicInfoSchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type CompleteShopFormData = z.infer<typeof completeShopSchema>
