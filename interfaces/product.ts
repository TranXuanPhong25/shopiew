import {IDisplayable, Informative} from "@/interfaces/Displayable";
interface Product {
    originalPrice: number;
}
interface ProductSpecifications {
    [key: string]: string;
}
export interface ProductCardProps  extends  IDisplayable,Informative{
    salePrice: number;
    soldQuantity: number;
    soldAddress: string;
}
export interface CompactDisplayFlashSaleProps extends IDisplayable ,Product{
    flashSalePrice: number;
    flashSaleSoldQuantity: number;
    flashSaleAvailableQuantity: number;
}

export interface FlashSaleCardProps extends Informative,CompactDisplayFlashSaleProps {
    flashSaleStartAt: string;
    flashSaleEndAt: string;
}

export interface ProductDetail extends FlashSaleCardProps,ProductCardProps ,Product{
    ratingCount: number;
    category: string;
    description: string;
    inStockQuantity:number;
    status: ProductStatus;
    specifications: ProductSpecifications[];
}
type ProductStatus = "New" | "Used"
