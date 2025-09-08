// Export all stores

// Re-export specific stores for convenience
export { default as useProductMediaStore } from './product-media/stores'
export { useVariantStore } from './variants/stores'
export { useShopCreationStore } from './shop-creation/stores'

// Export types with aliases to avoid conflicts
export type { Types as VariantStoreTypes } from './variants/types'
export type { Types as ShopCreationStoreTypes } from './shop-creation/types'
export type { Types as ProductMediaStoreTypes } from './product-media/types'