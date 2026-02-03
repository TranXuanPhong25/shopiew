import { EventBanner, PromoBar } from "../features/promotions/types";

// Static event banners data - sẽ được build vào bundle
export const STATIC_EVENT_BANNERS: EventBanner[] = [
	{
		id: "1",
		title: "Flash Sale 12.12",
		imageUrl:
			"https://picsum.photos/seed/92f1c883-4ec0-4ee8-1111-8f57a9f6e134-0/640/480",
		position: "main",
		eventType: "flash_sale",
		isActive: true,
		startTime: new Date().toISOString(),
		endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
		priority: 1,
		linkUrl: "/flash-sale",
	},
	{
		id: "2",
		title: "Free Shipping Weekend",
		imageUrl:
			"https://picsum.photos/seed/92f1c883-4ec0-4ee8-1111-8fhgj9f6e134-0/640/480",
		position: "main",
		eventType: "other",
		isActive: true,
		startTime: new Date().toISOString(),
		endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
		priority: 2,
		linkUrl: "/free-shipping",
	},
	{
		id: "3",
		title: "New Year Sale 2026",
		imageUrl:
			"https://picsum.photos/seed/9121c883-4ec0-4ee8-1111-8fhgj9f6e134-0/640/480",
		position: "main",
		eventType: "new_year",
		isActive: true,
		startTime: new Date().toISOString(),
		endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
		priority: 3,
		linkUrl: "/new-year-sale",
	},
	{
		id: "4",
		title: "Fashion Week Special",
		imageUrl:
			"https://picsum.photos/seed/92f1c883-xxxx-4ee8-1111-8fhgj9f6e134-0/640/480",
		position: "sidebar",
		eventType: "seasonal",
		isActive: true,
		startTime: new Date().toISOString(),
		endTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
		priority: 1,
		linkUrl: "/fashion-week",
	},
	{
		id: "5",
		title: "Tech Gadgets Sale",
		imageUrl:
			"https://picsum.photos/seed/92f1c883-4ec0-4xe8-1111-8fhgj9f6e134-0/640/480",
		position: "sidebar",
		eventType: "other",
		isActive: true,
		startTime: new Date().toISOString(),
		endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
		priority: 2,
		linkUrl: "/tech-sale",
	},
];

// Static promo bars data - sẽ được build vào bundle
export const STATIC_PROMO_BARS: PromoBar[] = [
	{
		id: "1",
		message:
			"🎉 Flash Sale 12.12 - Giảm tới 50% cho tất cả sản phẩm! Mua ngay!",
		backgroundColor: "#ff4757",
		textColor: "#ffffff",
		isActive: true,
		startTime: new Date().toISOString(),
		endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
		priority: 1,
		isCloseable: true,
		linkUrl: "/flash-sale",
	},
	{
		id: "2",
		message:
			"🚚 Miễn phí vận chuyển cho đơn hàng từ 200k - Áp dụng toàn quốc!",
		backgroundColor: "#2ed573",
		textColor: "#ffffff",
		isActive: true,
		startTime: new Date().toISOString(),
		endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
		priority: 2,
		isCloseable: true,
		linkUrl: "/free-shipping",
	},
	{
		id: "3",
		message:
			"🎁 Tặng voucher 100k cho khách hàng mới - Đăng ký ngay hôm nay!",
		backgroundColor: "#5352ed",
		textColor: "#ffffff",
		isActive: true,
		startTime: new Date().toISOString(),
		endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
		priority: 3,
		isCloseable: true,
		linkUrl: "/register",
	},
];

// Helper functions
export function getActiveEventBanners(): EventBanner[] {
	const now = new Date();
	return STATIC_EVENT_BANNERS.filter((banner) => {
		if (banner.isActive === false) return false;
		if (banner.startTime && new Date(banner.startTime) > now) return false;
		if (banner.endTime && new Date(banner.endTime) < now) return false;
		return true;
	}).sort((a, b) => (a.priority || 0) - (b.priority || 0));
}

export function getActivePromoBars(): PromoBar[] {
	const now = new Date();
	return STATIC_PROMO_BARS.filter((bar) => {
		if (bar.isActive === false) return false;
		if (bar.startTime && new Date(bar.startTime) > now) return false;
		if (bar.endTime && new Date(bar.endTime) < now) return false;
		return true;
	}).sort((a, b) => (a.priority || 0) - (b.priority || 0));
}

export function getEventBannersByPosition(position: string): EventBanner[] {
	return getActiveEventBanners().filter(
		(banner) => banner.position === position,
	);
}

export function getFeaturedEventBanners(limit: number = 3): EventBanner[] {
	return getActiveEventBanners().slice(0, limit);
}
