"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import {useSearchParams} from "next/navigation";

export default function SearchFilter() {
    const [expandedCategory, setExpandedCategory] = useState(false)
    const [expandedShipping, setExpandedShipping] = useState(false)
    const searchParams = useSearchParams();
    const query = searchParams.get('query')
    console.log(query)
    return (
        <div className="sticky top-0 w-[230px] bg-white rounded-2xl shadow-sm p-4 h-fit">
            <div className="flex items-center gap-2 font-medium text-gray-800 mb-4">
                <Filter className="h-4 w-4" />
                <h2 className="uppercase text-sm tracking-wide">Search Filter</h2>
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">By category</h3>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="category-1"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="category-1" className="ml-2 text-sm text-gray-700">
                            Áo (1tr+)
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="category-2"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="category-2" className="ml-2 text-sm text-gray-700">
                            Thời Trang Trẻ Em (1tr+)
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="category-3"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="category-3" className="ml-2 text-sm text-gray-700">
                            Thời Trang Nam (1tr+)
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="category-4"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="category-4" className="ml-2 text-sm text-gray-700">
                            Nhà Cửa & Đời Sống (513k+)
                        </label>
                    </div>

                    {expandedCategory && (
                        <>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="category-5"
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="category-5" className="ml-2 text-sm text-gray-700">
                                    Điện Tử (250k+)
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="category-6"
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="category-6" className="ml-2 text-sm text-gray-700">
                                    Sách & Văn Phòng Phẩm (180k+)
                                </label>
                            </div>
                        </>
                    )}

                    <button
                        className="flex items-center text-amber-700 text-sm font-medium"
                        onClick={() => setExpandedCategory(!expandedCategory)}
                    >
                        More {expandedCategory ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                    </button>
                </div>
            </div>

            {/* Shipped from */}
            <div className="mb-6 border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Shipped from</h3>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="location-1"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="location-1" className="ml-2 text-sm text-gray-700">
                            Ha Noi
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="location-2"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="location-2" className="ml-2 text-sm text-gray-700">
                            Ho Chi Minh City
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="location-3"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="location-3" className="ml-2 text-sm text-gray-700">
                            Thai Nguyen
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="location-4"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="location-4" className="ml-2 text-sm text-gray-700">
                            Hung Yen
                        </label>
                    </div>

                    {expandedShipping && (
                        <>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="location-5"
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="location-5" className="ml-2 text-sm text-gray-700">
                                    Da Nang
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="location-6"
                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="location-6" className="ml-2 text-sm text-gray-700">
                                    Can Tho
                                </label>
                            </div>
                        </>
                    )}

                    <button
                        className="flex items-center text-amber-700 text-sm font-medium"
                        onClick={() => setExpandedShipping(!expandedShipping)}
                    >
                        More {expandedShipping ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                    </button>
                </div>
            </div>

            {/* Shipping options */}
            <div className="mb-6 border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Shipping options</h3>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="shipping-1"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="shipping-1" className="ml-2 text-sm text-gray-700">
                            Express
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="shipping-2"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="shipping-2" className="ml-2 text-sm text-gray-700">
                            Fast
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="shipping-3"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="shipping-3" className="ml-2 text-sm text-gray-700">
                            Saving
                        </label>
                    </div>
                </div>
            </div>

            {/* Brands */}
            <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Brands</h3>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="brand-1"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="brand-1" className="ml-2 text-sm text-gray-700">
                            Nike
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="brand-2"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="brand-2" className="ml-2 text-sm text-gray-700">
                            Adidas
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="brand-3"
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="brand-3" className="ml-2 text-sm text-gray-700">
                            Uniqlo
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

