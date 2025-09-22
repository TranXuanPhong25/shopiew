import { notFound } from 'next/navigation'
import { useState, useEffect, memo } from 'react'
import { ProductPageProviderProps } from './types'

import React from 'react'
import { useGetProduct } from '../hooks/use-get-product'
import { ProductPageContext } from './context'

// Provider component
export function ProductPageProvider({ children, params }: ProductPageProviderProps) {
  const [productId, setProductId] = useState<string | null>(null)
  const [isParamsResolved, setIsParamsResolved] = useState(false)
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

  return (
    <ProductPageContext.Provider value={{
      productId,
      isParamsResolved,
      product: productQuery.data,
      isLoading: !isParamsResolved || productQuery.isLoading,
      isError: productQuery.isError,
      error: productQuery.error,
      isSuccess: productQuery.isSuccess && isParamsResolved,
      refetch: productQuery.refetch
    }}>
      {children}
    </ProductPageContext.Provider>
  )
}
