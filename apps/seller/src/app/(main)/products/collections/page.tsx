
import { Metadata } from "next/types";
import ProductCollection from "@/features/products/components/collections/product-collection";
import SectionWrapper from "@/components/layout/section-wrapper";
const ProductsManagementPage = () => {
   return (
         <div className="w-full mt-4 gap-4 ">
            <SectionWrapper>
               <ProductCollection />
            </SectionWrapper>
         </div>
   );
}

export const metadata: Metadata = {
   title: 'Products Collection |Shopiew Seller',
};

export default ProductsManagementPage;