import { useCartStore } from './store';
import { ProductVariant, Shop } from '@/features/products/types';
import { useCallback } from 'react';

/**
 * Hook for cart item management actions
 */
export const useCartActions = () => {
  const {
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setLoading,
    setError,
  } = useCartStore();

  const addToCart = useCallback((productVariant: ProductVariant, shop: Shop, quantity = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      // Validate stock quantity if available
      const stockQuantity = parseInt(productVariant.stockQuantity || '0');
      if (stockQuantity > 0 && quantity > stockQuantity) {
        throw new Error(`Only ${stockQuantity} items available in stock`);
      }

      addItem(productVariant, shop, quantity);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to add item to cart';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [addItem, setLoading, setError]);

  const removeFromCart = useCallback((variantId: string) => {
    try {
      setLoading(true);
      setError(null);
      removeItem(variantId);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove item from cart';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [removeItem, setLoading, setError]);

  const updateCartQuantity = useCallback((variantId: string, quantity: number) => {
    try {
      setLoading(true);
      setError(null);
      
      if (quantity < 0) {
        throw new Error('Quantity cannot be negative');
      }

      updateQuantity(variantId, quantity);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update item quantity';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [updateQuantity, setLoading, setError]);

  const clearCartItems = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      clearCart();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to clear cart';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [clearCart, setLoading, setError]);

  return {
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCartItems,
  };
};

/**
 * Hook for cart data and computed values
 */
export const useCartData = () => {
  const {
    items,
    subtotal,
    total,
    itemCount,
    totalQuantity,
    isLoading,
    error,
    lastUpdated,
    isItemInCart,
    getItemQuantity,
    getItemByVariantId,
  } = useCartStore();

  return {
    items,
    subtotal,
    total,
    itemCount,
    totalQuantity,
    isLoading,
    error,
    lastUpdated,
    isEmpty: itemCount === 0,
    isItemInCart,
    getItemQuantity,
    getItemByVariantId,
  };
};

/**
 * Hook that combines both cart data and actions
 */
export const useCart = () => {
  const cartData = useCartData();
  const cartActions = useCartActions();

  return {
    ...cartData,
    ...cartActions,
  };
};