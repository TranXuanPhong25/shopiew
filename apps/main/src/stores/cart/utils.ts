import { CartItem } from '@/features/carts/types';
import { ProductVariant, Shop } from '@/features/products/types';

/**
 * Format price for display
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Calculate item total price
 */
export const calculateItemTotal = (item: CartItem): number => {
  return parseFloat(item.productVariant.price) * item.quantity;
};

/**
 * Check if item is available based on stock
 */
export const isItemAvailable = (productVariant: ProductVariant, requestedQuantity: number = 1): boolean => {
  const stockQuantity = parseInt(productVariant.stockQuantity || '0');
  return stockQuantity >= requestedQuantity;
};

/**
 * Get maximum available quantity for an item
 */
export const getMaxAvailableQuantity = (productVariant: ProductVariant): number => {
  return parseInt(productVariant.stockQuantity || '0');
};

/**
 * Validate cart item quantity
 */
export const validateQuantity = (quantity: number, maxQuantity?: number): {
  isValid: boolean;
  error?: string;
} => {
  if (quantity <= 0) {
    return { isValid: false, error: 'Quantity must be greater than 0' };
  }

  if (maxQuantity && quantity > maxQuantity) {
    return { isValid: false, error: `Maximum quantity available is ${maxQuantity}` };
  }

  return { isValid: true };
};

/**
 * Create a unique cart item key
 */
export const createCartItemKey = (productVariant: ProductVariant): string => {
  return `cart-item-${productVariant.id}`;
};

/**
 * Calculate cart summary statistics
 */
export const calculateCartSummary = (items: CartItem[]) => {
  const summary = items.reduce(
    (acc, item) => {
      const itemTotal = calculateItemTotal(item);
      return {
        totalItems: acc.totalItems + 1,
        totalQuantity: acc.totalQuantity + item.quantity,
        subtotal: acc.subtotal + itemTotal,
        totalProducts: acc.totalProducts + item.quantity,
      };
    },
    {
      totalItems: 0,
      totalQuantity: 0,
      subtotal: 0,
      totalProducts: 0,
    }
  );

  return {
    ...summary,
    averageItemPrice: summary.totalItems > 0 ? summary.subtotal / summary.totalQuantity : 0,
    isEmpty: summary.totalItems === 0,
  };
};

/**
 * Group cart items by shop
 */
export const groupCartItemsByShop = (items: CartItem[]): Record<string, CartItem[]> => {
  return items.reduce((groups, item) => {
    const shopId = item.shop.id;
    if (!groups[shopId]) {
      groups[shopId] = [];
    }
    groups[shopId].push(item);
    return groups;
  }, {} as Record<string, CartItem[]>);
};

/**
 * Get unique shops from cart items
 */
export const getUniqueShops = (items: CartItem[]): Shop[] => {
  const shopMap = new Map<string, Shop>();
  items.forEach(item => {
    shopMap.set(item.shop.id, item.shop);
  });
  return Array.from(shopMap.values());
};

/**
 * Calculate total by shop
 */
export const calculateTotalByShop = (items: CartItem[], shopId: string): number => {
  return items
    .filter(item => item.shop.id === shopId)
    .reduce((total, item) => total + calculateItemTotal(item), 0);
};

/**
 * Get cart summary by shop
 */
export const getCartSummaryByShop = (items: CartItem[]) => {
  const groupedItems = groupCartItemsByShop(items);
  const shops = getUniqueShops(items);
  
  return shops.map(shop => ({
    shop,
    items: groupedItems[shop.id] || [],
    itemCount: groupedItems[shop.id]?.length || 0,
    totalQuantity: groupedItems[shop.id]?.reduce((sum, item) => sum + item.quantity, 0) || 0,
    subtotal: calculateTotalByShop(items, shop.id),
  }));
};

/**
 * Group cart items by category or any other property
 */
export const groupCartItems = <T extends keyof CartItem>(
  items: CartItem[],
  groupBy: T
): Record<string, CartItem[]> => {
  return items.reduce((groups, item) => {
    const key = String(item[groupBy]);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, CartItem[]>);
};

/**
 * Check if cart needs update (e.g., due to price changes)
 */
export const needsCartUpdate = (
  cartItem: CartItem,
  currentProductVariant: ProductVariant
): boolean => {
  return (
    cartItem.productVariant.price !== currentProductVariant.price ||
    parseInt(cartItem.productVariant.stockQuantity || '0') < cartItem.quantity
  );
};

/**
 * Sanitize cart items (remove out of stock, update prices, etc.)
 */
export const sanitizeCartItems = (
  items: CartItem[],
  currentProductVariants: ProductVariant[],
  currentShops?: Shop[]
): CartItem[] => {
  const variantMap = new Map(
    currentProductVariants.map(variant => [variant.id, variant])
  );
  
  const shopMap = currentShops ? new Map(
    currentShops.map(shop => [shop.id, shop])
  ) : null;

  return items
    .map(item => {
      const currentVariant = variantMap.get(item.productVariant.id);
      if (!currentVariant) {
        return null; // Remove items that no longer exist
      }

      // Check if shop still exists (if shop data is provided)
      const currentShop = shopMap?.get(item.shop.id) || item.shop;

      // Update item with current variant and shop data
      const updatedItem: CartItem = {
        ...item,
        productVariant: currentVariant,
        shop: currentShop,
      };

      // Adjust quantity if stock is insufficient
      const maxQuantity = getMaxAvailableQuantity(currentVariant);
      if (updatedItem.quantity > maxQuantity) {
        updatedItem.quantity = Math.max(0, maxQuantity);
      }

      return updatedItem;
    })
    .filter((item): item is CartItem => item !== null && item.quantity > 0);
};