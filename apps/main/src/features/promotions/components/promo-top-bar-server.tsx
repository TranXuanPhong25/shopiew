import { PromotionService } from "../service";
import { PromoBar } from "../types";
import { PromoTopBarClient } from "./promo-top-bar-client";
import { getActivePromoBars } from "@/data/static-promotions";

// Server component để fetch promo bars tại build time
export default async function PromoTopBarServer() {
	// Fetch promo bars tại build time
	let promoBars: PromoBar[] = [];

	try {
		const response = await PromotionService.getActivePromoBars();
		promoBars = response || [];
	} catch (error) {
		console.error("Failed to fetch promo bars:", error);
	}

	// Nếu không có data từ API, dùng static data
	if (!promoBars.length) {
		promoBars = getActivePromoBars();
	}
	return <PromoTopBarClient bars={promoBars} />;
}
