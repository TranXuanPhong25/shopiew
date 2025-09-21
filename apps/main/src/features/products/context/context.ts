"use client"

import { createContext, useContext } from 'react'
import { ProductPageContextType } from './types'


// Create the context
const ProductPageContext = createContext<ProductPageContextType | undefined>(undefined)

// Custom hook to use the product page context
export function useProductPageContext(): ProductPageContextType {
  const context = useContext(ProductPageContext)
  
  if (context === undefined) {
    throw new Error('useProductPageContext must be used within a ProductPageProvider')
  }
  
  return context
}

// Export the context for advanced use cases
export { ProductPageContext }