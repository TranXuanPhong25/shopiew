import {IDisplayable, Informative} from "@/interfaces/Displayable";
interface ProductSpecifications {
    [key: string]: string;
}
export interface ProductCardProps  extends  IDisplayable,Informative{
    salePrice: number;
    soldNumber: number;
    soldAddress: string;
}
export interface CompactDisplayFlashSaleProps extends IDisplayable {
    flashSalePrice: number;
    flashSaleSoldQuantity: number;
    flashSaleAvailableQuantity: number;
}

export interface FlashSaleCardProps extends Informative,CompactDisplayFlashSaleProps {
    flashSaleStartAt: string;
    flashSaleEndAt: string;
}

export interface ProductDetail extends FlashSaleCardProps,ProductCardProps {
    ratingCount: number;
    category: string;
    description: string;
    specifications: ProductSpecifications[];
}
