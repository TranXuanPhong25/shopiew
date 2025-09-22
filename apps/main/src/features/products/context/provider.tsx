import { notFound } from 'next/navigation'
import { useState, useEffect, useMemo, useCallback, memo } from 'react'
import { ProductPageProviderProps } from './types'

import React, { createContext, useContext, ReactNode } from 'react'
import { 
  ProductVariant, 
  SelectedVariant, 
  VariantOption, 
  VariantPrice, 
  VariantInventory, 
  VariantOptionValue
} from '@/features/products/types'
import { useGetProduct } from '../hooks/use-get-product'
import { ProductPageContext } from './context'
// Provider component
export function ProductPageProvider({ children, params }: ProductPageProviderProps) {
  const [productId, setProductId] = useState<string | null>(null)
  const [isParamsResolved, setIsParamsResolved] = useState(false)
  
  // Variant selection state
  const [selectedVariant, setSelectedVariant] = useState<SelectedVariant>({})
  // Resolve params
  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params
        if (!resolvedParams.productId) {
          notFound()
          return
        }
        setProductId(resolvedParams.productId)
      } catch (error) {
        console.error('Error resolving params:', error)
        notFound()
      } finally {
        setIsParamsResolved(true)
      }
    }

    resolveParams()
  }, [params])

  // Fetch product data using React Query
  const productQuery = useGetProduct(productId, {
    throwOnError: (error: any) => {
      // Navigate to 404 if product not found
      if (error?.message?.includes('not found')) {
        notFound()
      }
      return true
    }
  })
  const product = productQuery.data
  const variants = product?.variants || []

  // Generate variant options from variants
  const options = useMemo((): VariantOption[] => {
    if (!variants || variants.length === 0) return []

    const optionMap: Record<string, Set<string>> = {}
    const optionImages: Record<string, Record<string, string[]>> = {}

    variants.forEach((variant: ProductVariant) => {
      if (!variant.attributes) return

      Object.entries(variant.attributes).forEach(([key, value]) => {
        const stringValue = String(value)
        
        if (!optionMap[key]) {
          optionMap[key] = new Set()
          optionImages[key] = {}
        }
        optionMap[key].add(stringValue)
        
        if (!optionImages[key][stringValue]) {
          optionImages[key][stringValue] = []
        }
        if (variant.images && variant.images.length > 0) {
          optionImages[key][stringValue].push(...variant.images)
        }
      })
    })
    
    return Object.entries(optionMap).map(([name, valueSet], index) => {
      const values: VariantOptionValue[] = Array.from(valueSet).map((value, valueIndex) => ({
        id: `${name}-${value}-${valueIndex}`,
        value,
        label: value,
        images: optionImages[name][value] || [],
        available: true,
        disabled: false
      }))

      return {
        id: `option-${name}-${index}`,
        name,
        label: name,
        type: name.toLowerCase() === 'color' ? 'color' : 
              name.toLowerCase() === 'size' ? 'size' : 'text',
        values
      }
    })
  }, [variants])


  const currentVariants = useMemo(() => {
    if (Object.keys(selectedVariant).length === 0) return variants
    
    return variants.filter((variant: ProductVariant) => {
      if (!variant.attributes) return false
      return Object.entries(selectedVariant).every(([key, value]) =>
        variant.attributes![key] === value
      )
    }) || []
  }, [variants, selectedVariant])
  // Check if selection is valid
  const isValid = useMemo(() => {
    return options.length > 0 &&
      options.every(option => selectedVariant[option.name] !== undefined) &&
      currentVariants.length !== 0
  }, [options, selectedVariant, currentVariants])

  // Calculate current price
  const currentPrice: VariantPrice = useMemo(() => {  
    const maxPrice = Math.max(...currentVariants.map((v: ProductVariant) => parseFloat(v.price || '0')), 0)
    if (!currentVariants.length) {
      const prices = variants.map((v: ProductVariant) => parseFloat(v.price || '0'))
      const lowestPrice = Math.min(...prices, prices[0])
      return {
        originalPrice: lowestPrice,
        salePrice: lowestPrice,
        maxPrice
      }
    }
    const price = parseFloat(currentVariants[0].price || '0')
    return {
      originalPrice: price,
      salePrice: price,
      maxPrice
    }
  }, [currentVariants])
  // Calculate current inventory
  const currentInventory: VariantInventory = useMemo(() => {
    const inStocks = currentVariants.reduce((sum: number, v: ProductVariant) => {
      return sum + parseInt(v.stockQuantity || '0')
    }, 0)
    if (!currentVariants.length) {
      return { available: inStocks, reserved: 0, total: inStocks }
    }

    const available = inStocks
    return {
      available,
      reserved: 0,
      total: available
    }
  }, [currentVariants])

  // Variant selection actions
  const selectVariant = useCallback((optionName: string, value: string) => {
    setSelectedVariant(prev => ({
      ...prev,
      [optionName]: value
    }))
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedVariant({})
  }, [])
  return (
    <ProductPageContext.Provider value={{
    productId,
    isParamsResolved,
    product: productQuery.data,
    isLoading: !isParamsResolved || productQuery.isLoading,
    isError: productQuery.isError,
    error: productQuery.error,
    isSuccess: productQuery.isSuccess && isParamsResolved,
    refetch: productQuery.refetch,
    variants,
    // Variant selection state and actions
    selectedVariant,
    currentVariants,
    options,
    isValid,
    currentPrice,
    currentInventory,
    selectVariant,
    clearSelection
  }}>
      {children}
    </ProductPageContext.Provider>
  )
}
