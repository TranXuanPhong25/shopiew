import {ProductsService} from "@/features/products/service";
import {useQuery} from "@tanstack/react-query";
import {useState} from "react";
import {toast} from "sonner";

const useCategorySelection = () => {
   const [selectedCategory, setSelectedCategory] = useState<string>("");
   const [path, setPath] = useState<string[]>([]);
   const resetPath = () => {
      setPath([]);
      setSelectedCategory("");
   };
   const pushToPath = (category: string, isShift: boolean) => {
      const [id, name] = category.split("-");

      setPath((prevPath) => {
         if (isShift) {
            return prevPath.slice(0, prevPath.length - 1);
         }
         const newPath = [...prevPath, name];
         return newPath;
      });

      setSelectedCategory(id);
   };
   return {
      resetPath,
      selectedCategory,
      path,
      pushToPath
   };
}

const useGetCategoryAndChildren = (categoryId: string) => {
   const { isLoading, data: categoryAndChildren } = useQuery({
      queryKey: ["categoryAndChildren", categoryId],
      queryFn: async () => {
         try {
            const response = await ProductsService.getCategoryAndChildren(categoryId);
            return response;
         } catch (error) {
            if (error instanceof Error) {
               toast.error(error.message);
            } else {
               toast.error("An unexpected error occurred while fetching child categories.");
            }
            throw error; // Re-throw to handle it in the component`
         }
      },
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
   });
   return {
      isLoading,
      categoryAndChildren,
   };
}
export {
   useCategorySelection,
   useGetCategoryAndChildren,
};