import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartStore } from './types';
import { CartItem } from '@/features/carts/types';
import { ProductVariant, Shop } from '@/features/products/types';

const initialState = {
   items: [],
   isLoading: false,
   error: null,
   lastUpdated: null,
};

const calculateTotals = (items: CartItem[]) => {
   const subtotal = items.reduce((sum, item) => {
      const price = parseFloat(item.productVariant.price);
      return sum + (price * item.quantity);
   }, 0);

   const itemCount = items.length;
   const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

   return {
      subtotal,
      total: subtotal, // Can be extended for taxes, shipping, etc.
      itemCount,
      totalQuantity,
   };
};

export const useCartStore = create<CartStore>()(

   (set, get) => ({
      // Initial state
      ...initialState,
      ...calculateTotals([]),

      // Item management actions
      addItem: (productVariant: ProductVariant, shop: Shop, quantity = 1) => {
         const state = get();
         const existingItemIndex = state.items.findIndex(
            item => item.productVariant.id === productVariant.id
         );

         let newItems: CartItem[];

         if (existingItemIndex >= 0) {
            // Update existing item quantity
            newItems = state.items.map((item, index) =>
               index === existingItemIndex
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
            );
         } else {
            // Add new item
            newItems = [...state.items, { productVariant, shop, quantity }];
         }

         const totals = calculateTotals(newItems);

         set({
            items: newItems,
            ...totals,
            lastUpdated: new Date(),
            error: null,
         });
      },

      removeItem: (variantId: string) => {
         const state = get();
         const newItems = state.items.filter(
            item => item.productVariant.id !== variantId
         );

         const totals = calculateTotals(newItems);

         set({
            items: newItems,
            ...totals,
            lastUpdated: new Date(),
            error: null,
         });
      },

      updateQuantity: (variantId: string, quantity: number) => {
         if (quantity <= 0) {
            get().removeItem(variantId);
            return;
         }

         const state = get();
         const newItems = state.items.map(item =>
            item.productVariant.id === variantId
               ? { ...item, quantity }
               : item
         );

         const totals = calculateTotals(newItems);

         set({
            items: newItems,
            ...totals,
            lastUpdated: new Date(),
            error: null,
         });
      },

      clearCart: () => {
         set({
            ...initialState,
            ...calculateTotals([]),
            lastUpdated: new Date(),
         });
      },

      // Utility functions
      isItemInCart: (variantId: string) => {
         const state = get();
         return state.items.some(item => item.productVariant.id === variantId);
      },

      getItemQuantity: (variantId: string) => {
         const state = get();
         const item = state.items.find(item => item.productVariant.id === variantId);
         return item?.quantity || 0;
      },

      getItemByVariantId: (variantId: string) => {
         const state = get();
         return state.items.find(item => item.productVariant.id === variantId);
      },

      // State management
      setLoading: (loading: boolean) => {
         set({ isLoading: loading });
      },

      setError: (error: string | null) => {
         set({ error });
      },

      reset: () => {
         set({
            ...initialState,
            ...calculateTotals([]),
         });
      },
   })

);
