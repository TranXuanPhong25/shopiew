"use client";
import {ProductsTable} from "@/features/products/components/collections/products-table";

import {useAuth} from "@/features/auth";
import {Skeleton} from "@/components/ui/skeleton";
import {useProductCollection} from "./hook";

const ProductCollection = () => {
   const { loading: isGettingShopInfo, shop } = useAuth();
   const {
      products,
      page,
      totalElements,
      totalPages,
      isLoading,
      firstPage,
      lastPage,
      nextPage,
      prevPage,
      handleChangeSize,
      size,
      refetch
   } = useProductCollection(shop?.id || "");
   if (isGettingShopInfo) {
      return <Skeleton className="h-screen w-full" />;
   }
   return (
      <>
         <ProductsTable
            products={products}
            pageNumber={page}
            pageSize={size}
            totalElements={totalElements}
            totalPages={totalPages}
            isLoading={isLoading}
            firstPage={firstPage}
            lastPage={lastPage}
            nextPage={nextPage}
            prevPage={prevPage}
            handleChangeSize={handleChangeSize}
            refetchData={refetch}
         />
      </>
   )
}

export default ProductCollection;