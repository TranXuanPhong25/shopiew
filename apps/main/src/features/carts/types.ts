import { ProductVariant, Shop } from "../products/types";

export type CartItem = {
   productVariant: ProductVariant;
   quantity: number;
   shop: Shop;
   name: string;
};

export type CartSummaryResponse = {
   totalItems: number;
}

export type GetCartResponse = {
   items: CartItem[];
   createdAt: string;
   updatedAt: string;
}