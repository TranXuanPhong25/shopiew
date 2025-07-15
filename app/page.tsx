"use client"

import {EventBannerCarousel} from "@/features/homepage/event-banner-carousel";
import CategoriesGrid from "@/features/homepage/categories-grid";
import FlashSalesPreviewCarousel from "@/features/homepage/flash-sales-preview-carousel";
import ProductDiscoveryGrid from "@/features/homepage/product-discovery-grid";

export default function HomePage() {

    return (
        <div className="max-w-7xl mx-auto">
            <EventBannerCarousel/>
            <CategoriesGrid/>
            <FlashSalesPreviewCarousel/>
            <ProductDiscoveryGrid/>
        </div>


    );
}
