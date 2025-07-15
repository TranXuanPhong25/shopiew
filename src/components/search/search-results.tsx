"use client"
import ProductSorting from "@/src/components/search/product-sorting";
import ProductGrid from "@/src/components/product/product-grid";
import Pagination from "@/src/components/ui/pagination";
import {ProductCardProps} from "@/src/interfaces/product";
import {useSearchParams} from "next/navigation";

export default function SearchResults({products}: { products: ProductCardProps[] }) {
    const searchParams = useSearchParams();
    const query = searchParams.get('query')
    console.log(query)

    return (
        <div className="flex-1 bg-white rounded-2xl shadow-sm p-4">
            <ProductSorting/>
            <ProductGrid products={products} compact/>
            <Pagination currentPage={1} totalPages={10} onPageChangeAction={() => {
            }}/>
        </div>
    )
}