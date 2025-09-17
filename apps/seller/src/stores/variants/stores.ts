import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {OptionValue, ProductOption, Variant, Types} from './types'
import {TriadState} from '@/components/ui/triad-checkbox'
import {formatPriceValue, generateUniqueId} from '@/lib/utils'

// Helper function to generate unique IDs

let debounceTimer: NodeJS.Timeout | null = null


const generateVariantCombinations = (options: ProductOption[]): Variant[] => {
  if (options.length === 0 || options.some(option => option.values.length === 0)) {
    return []
  }

  const combinations = options.reduce((acc, option) => {
    if (acc.length === 0) {
      return option.values.filter(valueOption => valueOption.value.trim() !== "").map(value => [{ name: option.name, value: value.value }])
    }

    const newCombinations: Array<Array<{ name: string; value: string }>> = []
    acc.forEach(combination => {
      option.values.forEach(value => {
        if (value.value.trim() !== "") {
          newCombinations.push([...combination, { name: option.name, value: value.value }])
        }
      })
    })
    return newCombinations
  }, [] as Array<Array<{ name: string; value: string }>>)

  return combinations.map((combination, index) => ({
    id: `variant-${index}`,
    name: combination.map(item => item.value).join(' / '),
    price: '',
    available: '',
    sku: '',
    selected: true,
    combination
  }))
}

export const useVariantStore = create<Types>()(
  devtools(
    (set, get) => ({
      options: [],
      variants: [],
      setOptions: (options) => set({ options }),
      setVariants: (variants) => set({ variants }),

      generateVariants: (options) => generateVariantCombinations(options),

      updateVariants: (newOptions) => {
        const validOptions = newOptions.filter(option =>
          option.name.trim() !== '' && option.values.some(value => value.value.trim() !== '')
        )
        const newVariants = generateVariantCombinations(validOptions)

        // Preserve existing variant data
        const existingVariants = get().variants
        const mergedVariants = newVariants.map(newVariant => {
          // Find existing variant by matching the combination name
          const existingVariant = existingVariants.find(existing =>
            existing.name === newVariant.name
          )
          // const existingVariant = existingVariants.find(existing => {
          //   if (existing.combination.length !== newVariant.combination.length) {
          //     return false
          //   }

          //   return existing.combination.every(existingItem =>
          //     newVariant.combination.some(newItem =>
          //       newItem.name === existingItem.name && newItem.value === existingItem.value
          //     )
          //   )
          // })
          if (existingVariant) {
            // Preserve existing data but update the combination structure
            return {
              ...newVariant,
              id: existingVariant.id, // Keep the same ID
              price: existingVariant.price, // Preserve price
              available: existingVariant.available, // Preserve availability
              selected: existingVariant.selected, // Preserve selection status
            }
          }

          // Return new variant with default values
          return newVariant
        })

        set({ variants: mergedVariants })
      },

      addOption: () => {
        const newOption: ProductOption = {
          id: generateUniqueId(),
          name: "",
          values: [],
        }
        const newOptions = [...get().options, newOption]
        set({ options: newOptions })
        get().updateVariants(newOptions)
        get().addValue(newOption.id) // Automatically add a value to the new option
      },

      updateOptionName: (optionId, name) => {
        const newOptions = get().options.map((option) =>
          option.id === optionId ? { ...option, name } : option
        )
        set({ options: newOptions })
        get().updateVariants(newOptions)
      },

      deleteOption: (optionId) => {
        const newOptions = get().options.filter((option) => option.id !== optionId)
        set({ options: newOptions })
        get().updateVariants(newOptions)
      },

      addValue: (optionId) => {
        const newValue: OptionValue = {
          id: generateUniqueId(),
          value: "",
        }
        const newOptions = get().options.map((option) =>
          option.id === optionId
            ? { ...option, values: [...option.values, newValue] }
            : option
        )
        set({ options: newOptions })
      },
      updateValueImmediate: (optionId, valueId, value) => {
        const newOptions = get().options.map((option) =>
          option.id === optionId
            ? {
              ...option,
              values: option.values.map((v) => (v.id === valueId ? { ...v, value } : v)),
            }
            : option,
        )
        set({ options: newOptions })
      },

      updateValue: (optionId, valueId, value) => {
        // Check if we need to add a new value
        const isLastValueEmpty = get().options.find(option =>
          option.id === optionId &&
          option.values.length > 0 &&
          option.values[option.values.length - 1].id === valueId &&
          option.values[option.values.length - 1].value === ""
        )

        if (isLastValueEmpty && value.trim() !== "") {
          get().addValue(optionId)
        }

        if (debounceTimer) {
          clearTimeout(debounceTimer)
        }

        // Update value immediately for UI responsiveness
        get().updateValueImmediate(optionId, valueId, value)


        // Debounce variant generation
        debounceTimer = setTimeout(() => {
          if (value.trim() === "") {
            get().deleteValue(optionId, valueId)
          }
          const currentOptions = get().options
          get().updateVariants(currentOptions)
        }, 100)
      },
      deleteValue: (optionId, valueId) => {
        const newOptions = get().options.map((option) =>
          option.id === optionId
            ? { ...option, values: option.values.filter((v) => v.id !== valueId) }
            : option,
        )
        set({ options: newOptions })
        get().updateVariants(newOptions)
      },

      updateVariant: (variantId, field, value) => {
        let formattedValue = value

        // Auto-format price values
        if (field === 'price') {
          formattedValue = formatPriceValue(value)
        }

        const newVariants = get().variants.map((variant) =>
          variant.id === variantId ? { ...variant, [field]: formattedValue } : variant
        )
        set({ variants: newVariants })
      },

      toggleVariant: (variantId) => {
        const newVariants = get().variants.map((variant) =>
          variant.id === variantId ? { ...variant, selected: !variant.selected } : variant
        )
        set({ variants: newVariants })
      },
      selectAllVariants: () => {
        const newVariants = get().variants.map((variant) => ({ ...variant, selected: true }))
        set({ variants: newVariants })
      },
      deselectAllVariants: () => {
        const newVariants = get().variants.map((variant) => ({ ...variant, selected: false }))
        set({ variants: newVariants })
      },
      hasSelectedVariants: () => get().variants.some(variant => variant.selected),
      variantsSelectState: () => {
        const selectedCount = get().variants.filter(variant => variant.selected).length
        const totalCount = get().variants.length

        if (selectedCount === 0) {
          return TriadState.None
        } else if (selectedCount === totalCount) {
          return TriadState.All
        } else {
          return TriadState.Indeterminate
        }
      },
      onChangeVariantsSelect: (state: TriadState) => {
        if (state === TriadState.All) {
          get().selectAllVariants()
        } else if (state === TriadState.None) {
          get().deselectAllVariants()
        }
      },
      resetVariants: () => {
        if (debounceTimer) {
          clearTimeout(debounceTimer)
          debounceTimer = null
        }
        set({ options: [], variants: [] })
      },
      onImageChange: (variantId, file) => {
        // Handle image URL change logic here if needed
        const newVariantImage = file ? [{ id: generateUniqueId(),  file }] : []

        const newVariants = get().variants.map((variant) =>
          variant.id === variantId ?
            {
              ...variant,
              images: [
                ...(variant.images || []),
                ...newVariantImage
              ]
            } : variant
        )
        set({ variants: newVariants })
      },
      getSelectedVariantsHasImage: () => get().variants.filter(variant => variant.selected && variant.images && variant.images.length > 0),
      hasOption: () => { return get().options.length > 0 },
    }),
    
    {
      name: 'variant-store',
    }
  )
)