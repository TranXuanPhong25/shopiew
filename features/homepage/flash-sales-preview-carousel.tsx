"use client";
import ProductCarousel from "@/features/product/product-carousel";
import * as React from "react";
import {CompactDisplayFlashSaleProps} from "@/interfaces/product";
import CompactFlashSaleProductCard from "@/features/product/card/compact-flash-sale-product-card";
import CountDownClock from "@/features/homepage/count-down-clock";
import {ChevronRight} from "lucide-react";

const products: CompactDisplayFlashSaleProps[] = [
    {
        id: 1,
        flashSalePrice: 250000,
        originalPrice: 300000,
        imageUrl: "https://placehold.co/400x400.png",
        flashSaleSoldQuantity: 100,
        flashSaleAvailableQuantity: 500
    },
    {
        id: 2,
        flashSalePrice: 77000,
        originalPrice: 100000,
        imageUrl: "https://placehold.co/400x400.png",
        flashSaleSoldQuantity: 0,
        flashSaleAvailableQuantity: 13
    },
    {
        id: 3,
        flashSalePrice: 34623,
        originalPrice: 40000,
        imageUrl: "https://placehold.co/400x400.png",
        flashSaleSoldQuantity: 10,
        flashSaleAvailableQuantity: 45
    },
    {
        id: 4,
        flashSalePrice: 23454,
        originalPrice: 30000,
        imageUrl: "https://placehold.co/400x400.png",
        flashSaleSoldQuantity: 10,
        flashSaleAvailableQuantity: 13
    },
    {
        id: 5,
        flashSalePrice: 234234,
        originalPrice: 300000,
        imageUrl: "https://placehold.co/400x400.png",
        flashSaleSoldQuantity: 10,
        flashSaleAvailableQuantity: 17
    },
    {
        id: 6,
        flashSalePrice: 2345234,
        originalPrice: 3000000,
        imageUrl: "https://placehold.co/400x400.png",
        flashSaleSoldQuantity: 10,
        flashSaleAvailableQuantity: 71
    },
    {
        id: 7,
        flashSalePrice: 12753,
        originalPrice: 20000,
        imageUrl: "https://placehold.co/400x400.png",
        flashSaleSoldQuantity: 100,
        flashSaleAvailableQuantity: 347
    },
    {
        id: 8,
        flashSalePrice: 282484,
        originalPrice: 300000,
        imageUrl: "https://placehold.co/400x400.png",
        flashSaleSoldQuantity: 100,
        flashSaleAvailableQuantity: 34
    },
    {
        id: 9,
        flashSalePrice: 250000,
        originalPrice: 300000,
        imageUrl: "https://placehold.co/400x400.png",
        flashSaleSoldQuantity: 100,
        flashSaleAvailableQuantity: 264
    },
    {
        id: 10,
        flashSalePrice: 250000,
        originalPrice: 300000,
        imageUrl: "https://placehold.co/400x400.png",
        flashSaleSoldQuantity: 100,
        flashSaleAvailableQuantity: 112
    }
]
export default function FlashSalesPreviewCarousel() {
    const targetDate = new Date("2025-12-31T23:59:59");
    return (
        <div className="w-full overflow-x-auto bg-white pb-4 pt-2 rounded-2xl shadow-sm px-4 my-4">
            <section className="container mx-auto">
                <header className="flex justify-between items-center mb-2">
                    <h1 className="text-3xl font-bold text-red-500">
                        Flash Sales
                    </h1>
                    <CountDownClock targetDate={targetDate}/>
                    <span className="font-semibold text-red-400 flex">See all <ChevronRight/></span>
                </header>
                <ProductCarousel>
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex-[0_0_100%] min-[400px]:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_16%] px-2 "
                        >
                            <CompactFlashSaleProductCard product={product}/>
                        </div>
                    ))}
                </ProductCarousel>

            </section>
        </div>
    )
}