import SearchFilter from "@/features/search/components/search-filters";
import SearchResults from "@/features/search/components/search-results";
import { ProductCardProps } from "@/features/products/types";
import { Metadata } from "next";
import { Suspense } from "react";
import { useGeneralSearch } from "@/features/search/components/use-general-search";

export async function generateMetadata({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
	const resolvedSearchParams = await searchParams;
	const query = resolvedSearchParams.query || resolvedSearchParams.q || "";
	return {
		title:
			(query ? `Search results for "${query}"` : "Search results") +
			" | Shopiew",
	};
}

export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
	const resolvedSearchParams = await searchParams;
	const query = resolvedSearchParams.query || resolvedSearchParams.q || "";
	return (
		<div className="max-w-7xl mx-auto flex relative  my-4 gap-4">
			<Suspense fallback={<div>Loading...</div>}>
				<SearchFilter />
			</Suspense>
			<div className="flex-1">
				<Suspense fallback={<div>Loading...</div>}>
					<SearchResults query={query as string} />
				</Suspense>
			</div>
		</div>
	);
}
