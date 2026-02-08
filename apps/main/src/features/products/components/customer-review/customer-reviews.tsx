"use client";
import { useProductPageContext } from "../../context";
import { useReviews } from "@/features/reviews";
import RatingComponent from "./rating-component";
import { Button } from "@/components/ui/button";
import IndividualReview from "./individual-review";
import {
Pagination,
PaginationContent,
PaginationEllipsis,
PaginationItem,
PaginationLink,
PaginationNext,
PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";

export default function CustomerReviews() {
const { product } = useProductPageContext();
const {
reviews,
stats,
loading,
error,
pageInfo,
filters,
setFilters,
goToPage,
markAsHelpful,
} = useReviews(product?.id?.toString() || "");

// Filter buttons configuration
const filterButtons = [
{ label: "All", value: undefined },
{ label: "5 stars", value: 5 },
{ label: "4 stars", value: 4 },
{ label: "3 stars", value: 3 },
{ label: "2 stars", value: 2 },
{ label: "1 star", value: 1 },
];

const handleRatingFilter = (rating: number | undefined) => {
setFilters({ ...filters, rating });
};

const handleMediaFilter = () => {
setFilters({ ...filters, withMedia: !filters.withMedia });
};

const handleCommentsFilter = () => {
setFilters({ ...filters, withComments: !filters.withComments });
};

if (!product) return null;

return (
<div className="w-full p-4">
<h2 className="text-lg font-medium p-4 bg-muted/50">
Customer reviews
</h2>

{/* Rating Summary */}
{stats && <RatingComponent stats={stats} />}

{/* Filters */}
<div className="flex gap-2 flex-wrap items-center mb-4">
<h2>Filter by:</h2>

{filterButtons.map((btn) => (
<Button
key={btn.label}
variant={filters.rating === btn.value ? "default" : "outline"}
onClick={() => handleRatingFilter(btn.value)}
>
{btn.label}
</Button>
))}

<Button
variant={filters.withMedia ? "default" : "outline"}
onClick={handleMediaFilter}
>
With media
</Button>

<Button
variant={filters.withComments ? "default" : "outline"}
onClick={handleCommentsFilter}
>
With comments
</Button>
</div>

{/* Loading State */}
{loading && (
<div className="space-y-4">
{[...Array(3)].map((_, i) => (
<div key={i} className="border-b pb-6">
<div className="flex gap-3">
<Skeleton className="w-10 h-10 rounded-full" />
<div className="flex-1 space-y-2">
<Skeleton className="h-4 w-32" />
<Skeleton className="h-4 w-full" />
<Skeleton className="h-20 w-full" />
</div>
</div>
</div>
))}
</div>
)}

{/* Error State */}
{error && !loading && (
<div className="text-center py-8">
<AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
<p className="text-gray-600">Failed to load reviews</p>
</div>
)}

{/* Reviews List */}
{!loading && !error && reviews.length === 0 && (
<div className="text-center py-8 text-gray-500">
No reviews match your filters
</div>
)}

{!loading && !error && reviews.length > 0 && (
<>
{reviews.map((review) => (
<IndividualReview
key={review.id}
review={review}
onMarkHelpful={markAsHelpful}
/>
))}

{/* Pagination */}
{pageInfo && pageInfo.totalPages > 1 && (
<div className="flex justify-center mt-6">
<Pagination>
<PaginationContent>
<PaginationItem>
<PaginationPrevious
onClick={() =>
pageInfo.hasPrev &&
goToPage(pageInfo.currentPage - 1)
}
className={
!pageInfo.hasPrev
? "pointer-events-none opacity-50"
: "cursor-pointer"
}
/>
</PaginationItem>

{Array.from(
{ length: pageInfo.totalPages },
(_, i) => i,
).map((pageNum) => {
const isFirstPage = pageNum === 0;
const isLastPage = pageNum === pageInfo.totalPages - 1;
const isCurrentPage =
pageNum === pageInfo.currentPage;
const isNearCurrent =
Math.abs(pageNum - pageInfo.currentPage) <= 1;

if (
isFirstPage ||
isLastPage ||
isCurrentPage ||
isNearCurrent
) {
return (
<PaginationItem key={pageNum}>
<PaginationLink
onClick={() => goToPage(pageNum)}
isActive={isCurrentPage}
className="cursor-pointer"
>
{pageNum + 1}
</PaginationLink>
</PaginationItem>
);
}

if (
pageNum === pageInfo.currentPage - 2 ||
pageNum === pageInfo.currentPage + 2
) {
return (
<PaginationItem key={pageNum}>
<PaginationEllipsis />
</PaginationItem>
);
}

return null;
})}

<PaginationItem>
<PaginationNext
onClick={() =>
pageInfo.hasNext &&
goToPage(pageInfo.currentPage + 1)
}
className={
!pageInfo.hasNext
? "pointer-events-none opacity-50"
: "cursor-pointer"
}
/>
</PaginationItem>
</PaginationContent>
</Pagination>
</div>
)}
</>
)}
</div>
);
}
