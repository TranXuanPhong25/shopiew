import { useProductPageContext } from "../context";
import ProductAction from "@/features/products/components/product-action";
import ProductSpecifications from "@/features/products/components/product-details/product-specifications";
import CustomerReviews from "@/features/products/components/customer-review/customer-reviews";
import ProductDescription from "@/features/products/components/product-details/product-description";
import ShopInfoCard from "@/features/products/components/product-details/shop-info-card";
import ProductBreadcrumb from "@/features/products/components/product-breadcrumb";
import SaleInformations from "@/features/products/components/sale-informations/sale-informations";
export default function ProductPageContent() {
    const {
        product,
        isLoading,
        isError,
        error,
        isSuccess,
    } = useProductPageContext();
    // Loading state
    if (isLoading) {
        return (
            <div className="max-w-7xl my-4 mx-auto">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-96 bg-gray-200 rounded"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="max-w-7xl my-4 mx-auto">
                <div className="text-center py-12">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
                    <p className="text-gray-600 mb-4">
                        {error?.message || 'The product you are looking for could not be found.'}
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Success state with product data
    if (!isSuccess || !product) {
        return null;
    }
    return (
        <div className="max-w-7xl my-4 mx-auto">
            <ProductBreadcrumb />
            <div className="sm:flex relative">
                <div className=" flex-1">
                    <SaleInformations/>

                    <div className="bg-white rounded-2xl shadow-sm  mt-4">
                        <ShopInfoCard />
                        <ProductSpecifications />
                        <ProductDescription />
                        <CustomerReviews />
                    </div>
                </div>

                <div className="sticky top-24 w-[280px] ml-0 sm:ml-4 bg-white rounded-2xl shadow-sm p-4 h-fit">
                    <ProductAction/>
                </div>
            </div>

        </div>
    );

}
