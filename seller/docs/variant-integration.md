# Variant Management with Zustand and React Hook Form

This integration provides a global state management solution for product variants using Zustand, while maintaining seamless integration with React Hook Form for form validation and submission.

## Architecture

### Core Components

1. **Zustand Store** (`/stores/variant-store.ts`)
   - Global state management for variants and options
   - Automatic variant generation from options
   - Actions for CRUD operations

2. **React Hook Form Integration** (`/hooks/use-variant-form.ts`)
   - Syncs variant state with form data
   - Provides utilities for form submission
   - Handles form reset functionality

3. **UI Components**
   - `VariantOptions`: Main variant management UI
   - `VariantController`: React Hook Form controller wrapper

### Key Features

- **Automatic Variant Generation**: When you add options (like Color: Red, Blue and Size: S, M), variants are automatically generated (Red/S, Red/M, Blue/S, Blue/M)
- **Real-time Sync**: Variant changes are immediately reflected in the form state
- **Validation**: Full integration with Zod schema validation
- **Persistence**: State persists across component re-renders
- **Type Safety**: Full TypeScript support

## Usage

### 1. Using the Variant Store

```tsx
import { useVariantStore } from '@/stores/variant-store'

function MyComponent() {
  const {
    options,
    variants,
    addOption,
    updateOptionName,
    addValue,
    updateValue,
    toggleVariant
  } = useVariantStore()

  // Add a new option (e.g., "Color")
  const handleAddOption = () => {
    addOption()
    // Update the option name
    updateOptionName(newOptionId, "Color")
  }

  // Add values to an option
  const handleAddValue = (optionId: string) => {
    addValue(optionId)
    // Update the value
    updateValue(optionId, newValueId, "Red")
  }
}
```

### 2. Form Integration

```tsx
import { useForm } from 'react-hook-form'
import { useVariantFormIntegration } from '@/hooks/use-variant-form'

function ProductForm() {
  const { control, setValue, handleSubmit } = useForm<NewProductFormData>()
  const { 
    getSelectedVariantsForSubmission, 
    hasSelectedVariants, 
    resetAllVariants 
  } = useVariantFormIntegration(setValue)

  const onSubmit = (data: NewProductFormData) => {
    const variants = getSelectedVariantsForSubmission()
    // Submit form with variants
    createProduct({ ...data, variants })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VariantController control={control} name="variants" />
      <button type="submit">Save</button>
    </form>
  )
}
```

### 3. Validation Schema

The variants are included in the Zod validation schema:

```typescript
const VariantSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  available: z.string(),
  selected: z.boolean(),
  combination: z.array(z.object({
    name: z.string(),
    value: z.string(),
  })).optional(),
})

export const NewProductFormSchema = z.object({
  // ... other fields
  variants: z.array(VariantSchema).optional(),
})
```

## Data Flow

1. User adds options and values in the UI
2. Zustand store automatically generates variant combinations
3. User selects which variants to include
4. Hook syncs selected variants with React Hook Form
5. Form validation runs on the complete data
6. On submit, selected variants are formatted for API

## Best Practices

1. **Always use the hook**: Use `useVariantFormIntegration` for form integration rather than directly accessing the store
2. **Reset on success**: Call `resetAllVariants()` after successful form submission
3. **Type safety**: Use the provided TypeScript types from `/types/variant.ts`
4. **Validation**: Ensure selected variants have valid price and stock quantities before submission

## Example: Complete Integration

```tsx
export default function NewProductForm() {
  const { handleSubmit, control, setValue, reset } = useForm<NewProductFormData>({
    resolver: zodResolver(NewProductFormSchema),
    defaultValues: {
      // ... other defaults
      variants: [],
    },
  })

  const { 
    getSelectedVariantsForSubmission, 
    hasSelectedVariants, 
    resetAllVariants 
  } = useVariantFormIntegration(setValue)

  const onSubmit = async (data: NewProductFormData) => {
    const variants = getSelectedVariantsForSubmission()
    
    await createProduct({
      product: { ...data },
      variants,
    }, {
      onSuccess: () => {
        reset()
        resetAllVariants()
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Other form sections */}
      <VariantController control={control} name="variants" />
      
      <FloatingNotificationBar isExpanded={isDirty || hasSelectedVariants()}>
        <button type="submit">Save Product</button>
      </FloatingNotificationBar>
    </form>
  )
}
```

This integration provides a robust, type-safe, and user-friendly way to manage product variants in your e-commerce application.
