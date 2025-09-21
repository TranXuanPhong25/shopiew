export interface IDisplayable {
    id: number;
    imageUrl: string;
}

export interface Informative {
    name: string;
    rating: number;
    originalPrice: number;
}
interface Types {
    originalPrice: number;
}



export interface ProductCardProps extends IDisplayable, Informative {
    salePrice: number;
    soldQuantity: number;
    soldAddress: string;
}

export interface CompactDisplayFlashSaleProps extends IDisplayable, Types {
    flashSalePrice: number;
    flashSaleSoldQuantity: number;
    flashSaleAvailableQuantity: number;
}

export interface FlashSaleCardProps extends Informative, CompactDisplayFlashSaleProps {
    flashSaleStartAt: string;
    flashSaleEndAt: string;
}

export interface ProductDetail extends FlashSaleCardProps, ProductCardProps, Types {
    ratingCount: number;
    category: string;
    description: string;
    inStockQuantity: number;
    status: ProductStatus;
    specs: Record<string, string>;
    variants: ProductVariant[];
}

type ProductStatus = "New" | "Used"

export type Brand = {
   id: string
   name?: string
   description?: string
   logo?: string
}

export type RawProductVariant = {
   price: string
   stockQuantity: string
   images?: string[]
   sku?: string
   attributes?: Record<string, string | number | boolean>
}


export type ProductVariant = RawProductVariant & {
   images:string[]
   coverImage: string
   id: string
}

// Variant selection types
export type SelectedVariant = Record<string, string>

export type VariantOptionValue = {
   id: string
   value: string
   label: string
   images?: string[]
   available: boolean
   disabled: boolean
}

export type VariantOption = {
   id: string
   name: string
   label: string
   type: 'color' | 'size' | 'text'
   values: VariantOptionValue[]
}

export type VariantPrice = {
   originalPrice: number
   salePrice: number
   discount?: {
      percentage: number
      amount: number
   }
}

export type VariantInventory = {
   available: number
   reserved: number
   total: number
}

export type VariantSelectionState = {
   selectedVariant: SelectedVariant
   currentVariant: ProductVariant | null
   isValid: boolean
}

export type GetProductResponse = {
   content: Types[]
   pageNumber: number
   pageSize: number
   totalElements: number
   totalPages: number
}

export type CreateProductResponse = Types & {
   variants: ProductVariant[]
}

