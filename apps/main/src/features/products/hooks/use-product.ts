"use client"

import { useState, useEffect, useMemo, useCallback } from 'react'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import ProductService from '@/features/products/service'
import { 
  ProductVariant, 
  SelectedVariant, 
  VariantOption, 
  VariantOptionValue,
  VariantPrice, 
  VariantInventory 
} from '@/features/products/types'

// Product query keys for better cache management
export const productKeys = {
  all: ['products'],
  lists: () => [...productKeys.all, 'list'],
  list: (filters: string) => [...productKeys.lists(), { filters }],
  details: () => [...productKeys.all, 'detail'],
  detail: (id: string) => [...productKeys.details(), id],
}

// Hook for fetching a single product by ID
export function useGetProduct(
  productId: string | null,
  options?: Omit<UseQueryOptions<any, Error, any, any[]>, 'queryKey' | 'queryFn'>
) {
  return useQuery({
    queryKey: productKeys.detail(productId || ''),
    queryFn: async () => {
      if (!productId) {
        throw new Error('Product ID is required')
      }
      
      try {
        const product = await ProductService.getProductById(productId)
        if (!product) {
          throw new Error('Product not found')
        }
        return product
      } catch (error) {
        console.error('Error fetching product:', error)
        throw error
      }
    },
    enabled: !!productId, // Only run query if productId exists
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    retry: (failureCount, error: any) => {
      // Don't retry if it's a 404 error
      if (error?.message?.includes('not found')) {
        return false
      }
      return failureCount < 3
    },
    ...options,
  })
}

// Hook for handling product page params and fetching with variant selection
export function useProductPage(params: Promise<{ productId: string }>) {
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
        return false
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

  // Find current variant based on selected options
  const currentVariant = useMemo(() => {
    if (Object.keys(selectedVariant).length === 0) return null
    
    return variants.find((variant: ProductVariant) => {
      if (!variant.attributes) return false
      return Object.entries(selectedVariant).every(([key, value]) =>
        variant.attributes![key] === value
      )
    }) || null
  }, [variants, selectedVariant])

  // Check if selection is valid
  const isValid = useMemo(() => {
    return options.length > 0 &&
      options.every(option => selectedVariant[option.name] !== undefined) &&
      currentVariant !== null
  }, [options, selectedVariant, currentVariant])

  // Calculate current price
  const currentPrice: VariantPrice = useMemo(() => {
    if (!currentVariant) {
      return { originalPrice: 1500000, salePrice: 1500000 }
    }

    const price = parseFloat(currentVariant.price || '0')
    return {
      originalPrice: price,
      salePrice: price
    }
  }, [currentVariant])

  // Calculate current inventory
  const currentInventory: VariantInventory = useMemo(() => {
    if (!currentVariant) {
      return { available: 332, reserved: 0, total: 332 }
    }

    const available = parseInt(currentVariant.stockQuantity || '0')
    return {
      available,
      reserved: 0,
      total: available
    }
  }, [currentVariant])

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

  return {
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
    currentVariant,
    options,
    isValid,
    currentPrice,
    currentInventory,
    selectVariant,
    clearSelection
  }
}
