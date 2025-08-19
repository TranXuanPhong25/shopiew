import NewProductForm from "@/features/products/components/create/new-product-form";
import VerticalSectionsNav from "@/components/navigations/vertical-sections-nav";
import { Metadata } from "next/types";

const ProductsManagementPage = () => {
   return (
      <div className="w-full mt-4 gap-4 container mx-auto">
         <div className="flex-1 mx-auto ">
            <NewProductForm />
         </div>
      </div>
   );
}

export const metadata: Metadata = {
   title: 'Create new product |Shopiew Seller',
};

export default ProductsManagementPage;