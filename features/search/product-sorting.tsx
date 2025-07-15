"use client"

import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"

export default function ProductSorting() {
    const [activeSort, setActiveSort] = useState("Relevance")
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = 17

    const sortOptions = ["Relevance", "Latest", "Top Sales", "Price"]

    const handleSortChange = (option: string) => {
        setActiveSort(option)
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <div className="flex items-center mb-4 sm:mb-0">
                <span className="text-gray-700 mr-4">Sort by</span>
                <div className="flex flex-wrap gap-2">
                    {sortOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => handleSortChange(option)}
                            className={`px-4 py-2 rounded transition-colors ${
                                activeSort === option
                                    ? "bg-red-500 text-white"
                                    : option === "Price"
                                        ? "bg-white border border-gray-300 text-gray-700 flex items-center"
                                        : "bg-white border border-gray-300 text-gray-700"
                            }`}
                        >
                            {option}
                            {option === "Price" && <ChevronDown className="ml-2 h-4 w-4" />}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex items-center">
        <span className="text-orange-500 mr-2">
          {currentPage}/{totalPages}
        </span>
                <div className="flex gap-1">
                    <button
                        onClick={goToPrevPage}
                        disabled={currentPage === 1}
                        className="p-2 border border-gray-300 rounded bg-white text-gray-700 disabled:opacity-50"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-gray-300 rounded bg-white text-gray-700 disabled:opacity-50"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}

