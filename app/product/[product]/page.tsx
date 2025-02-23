import {notFound} from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import ProductImages from "@/components/ui/product/detail/product-image";
import RatingStars from "@/components/ui/rating-stars";
import ProductAction from "@/components/ui/product/detail/product-action";
import {Button} from "@/components/ui/button";
import ProductSpecifications from "@/components/ui/product/detail/product-specifications";
import CustomerReviews from "@/components/ui/product/detail/customer-review/customer-reviews";
import ProductDescription from "@/components/ui/product/detail/product-description";
import ShopInfoCard from "@/components/ui/product/detail/shop-info-card";

export default async function ProductPage({params}: { params: Promise<{ product: string }> }) {
    const {product} = await params;
    if (!product) {
        return notFound();
    }

    return (
        <div className="max-w-7xl my-4 mx-auto">
            <Breadcrumb className=" px-4 mb-4">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/" className="text-custom-1/80 hover:text-custom-1">Shopiew</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/components"
                                  className="text-custom-1/80 hover:text-custom-1">Components</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <BreadcrumbItem className="flex-1">
                        <BreadcrumbPage className="line-clamp-1 text-ellipsis">
                            Sét áo blazer dáng suông ve mèo 5B07.2408K, Chân váy đè dây gấu A 4S27.2408K th
                            mmmmmmmmmmmmmmmmmmmiết kế bởi JM Dress Design b;a bla bal
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="sm:flex relative">
                <div className=" flex-1">
                    <div className=" bg-white rounded-2xl shadow-sm p-4">
                        <div className="sm:flex ">
                            <ProductImages/>
                            <div className={"flex-1 sm:ml-4"}>
                                <h1 className="text-lg">
                                    Sét áo blazer dáng suông ve mèo 5B07.2408K, Chân váy đè dây gấu A 4S27.2408K thiết
                                    kế bởi JM Dress Design b;a bla bal

                                </h1>

                                <div
                                    className="flex items-center mb-2 hover:bg-gray-50/10 w-fit p-2 -mx-2 rounded-md ">
                                <span
                                    className="ml-3 text-lg">{3.15}
                                </span>
                                    <a href="#">
                                        <RatingStars rating={3}/>
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

                                <ShopInfoCard/>

                            </div>
                        </div>


                    </div>
                    <div className="bg-white rounded-2xl shadow-sm  mt-4 h-[100vh]">
                        <ProductSpecifications/>
                        <ProductDescription/>
                        <CustomerReviews/>
                    </div>
                </div>

                <div className="sticky top-24 w-[280px] ml-0 sm:ml-4 bg-white rounded-2xl shadow-sm p-4 h-fit">
                    <ProductAction/>
                </div>
            </div>

        </div>
    );

}
