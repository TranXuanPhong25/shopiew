import { ProductVariant, Shop } from "../products/types";

export type CartItem = {
   productVariant: ProductVariant;
   quantity: number;
   shopId: string;
   };

export type CartSummaryResponse = {
   totalItems: number;
}

export type GetCartResponse = {
   items: CartItem[];
   createdAt: string;
   updatedAt: string;
}

export type CartItemPayload = {
   productVariantID: string;
   quantity: number;
   shopID: string;
}