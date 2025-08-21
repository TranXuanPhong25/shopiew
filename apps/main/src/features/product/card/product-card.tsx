import Image from "next/image"
import {MapPin, Star} from "lucide-react"
import {Card, CardContent} from "@/components/ui/card"
import {ProductCardProps} from "@/types/product";
import {clsx} from "clsx";

export default function ProductCard({product,compact=false}:{product:ProductCardProps,compact?:boolean}) {
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
                {/* Product Name */}
                <h3 className={clsx(
                    "font-medium mb-2 text-ellipsis line-clamp-2",
                    {"text-sm": compact}
                )}>{product.name}</h3>

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
                    <span className="text-sm text-muted-foreground">-{100-Math.round(product.salePrice/product.originalPrice*100)}%</span>
                </div>

                {/* Delivery */}
                <div className="flex items-center justify-between gap-2  mt-2 text-sm text-muted-foreground ">
                    <span>Giao siêu tốc 2h</span>
                    <span className="text-xs flex"><MapPin className={"size-4"}/> {product.soldAddress}</span>
                </div>
            </CardContent>
        </Card>
    )
}

