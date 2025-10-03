import { CartItem } from "@/features/carts/types";
import { ProductVariant, Shop } from "@/features/products/types";

export type CartState = {
   items: CartItem[];
   isLoading: boolean;
   error: string | null;
   lastUpdated: Date | null;
};

export type CartTotals = {
   subtotal: number;
   total: number;
   itemCount: number;
   totalQuantity: number;
};

export type CartActions = {
   // Item management
   addItem: (productVariant: ProductVariant, shop: Shop, quantity?: number) => void;
   removeItem: (variantId: string) => void;
   updateQuantity: (variantId: string, quantity: number) => void;
   clearCart: () => void;
   
   // Utility actions
   isItemInCart: (variantId: string) => boolean;
   getItemQuantity: (variantId: string) => number;
   getItemByVariantId: (variantId: string) => CartItem | undefined;
   
   // State management
   setLoading: (loading: boolean) => void;
   setError: (error: string | null) => void;
   reset: () => void;
};

export type CartStore = CartState & CartTotals & CartActions;

