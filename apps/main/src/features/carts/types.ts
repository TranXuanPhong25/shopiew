import { ProductVariant } from "../products/types";

export type CartItem = {
   productVariant: ProductVariant;
   quantity: number;
};
