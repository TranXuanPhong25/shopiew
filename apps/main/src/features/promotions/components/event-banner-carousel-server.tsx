import { PromotionService } from "../service";
import { EventBanner } from "../types";
import { EventBannerClient } from "./event-banner-client";
import { getActiveEventBanners } from "@/data/static-promotions";

// Server component để fetch event banners tại build time
export default async function EventBannerCarouselServer() {
	// Fetch event banners tại build time
	let eventBanners: EventBanner[] = [];

	try {
		// Fetch từ API với ISR
		const response = await PromotionService.getActiveEventBanners();
		eventBanners = response || [];
	} catch (error) {
		console.error("Failed to fetch event banners:", error);
	}

	// Nếu không có data từ API, dùng static data
	if (!eventBanners.length) {
		eventBanners = getActiveEventBanners();
	}
	return (
		<div className="relative flex my-4 px-4 bg-white rounded-2xl shadow-sm">
			{/* Pass event banners xuống client component để handle carousel */}
			<EventBannerClient events={eventBanners} />
		</div>
	);
}
