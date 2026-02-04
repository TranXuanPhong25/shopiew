"use client";
import ProductCarousel from "@/features/homepage/components/product-carousel";
import * as React from "react";
import CompactFlashSaleProductCard from "@/features/homepage/components/card/compact-flash-sale-product-card";
import CountDownClock from "@/features/homepage/components/count-down-clock";
import { ChevronRight, Zap } from "lucide-react";
import { CompactDisplayFlashSaleProps } from "@/features/products/types";
import Link from "next/link";

const products: CompactDisplayFlashSaleProps[] = [
	{
		id: 1,
		flashSalePrice: 250000,
		originalPrice: 300000,
		imageUrl: "https://placehold.co/400x400.png",
		flashSaleSoldQuantity: 100,
		flashSaleAvailableQuantity: 500,
	},
	{
		id: 2,
		flashSalePrice: 77000,
		originalPrice: 100000,
		imageUrl: "https://placehold.co/400x400.png",
		flashSaleSoldQuantity: 0,
		flashSaleAvailableQuantity: 13,
	},
	{
		id: 3,
		flashSalePrice: 34623,
		originalPrice: 40000,
		imageUrl: "https://placehold.co/400x400.png",
		flashSaleSoldQuantity: 10,
		flashSaleAvailableQuantity: 45,
	},
	{
		id: 4,
		flashSalePrice: 23454,
		originalPrice: 30000,
		imageUrl: "https://placehold.co/400x400.png",
		flashSaleSoldQuantity: 10,
		flashSaleAvailableQuantity: 13,
	},
	{
		id: 5,
		flashSalePrice: 234234,
		originalPrice: 300000,
		imageUrl: "https://placehold.co/400x400.png",
		flashSaleSoldQuantity: 10,
		flashSaleAvailableQuantity: 17,
	},
	{
		id: 6,
		flashSalePrice: 2345234,
		originalPrice: 3000000,
		imageUrl: "https://placehold.co/400x400.png",
		flashSaleSoldQuantity: 10,
		flashSaleAvailableQuantity: 71,
	},
	{
		id: 7,
		flashSalePrice: 12753,
		originalPrice: 20000,
		imageUrl: "https://placehold.co/400x400.png",
		flashSaleSoldQuantity: 100,
		flashSaleAvailableQuantity: 347,
	},
	{
		id: 8,
		flashSalePrice: 282484,
		originalPrice: 300000,
		imageUrl: "https://placehold.co/400x400.png",
		flashSaleSoldQuantity: 100,
		flashSaleAvailableQuantity: 34,
	},
	{
		id: 9,
		flashSalePrice: 250000,
		originalPrice: 300000,
		imageUrl: "https://placehold.co/400x400.png",
		flashSaleSoldQuantity: 100,
		flashSaleAvailableQuantity: 264,
	},
	{
		id: 10,
		flashSalePrice: 250000,
		originalPrice: 300000,
		imageUrl: "https://placehold.co/400x400.png",
		flashSaleSoldQuantity: 100,
		flashSaleAvailableQuantity: 112,
	},
];

export default function FlashSalesPreviewCarousel() {
	const targetDate = new Date(Date.now() + 86400000); // 24 hours from now;
	return (
		<div className="w-full overflow-hidden bg-gradient-to-r from-sale-500 via-sale-600 to-cta-500 rounded-2xl shadow-lg my-4">
			<div className="px-4 py-4">
				<section className="container mx-auto">
					<header className="flex flex-wrap justify-between items-center gap-3 mb-4">
						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
								<Zap className="w-5 h-5 text-yellow-300 fill-yellow-300 animate-pulse" aria-hidden="true" />
								<h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
									Flash Sale
								</h2>
							</div>
							<CountDownClock targetDate={targetDate} />
						</div>
						<Link 
							href="/flash-sales"
							className="flex items-center gap-1 text-white/90 hover:text-white font-medium text-sm transition-colors group"
						>
							See All Deals
							<ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
						</Link>
					</header>
					<ProductCarousel>
						{products.map((product) => (
							<div
								key={product.id}
								className="flex-[0_0_100%] min-[400px]:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_16%] px-1.5">
								<CompactFlashSaleProductCard product={product} />
							</div>
						))}
					</ProductCarousel>
				</section>
			</div>
		</div>
	);
}
