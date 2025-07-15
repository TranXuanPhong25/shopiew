import ProductCard from "@/src/components/product/card/product-card";
import {ProductCardProps} from "@/src/interfaces/product";

export default function ProductGrid({products, compact = false}: { products: ProductCardProps[], compact?: boolean }) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {products.map(product => (
            <ProductCard key={product.id} product={product} compact={compact}/>
        ))}
    </div>
}