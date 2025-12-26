import { ProductVariant, Shop } from "../products/types";

export type CartItem = {
   productVariant: ProductVariant;
   quantity: number;
   shopID: string;
};

export type CartSummaryResponse = {
   totalItems: number;
}

export type GetCartResponse = {
   items: CartItem[];
   shops: Shop[];
}

export type CartItemPayload = {
   productVariantID: number;
   quantity?: number;
   shopID: string;
}