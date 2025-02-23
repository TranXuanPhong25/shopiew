import {Star} from "lucide-react"

export default function RatingComponent() {
    return (
        <div className=" p-6 bg-white flex w-full gap-4">
            <div className="flex mb-4 flex-col gap-1">
                <span><span className="font-semibold text-2xl">4.0</span> out of 5</span>
                <div className="flex">
                    {/* Filled stars */}
                    {[...Array(4)].map((_, i) => (
                        <Star key={`filled-${i}`} className="size-6 fill-yellow-300 text-yellow-300"/>
                    ))}
                    {/* Empty star */}
                    <Star className="size-6 fill-gray-200 text-gray-200"/>
                </div>
                <span className="text-gray-500 text-sm">4,206,350 review</span>
            </div>

            <div className="space-y-2 flex-1">
                {/* 5 stars */}
                <div className="flex items-center">
                   <span className="w-16 font-medium underline flex">
                        {[...Array(5)].map((_, i) => (
                            <Star key={`star-${i}`} className="size-4 fill-yellow-300 text-yellow-300"/>
                        ))}
                    </span>
                    <div className="flex-1 h-5 bg-gray-200 rounded-full mx-2">
                        <div className="h-full bg-yellow-300 rounded-full" style={{width: "37%"}}></div>
                    </div>
                    <span className="w-32 text-right text-gray-600">1,594,155 (37%)</span>
                </div>

                {/* 4 stars */}
                <div className="flex items-center">
                    <span className="w-16 font-medium underline flex">
                         {[...Array(4)].map((_, i) => (
                             <Star key={`filled-${i}`} className="size-4 fill-yellow-300 text-yellow-300"/>
                         ))}
                        <Star className="size-4 fill-gray-200 text-gray-200"/>
                    </span>
                    <div className="flex-1 h-5 bg-gray-200 rounded-full mx-2">
                        <div className="h-full bg-yellow-300 rounded-full" style={{width: "35%"}}></div>
                    </div>
                    <span className="w-32 text-right text-gray-600">1,478,585 (35%)</span>
                </div>

                {/* 3 stars */}
                <div className="flex items-center">
                    <span className="w-16 font-medium underline flex">
                        {[...Array(3)].map((_, i) => (
                            <Star key={`filled-${i}`} className="size-4 fill-yellow-300 text-yellow-300"/>
                        ))}
                        <Star className="size-4 fill-gray-200 text-gray-200"/>
                         <Star className="size-4 fill-gray-200 text-gray-200"/>
                    </span>
                    <div className="flex-1 h-5 bg-gray-200 rounded-full mx-2">
                        <div className="h-full bg-yellow-300 rounded-full" style={{width: "18%"}}></div>
                    </div>
                    <span className="w-32 text-right text-gray-600">788,167 (18%)</span>
                </div>

                {/* 2 stars */}
                <div className="flex items-center">
                     <span className="w-16 font-medium underline flex">
                        {[...Array(2)].map((_, i) => (
                            <Star key={`filled-${i}`} className="size-4 fill-yellow-300 text-yellow-300"/>
                        ))}
                         <Star className="size-4 fill-gray-200 text-gray-200"/>
                         <Star className="size-4 fill-gray-200 text-gray-200"/>
                        <Star className="size-4 fill-gray-200 text-gray-200"/>

                    </span>
                    <div className="flex-1 h-5 bg-gray-200 rounded-full mx-2">
                        <div className="h-full bg-yellow-300 rounded-full" style={{width: "5%"}}></div>
                    </div>
                    <span className="w-32 text-right text-gray-600">228,910 (5%)</span>
                </div>

                {/* 1 star */}
                <div className="flex items-center">
                     <span className="w-16 font-medium underline flex">

                            <Star className="size-4 fill-yellow-300 text-yellow-300"/>

                         {[...Array(4)].map((_, i) => (
                             <Star className="size-4 fill-gray-200 text-gray-200"/>
                         ))}
                    </span>
                    <div className="flex-1 h-5 bg-gray-200 rounded-full mx-2">
                        <div className="h-full bg-yellow-300 rounded-full" style={{width: "2%"}}></div>
                    </div>
                    <span className="w-32 text-right text-gray-600">116,533 (2%)</span>
                </div>
            </div>
        </div>
    )
}

