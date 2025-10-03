"use client"
import ProductPageContent from "@/features/products/components/product-page-content";
import { ProductPageProvider } from "@/features/products/context";

export default function ProductPage({ params }: { params: Promise<{ productId: string }> }) {
   return (
      <ProductPageProvider params={params}>
         <ProductPageContent />
      </ProductPageProvider>
   );
}