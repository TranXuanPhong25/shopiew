"use client";
import ProductSorting from "@/features/search/components/product-sorting";
import ProductGrid from "@/features/homepage/components/product-grid";
import { ProductCardProps } from "@/features/products/types";
import { SearchPagination } from "./search-pagination";
import { useGeneralSearch } from "./use-general-search";

export default function SearchResults({ query }: { query: string }) {
	const { data: results } = useGeneralSearch(query);
	console.log(results ? results.data.products : results);
	const products = results?.data.products || [];
	return (
		<div className="flex-1 bg-white rounded-2xl shadow-sm p-4">
			<div>
				<h2 className="text-2xl font-semibold mb-2">
					Kết quả tìm kiếm cho {`"${query}"`}
				</h2>
				<p className="text-sm text-muted-foreground mb-4">
					Tìm thấy {products.length} sản phẩm
				</p>
			</div>
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
		</div>
	);
}
