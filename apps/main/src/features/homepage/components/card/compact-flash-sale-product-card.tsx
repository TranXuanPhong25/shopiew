import Image from "next/image"
import Link from "next/link"
import {Card, CardContent} from "@/components/ui/card"
import {CompactDisplayFlashSaleProps} from "@/features/products/types";
import {Flame} from "lucide-react"

export default function CompactFlashSaleProductCard({product}: { product: CompactDisplayFlashSaleProps }) {
    const discountPercent = Math.round(
        ((product.originalPrice - product.flashSalePrice) / product.originalPrice) * 100
    );
    const soldPercent = Math.round(
        (product.flashSaleSoldQuantity / (product.flashSaleSoldQuantity + product.flashSaleAvailableQuantity)) * 100
    );

    return (
        <Link href={`/products/${product.id}`} className="block group">
            <Card className="max-w-sm overflow-hidden bg-white border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative">
                    {/* Discount badge */}
                    <div className="absolute top-2 left-2 z-10">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-sale-500 text-white">
                            -{discountPercent}%
                        </span>
                    </div>
                    
                    {/* Product image */}
                    <div className="p-3 pb-0">
                        <div className="aspect-square overflow-hidden rounded-xl bg-slate-50">
                            <Image
                                src={product.imageUrl}
                                alt={`Flash sale product ${product.id}`}
                                width={400}
                                height={400}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    </div>
                </div>

                <CardContent className="p-3 pt-2 text-center space-y-2">
                    {/* Price */}
                    <div className="flex items-baseline justify-center gap-2">
                        <span className="text-lg font-bold text-sale-600 tabular-nums">
                            {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(product.flashSalePrice)}
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="relative w-full h-6 rounded-full bg-gradient-to-r from-sale-100 to-cta-100 overflow-hidden">
                        <div 
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-sale-500 to-cta-500 rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(soldPercent, 10)}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center gap-1 text-xs font-medium text-white drop-shadow-sm">
                            <Flame className="h-3 w-3" aria-hidden="true" />
                            <span>
                                {product.flashSaleAvailableQuantity < 20 
                                    ? "Selling Fast!" 
                                    : `${product.flashSaleSoldQuantity} sold`
                                }
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}

