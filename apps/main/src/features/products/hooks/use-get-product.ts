"use client"

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import ProductService from '@/features/products/service'


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
