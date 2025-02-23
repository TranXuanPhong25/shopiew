import Image from "next/image"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {ProductCardProps} from "@/interfaces/product";

export default function ProductCard({product}:{product:ProductCardProps}) {
    return (
        <Card className="max-w-sm overflow-hidden">
            <div className="relative">
                {/* Promotional banner */}
                <div className="absolute top-0 left-0 right-0 z-10 bg-red-500 text-white text-center py-1 text-sm font-medium">
                    MUA 1 TẶNG QUÀ 710K
                </div>

                {/* Main product image */}
                <div className="pt-8 px-4">
                    <Image
                        src="https://placehold.co/400x400.png"
                        alt="Laneige Cica Sleeping Mask"
                        width={400}
                        height={400}
                        className="w-full h-auto"
                    />
                </div>
            </div>

            <CardContent className="p-4">
                {/* Badges */}
                <div className="flex gap-2 mb-2">
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                        CHÍNH HÃNG
                    </Badge>
                    <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50">
                        Freeship
                    </Badge>
                </div>

                {/* Product Name */}
                <h3 className="font-medium mb-2">Mặt Nạ Ngủ Phục Hồi Laneige Cica Sleeping Mask</h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">Đã bán 1132</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-red-500">{product.salePrice}</span>
                    <span className="text-sm text-muted-foreground">-{100-Math.round(product.salePrice/product.originalPrice)}%</span>
                </div>

                {/* Delivery */}
                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <span>Giao siêu tốc 2h</span>
                </div>
            </CardContent>
        </Card>
    )
}

