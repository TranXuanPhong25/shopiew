import { useQuery } from '@tanstack/react-query';
import CartService from '../service';
import { useAuth } from '@/features/auth';
import { GetCartResponse } from '../types';
const useGetCartItemsCount = () => {
   const { user , loading} = useAuth();
   const { data, error, isLoading, refetch } = useQuery({
      queryKey: ['cart','mine', 'total-items'],
      queryFn: async (): Promise<{totalItems: number}> => {
         const cartData = await CartService.getCartItemCount();
         return cartData;
      },
      enabled: !!user,
      refetchOnWindowFocus: false,
      retry: 1,
   });

   return {
      cartData: data,
      isLoading: isLoading || loading,
      error,
      refetch,
   };
};
export default useGetCartItemsCount;