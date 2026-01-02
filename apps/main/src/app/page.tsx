import { EventBannerCarousel } from "@/features/promotions/components/event-banner-carousel";
import CategoriesGridServer from "@/features/homepage/components/categories-grid-server";
import FlashSalesPreviewCarousel from "@/features/homepage/components/flash-sales-preview-carousel";
import ProductDiscoveryGrid from "@/features/homepage/components/product-discovery-grid";

export default function HomePage() {
	return (
		<div className="max-w-7xl mx-auto">
			<EventBannerCarousel />
			<CategoriesGridServer />
			<FlashSalesPreviewCarousel />
			<ProductDiscoveryGrid />
		</div>
	);
}
