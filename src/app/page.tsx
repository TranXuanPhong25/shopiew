"use client"

import {EventBannerCarousel} from "@/src/components/homepage/event-banner-carousel";
import CategoriesGrid from "@/src/components/homepage/categories-grid";
import FlashSalesPreviewCarousel from "@/src/components/homepage/flash-sales-preview-carousel";
import ProductDiscoveryGrid from "@/src/components/homepage/product-discovery-grid";

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
