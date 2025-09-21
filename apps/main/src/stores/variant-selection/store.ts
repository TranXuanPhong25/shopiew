"use client"

import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { 
  ProductVariant, 
  VariantOption, 
  VariantOptionValue 
} from '@/features/products/types'
import { 
  VariantSelectionStore, 
  DEFAULT_VARIANT_SELECTION_STATE 
} from './types'

// Create the store with proper SSR handling
export const useVariantSelectionStore = create<VariantSelectionStore>()(
  subscribeWithSelector(
    (set, get) => ({
      // Initial state
      ...DEFAULT_VARIANT_SELECTION_STATE,

      // Actions
      selectVariant: (optionName: string, value: string) => {
        const state = get()
        const newSelectedVariant = {
          ...state.selectedVariant,
          [optionName]: value
        }
        
        // Update derived state
        const { currentVariant, isValid, currentPrice, currentInventory } = 
          calculateDerivedState(newSelectedVariant, state.options, state.variants)
        
        set({
          selectedVariant: newSelectedVariant,
          currentVariant,
          isValid,
          currentPrice,
          currentInventory
        })
      },

      clearSelection: () => {
        set({
          selectedVariant: {},
          currentVariant: null,
          isValid: false,
          currentPrice: DEFAULT_VARIANT_SELECTION_STATE.currentPrice,
          currentInventory: DEFAULT_VARIANT_SELECTION_STATE.currentInventory
        })
      },

      initializeVariants: (variants: ProductVariant[]) => {
        const options = generateOptionsFromVariants(variants)
        
        set({
          variants,
          options,
          selectedVariant: {},
          currentVariant: null,
          isValid: false,
          currentPrice: variants.length > 0 ? 
            { originalPrice: parseFloat(variants[0].price || '0'), salePrice: parseFloat(variants[0].price || '0') } :
            DEFAULT_VARIANT_SELECTION_STATE.currentPrice,
          currentInventory: variants.length > 0 ?
            { available: parseInt(variants[0].stockQuantity || '0'), reserved: 0, total: parseInt(variants[0].stockQuantity || '0') } :
            DEFAULT_VARIANT_SELECTION_STATE.currentInventory
        })
      },

      reset: () => {
        set({
          ...DEFAULT_VARIANT_SELECTION_STATE
        })
      }
    })
  )
)

// Helper function to generate variant options from variants
function generateOptionsFromVariants(variants: ProductVariant[]): VariantOption[] {
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
}

// Helper function to calculate derived state
function calculateDerivedState(
  selectedVariant: Record<string, string>,
  options: VariantOption[],
  variants: ProductVariant[]
) {
  // Find current variant based on selected options
  let currentVariant: ProductVariant | null = null
  if (Object.keys(selectedVariant).length > 0) {
    currentVariant = variants.find((variant: ProductVariant) => {
      if (!variant.attributes) return false
      return Object.entries(selectedVariant).every(([key, value]) =>
        variant.attributes![key] === value
      )
    }) || null
  }

  // Check if selection is valid
  const isValid = options.length > 0 &&
    options.every(option => selectedVariant[option.name] !== undefined) &&
    currentVariant !== null

  // Calculate current price
  const currentPrice = currentVariant ? {
    originalPrice: parseFloat(currentVariant.price || '0'),
    salePrice: parseFloat(currentVariant.price || '0')
  } : { originalPrice: 0, salePrice: 0 }

  // Calculate current inventory
  const currentInventory = currentVariant ? {
    available: parseInt(currentVariant.stockQuantity || '0'),
    reserved: 0,
    total: parseInt(currentVariant.stockQuantity || '0')
  } : { available: 0, reserved: 0, total: 0 }

  return {
    currentVariant,
    isValid,
    currentPrice,
    currentInventory
  }
}

// Selector hooks for convenience
export const useSelectedVariant = () => useVariantSelectionStore(state => state.selectedVariant)
export const useCurrentVariant = () => useVariantSelectionStore(state => state.currentVariant)
export const useVariantOptions = () => useVariantSelectionStore(state => state.options)
export const useVariantSelectionValid = () => useVariantSelectionStore(state => state.isValid)
export const useCurrentPrice = () => useVariantSelectionStore(state => state.currentPrice)
export const useCurrentInventory = () => useVariantSelectionStore(state => state.currentInventory)

// Action hooks
export const useVariantSelectionActions = () => useVariantSelectionStore(state => ({
  selectVariant: state.selectVariant,
  clearSelection: state.clearSelection,
  initializeVariants: state.initializeVariants,
  reset: state.reset
}))