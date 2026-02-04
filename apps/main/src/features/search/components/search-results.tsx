"use client";
import ProductSorting from "@/features/search/components/product-sorting";
import ProductGrid from "@/features/homepage/components/product-grid";
import { ProductCardProps } from "@/features/products/types";
import { SearchPagination } from "./search-pagination";
import { useGeneralSearch } from "./use-general-search";
import { Search, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type SearchResultsProps = 
	| { query: string; products?: never }
	| { products: ProductCardProps[]; query?: never };

export default function SearchResults({ query, products: externalProducts }: SearchResultsProps) {
	const { data: results, isLoading } = useGeneralSearch(query || "");
	console.log(results ? results.data.products : results);
	const products = externalProducts || results?.data.products || [];
	const title = query ? `Results for "${query}"` : "Products";
	
	if (isLoading) {
		return (
			<div className="flex-1 bg-white rounded-2xl shadow-sm p-6">
				<div className="animate-pulse space-y-4">
					<div className="h-8 bg-gray-200 rounded-lg w-1/3" />
					<div className="h-4 bg-gray-200 rounded w-1/4" />
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
						{[...Array(8)].map((_, i) => (
							<div key={i} className="aspect-square bg-gray-200 rounded-2xl" />
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="flex-1 bg-white rounded-2xl shadow-sm p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-1">
					{title}
				</h1>
				<p className="text-sm text-muted-foreground">
					{products.length > 0 
						? `Found ${products.length.toLocaleString()} products`
						: "No products found"
					}
				</p>
			</div>

			{products.length > 0 ? (
				<>
					<ProductSorting />
					<ProductGrid products={products} compact />
					<SearchPagination
						page={0}
						size={10}
						totalPages={2}
						totalElements={products.length}
						onPageChange={(newPage) => {
							console.log("Change to page:", newPage);
						}}
					/>
				</>
			) : (
				<div className="text-center py-16">
					<div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-4">
						<Package className="w-10 h-10 text-slate-400" aria-hidden="true" />
					</div>
					<h2 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h2>
					<p className="text-muted-foreground mb-6 max-w-md mx-auto text-pretty">
						We couldn't find any products matching "{query}". Try adjusting your search or browse our categories.
					</p>
					<div className="flex items-center justify-center gap-3">
						<Button asChild variant="outline">
							<Link href="/">
								Browse Categories
							</Link>
						</Button>
						<Button asChild>
							<Link href="/flash-sales">
								View Flash Sales
							</Link>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
