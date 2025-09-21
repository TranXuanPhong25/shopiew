import { notFound } from "next/navigation";

import ProductImages from "@/features/products/detail/product-image";
import RatingStars from "@/components/ui/rating-stars";
import ProductAction from "@/features/products/detail/product-action";
import ProductSpecifications from "@/features/products/detail/product-specifications";
import CustomerReviews from "@/features/products/detail/customer-review/customer-reviews";
import ProductDescription from "@/features/products/detail/product-description";
import ShopInfoCard from "@/features/products/detail/shop-info-card";
import ProductService from "@/features/products/service";
import ProductBreadcrumb from "@/features/products/detail/product-breadcrumb";
export default async function ProductPage({ params }: { params: Promise<{ product_id: string }> }) {
    const { product_id } = await params;
    if (!product_id) {
        return notFound();
    }
    const product = await ProductService.getProductById(product_id);
    console.log(product)
    return (
        <div className="max-w-7xl my-4 mx-auto">
            <ProductBreadcrumb product={product} />
            <div className="sm:flex relative">
                <div className=" flex-1">
                    <div className=" bg-white rounded-2xl shadow-sm p-4">
                        <div className="sm:flex ">
                            <ProductImages />
                            <div className={"flex-1 sm:ml-4"}>
                                <h1 className="text-lg">
                                    {product.name}
                                </h1>

                                <div
                                    className="flex items-center mb-2 hover:bg-gray-50/10 w-fit p-2 -mx-2 rounded-md ">
                                    <span
                                        className="ml-3 text-lg">{3.15}
                                    </span>
                                    <a href="#">
                                        <RatingStars rating={3} />
                                    </a>
                                    <span
                                        className="text-sm text-gray-600 dark:text-gray-300">({31513})
                                    </span>
                                    <span className="ml-2 opacity-50">|</span>
                                    <span
                                        className="ml-2 font-sans  text-sm">352 sold</span>
                                </div>


                                <div className="flex items-center space-x-2 bg-orange-50 p-2 rounded-md mb-4">
                                    <span className="text-3xl font-bold text-red-400">1.500.000đ</span>
                                    <span className="text-gray-500 line-through">2.000.000đ</span>
                                    <span className="text-red-500">-25%</span>
                                </div>
                                <div className="flex items-center mb-4">
                                    <h2>
                                        Shop coupons
                                    </h2>
                                    <div className="ml-2 flex gap-2 text-red-500 font-bold text-sm">
                                        <span className="bg-red-200/80 px-2 py-1 rounded-sm ">
                                            5% OFF
                                        </span>
                                        <span className="bg-red-200/80 px-2 py-1 rounded-sm ">
                                            5k OFF
                                        </span>
                                        <span className="bg-red-200/80 px-2 py-1 rounded-sm ">
                                            7% OFF
                                        </span>
                                    </div>
                                </div>

                                <ShopInfoCard />

                            </div>
                        </div>


                    </div>
                    <div className="bg-white rounded-2xl shadow-sm  mt-4">
                        <ProductSpecifications specs={product.specs} />
                        <ProductDescription description={product.description} />
                        <CustomerReviews />
                    </div> 
                </div>

                <div className="sticky top-24 w-[280px] ml-0 sm:ml-4 bg-white rounded-2xl shadow-sm p-4 h-fit">
                    <ProductAction />
                </div>
            </div>

        </div>
    );

}
