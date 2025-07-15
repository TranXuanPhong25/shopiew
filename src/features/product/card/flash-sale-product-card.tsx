import Image from "next/image"
import {Star} from "lucide-react"
import {Card, CardContent} from "@/components/ui/card"
import {FlashSaleCardProps} from "@/interfaces/product";

export default function FlashSaleProductCard({product}:{product:FlashSaleCardProps}) {
    return (
        <Card className="max-w-sm overflow-hidden">
            <div className="relative">
                {/* Main product image */}
                <div className="pt-4 px-4">
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
                    <span className="text-xl font-bold text-red-500">{product.flashSalePrice}</span>
                </div>

            </CardContent>
        </Card>
    )
}

