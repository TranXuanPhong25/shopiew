import Image from "next/image"
import {MoreVertical, Play, Star, ThumbsUp} from "lucide-react"

export default function IndividualReview() {
    return (
        <div className="border-b pb-6 mb-2">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                        src="https://placehold.co/40x40.png"
                        alt="User avatar"
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between">
                        <div>
                            <div className="font-medium">maiminhtuananh</div>
                            <div className="flex text-yellow-300">
                                <Star className="w-4 h-4 fill-yellow-300"/>
                                <Star className="w-4 h-4 fill-yellow-300"/>
                                <Star className="w-4 h-4 fill-yellow-300"/>
                                <Star className="w-4 h-4 fill-yellow-300"/>
                                <Star className="w-4 h-4 fill-yellow-300"/>
                            </div>
                        </div>
                        <button className="text-gray-400">
                            <MoreVertical className="w-5 h-5"/>
                        </button>
                    </div>

                    <div className="text-sm text-gray-500 mt-1">2023-03-25 16:26 | Variation: Size 44</div>

                    <div className="mt-3 space-y-2">
                        <div className="flex gap-2">
                            <span className="text-gray-500">Phong cách:</span>
                            <span>trẻ trung</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-gray-500">Độ xuất:</span>
                            <span>không có</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-gray-500">Dịp phù hợp:</span>
                            <span>rất phù hợp</span>
                        </div>
                    </div>

                    <div className="mt-3">
                        <p>Gói hàng cẩn thận, giao hàng nhanh, chất lượng quá ok. Đã mua của shop nhiều rồi.</p>
                    </div>

                    <div className="mt-3 flex gap-2">
                        <div className="relative w-20 h-20 rounded border overflow-hidden">
                            <Image
                                src="https://placehold.co/80x80.png"
                                alt="Review image 1"
                                width={80}
                                height={80}
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Play className="w-5 h-5 text-white"/>
                                <span className="text-white text-xs">0:05</span>
                            </div>
                        </div>
                        <div className="w-20 h-20 rounded border overflow-hidden">
                            <Image
                                src="https://placehold.co/80x80.png"
                                alt="Review image 2"
                                width={80}
                                height={80}
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Seller Response */}
                    <div className="mt-4 bg-gray-50 p-3 rounded-md">
                        <div className="font-medium mb-1">{"Seller's Response:"}</div>
                        <p className="text-sm">
                            Cảm ơn bạn maiminhtuananh đã ủng hộ SANBOO - Đồ bảo hộ lao động a. Trong quá trình giao nhận
                            hàng nếu có
                            nhầm lẫn. Phiền bạn liên hệ lại shop để bên mình đền bù thiệt hại nếu có nhé. Yêu bạn nhiều.
                            Chúc bạn
                            một ngày vui vẻ a.
                        </p>
                    </div>

                    {/* Like Button */}
                    <div className="mt-3 flex items-center text-gray-500">
                        <button className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4"/>
                            <span>4</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}