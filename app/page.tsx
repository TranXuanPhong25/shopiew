"use client"

import {EventBannerCarousel} from "@/components/homepage/event-banner-carousel";
import CategoriesGrid from "@/components/homepage/categories-grid";
import FlashSalesPreviewCarousel from "@/components/homepage/flash-sales-preview-carousel";

export default function HomePage() {

    return (
        <div className="h-[200vh] max-w-7xl mx-auto">
            <EventBannerCarousel/>
            <CategoriesGrid/>
            <FlashSalesPreviewCarousel/>
        </div>


    );
}
