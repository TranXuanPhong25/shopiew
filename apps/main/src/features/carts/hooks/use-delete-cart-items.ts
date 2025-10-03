import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import CartService from '@/features/carts/service';
import { apiErrorHandler } from '@/lib/apiErrorHandler';
import { CartItem, CartItemPayload } from '../types';

export const useDeleteCartItem = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async (ids: string[]) => {
         return await CartService.deleteCartItem(ids);
      },
      onSuccess: (data) => {
         // // Update local cart state         
         // queryClient.setQueryData(['cart'], (oldData: any) => {
         //    if (!oldData) return;

         //    const updatedItems = oldData.items.map((item: CartItem) =>
         //       item.productVariant.id === data.productVariant.id ? data : item
         //    ); 

         //    return { ...oldData, items: updatedItems };
         // });
         
         // Invalidate cart queries to refetch
         queryClient.invalidateQueries({ queryKey: ['cart'] });
         // Show success message
         toast.success(`Deleted successfully`);
      },
      onError: (error) => {
         apiErrorHandler(error);
         toast.error('Failed to delete item from cart');
      }
   });
};