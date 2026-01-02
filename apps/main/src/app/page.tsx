"use client";

import { EventBannerCarousel } from "@/features/promotions/components/event-banner-carousel";
import CategoriesGrid from "@/features/homepage/components/categories-grid";
import FlashSalesPreviewCarousel from "@/features/homepage/components/flash-sales-preview-carousel";
import ProductDiscoveryGrid from "@/features/homepage/components/product-discovery-grid";

export default function HomePage() {
	return (
		<div className="max-w-7xl mx-auto">
			<EventBannerCarousel />
			<CategoriesGrid />
			<FlashSalesPreviewCarousel />
			<ProductDiscoveryGrid />
		</div>
	);
}
