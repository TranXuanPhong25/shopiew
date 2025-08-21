import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductsService } from "@/features/products/service";
import { toast } from "sonner";
import { useState, useEffect } from "react";

const useGetProductsByShopId = (shopId: string, page: number, size: number) => {
   const { isLoading, data, refetch } = useQuery({
      queryKey: ["products", shopId, page, size],
      queryFn: async () => {
         try {
            const response = await ProductsService.getProductsByShopId(shopId, page, size);
            return response;
         } catch (error) {
            if (error instanceof Error) {
               toast.error(error.message);
            } else {
               toast.error("An unexpected error occurred while fetching products.");
            }
            throw error; // Re-throw to handle it in the component
         }
      },
      refetchOnWindowFocus: true,
      refetchInterval: 1000 * 60 * 5, // 5 minutes
      enabled: !!shopId, // Only run the query if shopId is available
      retry: 1,
      refetchOnReconnect: false,
   });
   return {
      isLoading,
      data,
      refetch
   };
}

const useProductCollection = (shopId: string) => {
   const [page, setPage] = useState(0);
   const [size, setSize] = useState(10);
   const {data , isLoading, refetch } = useGetProductsByShopId(shopId, page, size);
   const [totalElements, setTotalElements] = useState(0);
   useEffect(() => {
      if (data && data.totalElements !== undefined ) {
         setTotalElements(data.totalElements);
      }
   }, [data]);
   const handleChangeSize = (newSize: number) => {
      setSize(newSize);
      setPage(0); // Reset to first page when size changes
   }
   const nextPage = () => {
      setPage((prev) => prev + 1);
   }

   const prevPage = () => {
      setPage((prev) => Math.max(prev - 1, 0));
   }
   
   const lastPage = () => {
      if (data?.totalPages) {
         setPage(data.totalPages-1);
      }
   }

   const firstPage = () => {
      setPage(0);
   }

   return {
      products: data?.content || [],
      totalElements: totalElements,
      totalPages: data?.totalPages || 0,
      pageSize: data?.pageSize || 0,
      pageNumber: data?.pageNumber || 0,
      isLoading,
      page,
      size,
      refetch,
      handleChangeSize,
      nextPage,
      prevPage,
      lastPage,
      firstPage
   };
}

const useDeleteProducts = () => {
   const queryClient = useQueryClient();
   const { mutateAsync, isPending, isError, error } = useMutation({
      mutationKey: ["deleteProducts"],
      mutationFn: async (productIds: string[]) => {

         try {
            return await ProductsService.deleteProductByIds(productIds);
         } catch (error) {
            throw error; // Re-throw to handle it in the component
         }
      },
      onError: (error) => {
         toast.error(`Failed to delete products: ${error instanceof Error ? error.message : "Unknown error"}`);
      },
      onSuccess: () => {
         toast.success("Products deleted successfully");
         queryClient.invalidateQueries({queryKey: ["products"] });
      }
   });
   
   return { deleteProducts: mutateAsync, isDeleting: isPending, isError, error };
}

export {
   useProductCollection,
   useGetProductsByShopId,
   useDeleteProducts
}