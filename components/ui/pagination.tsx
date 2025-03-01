import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = []

        // Always show first page
        pages.push(1)

        // Calculate range of pages to show around current page
        const startPage = Math.max(2, currentPage - 1)
        const endPage = Math.min(totalPages - 1, currentPage + 1)

        // Add ellipsis after first page if needed
        if (startPage > 2) {
            pages.push("...")
        }

        // Add pages around current page
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i)
        }

        // Add ellipsis before last page if needed
        if (endPage < totalPages - 1) {
            pages.push("...")
        }

        // Always show last page if there's more than one page
        if (totalPages > 1) {
            pages.push(totalPages)
        }

        return pages
    }

    return (
        <div className="flex items-center justify-center mt-6 gap-1">
            {/* Previous button */}
            <button
                onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center w-9 h-9 rounded-md border ${
                    currentPage === 1
                        ? "text-gray-300 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                aria-label="Previous page"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((page, index) =>
                    typeof page === "number" ? (
                        <button
                            key={index}
                            onClick={() => onPageChange(page)}
                            className={`flex items-center justify-center w-9 h-9 rounded-md ${
                                currentPage === page
                                    ? "bg-custom-1 text-white border border-custom-1"
                                    : "text-gray-700 border border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={index} className="w-9 text-center">
            {page}
          </span>
                    ),
            )}

            {/* Next button */}
            <button
                onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center w-9 h-9 rounded-md border ${
                    currentPage === totalPages
                        ? "text-gray-300 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                aria-label="Next page"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    )
}

