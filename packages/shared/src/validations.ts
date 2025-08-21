import { z } from "zod"

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { message: "Password is required." }).trim(),
})
export const SignupFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
})

export const NewProductFormSchema = z.object({
  name: z.string().min(1, { message: "Product's name is required" }),
  category: z.string().nonempty({ message: "Product's category is required." }),
  description: z.string().min(1, { message: "Product's description is required." }),
  specs: z.object({
    brand: z.string().min(1, { message: "Thương hiệu không được để trống." }),
    packageSize: z.string()
      .refine(val => !val || /^\d+$/.test(val), { message: "Package size must be a integer." }),
    activeIngredients: z.string().optional(),
    ingredients: z.string().optional(),
    quantity: z.string()
      .refine(val => !val || /^\d+$/.test(val), { message: "Số lượng phải là số." }),
      
    responsibleManufacturingAddress: z.string().optional(),
    weightValue: z.string()
      .refine(val => !val || /^\d+(\.\d+)?$/.test(val), { message: "Trọng lượng phải là số." }),
    weightUnit: z.enum(["g", "kg", "ml", "l"]), // Example units
    packagingType: z.string().optional(),
    productSize: z.string().optional(),
    packagingMaterial: z.string().optional()
  }),
  sku: z.string().optional(),

  price: z.string()
    .refine(val => !val || /^\d+(\.\d+)?$/.test(val), { message: "Giá phải là số." }),
  stockQuantity: z.string()
    .refine(val => !val || /^\d+$/.test(val), { message: "Kho hàng phải là số." }),
  maxPurchaseQuantity: z.string().optional(),
  status: z.enum(["ACTIVE", "DRAFT", "ARCHIVED"]),
  isNew: z.string().optional(),
  shippingInfo: z.object({
    weightAfterPackaging: z.string()
      .refine(val => !val || /^\d+(\.\d+)?$/.test(val), { message: "Trọng lượng sau khi đóng gói phải là số." })
      .optional(),
    dimensions: z.object({
      width: z.string()
        .refine(val => !val || /^\d+$/.test(val), { message: "Chiều rộng phải là số." })
        .optional(),
      length: z.string()
        .refine(val => !val || /^\d+$/.test(val), { message: "Chiều dài phải là số." })
        .optional(),
      height: z.string()
        .refine(val => !val || /^\d+$/.test(val), { message: "Chiều cao phải là số." })
        .optional(),
    }).optional()
  }).optional(),
})

export type NewProductFormData = z.infer<typeof NewProductFormSchema>

export type LoginFormState =
  | {
    errors?: {
      email?: string[]
      password?: string[]
    }
    message?: string
  }
  | undefined

export type SignupFormState =
  | {
    errors?: {
      email?: string[]
      password?: string[]
    }
    message?: string
  }
  | undefined
