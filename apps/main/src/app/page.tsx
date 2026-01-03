import EventBannerCarouselServer from "@/features/promotions/components/event-banner-carousel-server";
import CategoriesGridServer from "@/features/homepage/components/categories-grid-server";
import FlashSalesPreviewCarousel from "@/features/homepage/components/flash-sales-preview-carousel";
import ProductDiscoveryGrid from "@/features/homepage/components/product-discovery-grid";

export default function HomePage() {
	return (
		<div className="max-w-7xl mx-auto">
			<EventBannerCarouselServer />
			<CategoriesGridServer />
			<FlashSalesPreviewCarousel />
			<ProductDiscoveryGrid />
		</div>
	);
}
