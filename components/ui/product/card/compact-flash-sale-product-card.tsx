import Image from "next/image"
import {Card, CardContent} from "@/components/ui/card"
import {CompactDisplayFlashSaleProps} from "@/interfaces/product";
import {Flame} from "lucide-react"


export default function CompactFlashSaleProductCard({product}: { product: CompactDisplayFlashSaleProps }) {
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

            <CardContent className="p-4 pt-2 text-center">

                <span
                    className="font-medium text-red-400">đ {new Intl.NumberFormat('en-US').format(product.flashSalePrice)}</span>
                <div
                    className="flex flex-col items-center gap-1.5 w-full rounded-full bg-gradient-to-r from-red-500 to-orange-400 px-3 py-1.5 text-white shadow-sm"
                >
                    <div className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-sm">
                        <Flame className="h-3.5 w-3.5"/>
                        <span
                            className="font-medium">{product.flashSaleAvailableQuantity < 20 ? "Selling fast" : `Only ${product.flashSaleAvailableQuantity} left`}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

