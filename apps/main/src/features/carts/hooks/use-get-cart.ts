import { useQuery } from '@tanstack/react-query';
import CartService from '../service';
import { useAuth } from '@/features/auth';
import { GetCartResponse } from '../types';
const useGetCart = () => {
   const { user } = useAuth();
   const { data, error, isLoading, refetch } = useQuery({
      queryKey: ['cart','mine'],
      queryFn: async (): Promise<GetCartResponse> => {
         const cartData = await CartService.getMyCart();
         return cartData;
      },
      enabled: !!user,
      refetchOnWindowFocus: false,
      retry: 1,
   });

   return {
      cartData: data,
      isLoading,
      error,
      refetch,
   };
};
export default useGetCart;