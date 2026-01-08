export interface EventBanner {
	id: string;
	title: string;
	description?: string;
	imageUrl: string;
	linkUrl?: string;
	startTime: string;
	endTime: string;
	priority: number;
	isActive: boolean;
	eventType:
		| "black_friday"
		| "flash_sale"
		| "new_year"
		| "holiday"
		| "seasonal"
		| "other";
	position: "main" | "sidebar" | "popup";
	createdAt?: string;
	updatedAt?: string;
}

export interface PromoBar {
	id: string;
	message: string;
	backgroundColor: string;
	textColor: string;
	linkUrl?: string;
	startTime: string;
	endTime: string;
	isActive: boolean;
	priority: number;
	isCloseable: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export interface ActivePromotionsResponse {
	banners: EventBanner[];
	promoBars: PromoBar[];
}

export const EVENT_TYPE_OPTIONS = [
	{ label: "Black Friday", value: "black_friday" },
	{ label: "Flash Sale", value: "flash_sale" },
	{ label: "New Year", value: "new_year" },
	{ label: "Holiday", value: "holiday" },
	{ label: "Seasonal", value: "seasonal" },
	{ label: "Other", value: "other" },
];

export const POSITION_OPTIONS = [
	{ label: "Main", value: "main" },
	{ label: "Sidebar", value: "sidebar" },
	{ label: "Popup", value: "popup" },
];
