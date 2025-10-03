import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import CartService from '@/features/carts/service';
import { apiErrorHandler } from '@/lib/apiErrorHandler';
import { CartItem, CartItemPayload } from '../types';

export const useAddItemToCart = () => {
   const queryClient = useQueryClient();
   
   return useMutation({
      mutationFn: async ({ productVariantID, quantity, shopID }: CartItemPayload): Promise<CartItem> => {
         return await CartService.addToCart({ productVariantID, quantity, shopID });
      },
      onSuccess: (data) => {
         // Update local cart state         
         // Invalidate cart queries to refetch
         queryClient.invalidateQueries({ queryKey: ['cart'] });
         
         // Show success message
         toast.success('Item added to cart');
      },
      onError: (error) => {
         apiErrorHandler(error);
         toast.error('Failed to add item to cart');
      }
   });
};