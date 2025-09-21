import {IDisplayable, Informative} from "@/types/Displayable";

interface Product {
    originalPrice: number;
}



export interface ProductCardProps extends IDisplayable, Informative {
    salePrice: number;
    soldQuantity: number;
    soldAddress: string;
}

export interface CompactDisplayFlashSaleProps extends IDisplayable, Product {
    flashSalePrice: number;
    flashSaleSoldQuantity: number;
    flashSaleAvailableQuantity: number;
}

export interface FlashSaleCardProps extends Informative, CompactDisplayFlashSaleProps {
    flashSaleStartAt: string;
    flashSaleEndAt: string;
}

export interface ProductDetail extends FlashSaleCardProps, ProductCardProps, Product {
    ratingCount: number;
    category: string;
    description: string;
    inStockQuantity: number;
    status: ProductStatus;
    specs: Record<string, string>;
}

type ProductStatus = "New" | "Used"
