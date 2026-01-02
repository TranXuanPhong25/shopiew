import { ProductCategory } from "../../product-categories/types";
import { CategoriesClient } from "./categories-client";

// Server component để fetch categories tại build time
export default async function CategoriesGridServer() {
	// Fetch categories tại build time
	let categories: ProductCategory[] = [];

	try {
		// Option 1: Fetch từ API (nếu có external API)
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API}/product-categories`,
			{
				// Revalidate mỗi 1 giờ
				next: { revalidate: 3600 },
			}
		);

		if (response.ok) {
			categories = await response.json();
			categories = categories.sort((a: any, b: any) => a.id - b.id);
		}
	} catch (error) {
		console.error("Failed to fetch categories:", error);
	}

	return (
		<div className="w-full bg-white py-4 shadow-sm rounded-2xl">
			<div className="container mx-auto px-4 relative">
				{/* Pass categories xuống client component để handle carousel */}
				<CategoriesClient categories={categories || []} />
			</div>
		</div>
	);
}
