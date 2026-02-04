import { useProductPageContext } from "../context";
import ProductAction from "@/features/products/components/product-action";
import ProductSpecifications from "@/features/products/components/product-details/product-specifications";
import CustomerReviews from "@/features/products/components/customer-review/customer-reviews";
import ProductDescription from "@/features/products/components/product-details/product-description";
import ShopInfoCard from "@/features/products/components/product-details/shop-info-card";
import ProductBreadcrumb from "@/features/products/components/product-breadcrumb";
import SaleInformations from "@/features/products/components/sale-informations/sale-informations";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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
            <div className="max-w-7xl my-4 mx-auto px-4">
                <div className="animate-pulse space-y-4">
                    <div className="h-5 bg-gray-200 rounded-lg w-1/4" />
                    <div className="sm:flex gap-4">
                        <div className="flex-1 space-y-4">
                            <div className="aspect-square bg-gray-200 rounded-2xl" />
                            <div className="h-32 bg-gray-200 rounded-2xl" />
                        </div>
                        <div className="w-[280px] h-[400px] bg-gray-200 rounded-2xl" />
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (isError) {
        return (
            <div className="max-w-7xl my-4 mx-auto px-4">
                <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sale-100 mb-4">
                        <AlertCircle className="w-8 h-8 text-sale-500" aria-hidden="true" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto text-pretty">
                        {error?.message || "The product you're looking for doesn't exist or has been removed."}
                    </p>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/">
                            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    // Success state with product data
    if (!isSuccess || !product) {
        return null;
    }

    return (
        <div className="max-w-7xl my-4 mx-auto px-4">
            <ProductBreadcrumb />
            <div className="sm:flex relative gap-4">
                <div className="flex-1 min-w-0">
                    <SaleInformations/>

                    <div className="bg-white rounded-2xl shadow-sm mt-4 overflow-hidden">
                        <ShopInfoCard />
                        <ProductSpecifications />
                        <ProductDescription />
                        <CustomerReviews />
                    </div>
                </div>

                <div className="sticky top-24 w-full sm:w-[280px] mt-4 sm:mt-0 sm:ml-0 bg-white rounded-2xl shadow-sm p-4 h-fit flex-shrink-0">
                    <ProductAction/>
                </div>
            </div>
        </div>
    );
}
