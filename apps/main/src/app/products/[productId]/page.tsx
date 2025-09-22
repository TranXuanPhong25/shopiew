"use client"

import { ProductPageProvider } from "@/features/products/context";
import ProductPageContent from "@/features/products/components/product-page-content";

export default function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
    return (
        <ProductPageProvider params={params}>
            <ProductPageContent />
        </ProductPageProvider>
    );
}