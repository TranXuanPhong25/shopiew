import { ReactNode } from "react"
import { ProductDetail, ProductVariant, SelectedVariant, VariantInventory, VariantOption, VariantPrice } from "../types"

// Product page context type definition
export interface ProductPageContextType {
  // Product data
  productId: string | null
  product: ProductDetail
  isLoading: boolean
  isError: boolean
  error: any
  isSuccess: boolean
  refetch: () => void
  isParamsResolved: boolean
 
}

// Provider props interface
export interface ProductPageProviderProps {
  children: ReactNode
  params: Promise<{ productId: string }>
}