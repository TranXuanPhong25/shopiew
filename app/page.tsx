"use client"

import {EventBannerCarousel} from "@/components/homepage/event-banner-carousel";
import CategoriesGrid from "@/components/homepage/categories-grid";
import FlashSalesPreviewCarousel from "@/components/homepage/flash-sales-preview-carousel";
import ProductDiscoveryGrid from "@/components/homepage/product-discovery-grid";

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
