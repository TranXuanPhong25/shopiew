"use client";
import { useState } from "react";
import RatingComponent from "@/features/products/components/customer-review/rating-component";
import { Button } from "@/components/ui/button";
import IndividualReview from "@/features/products/components/customer-review/individual-review";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export default function CustomerReviews() {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = 5; // TODO: Get from API

	return (
		<div className="w-full p-4">
			<h2 className="text-lg font-medium p-4 bg-muted/50">
				Customer reviews
			</h2>
			<RatingComponent />
			<div className="flex gap-2 flex-wrap items-center mb-4">
				<h2>Filter by:</h2>

				<Button className="" variant={"outline"}>
					All
				</Button>
				<Button className="" variant={"outline"}>
					5 stars
				</Button>
				<Button className="" variant={"outline"}>
					4 stars
				</Button>
				<Button className="" variant={"outline"}>
					3 stars
				</Button>
				<Button className="" variant={"outline"}>
					2 stars
				</Button>
				<Button className="" variant={"outline"}>
					1 star
				</Button>
				<Button className="" variant={"outline"}>
					With media
				</Button>
				<Button className="" variant={"outline"}>
					With comments
				</Button>
			</div>
			<IndividualReview />
			<IndividualReview />
			<IndividualReview />
			<IndividualReview />

			<div className="flex justify-center mt-6">
				<Pagination>
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								onClick={() =>
									setCurrentPage((p) => Math.max(1, p - 1))
								}
								className={
									currentPage === 1
										? "pointer-events-none opacity-50"
										: "cursor-pointer"
								}
							/>
						</PaginationItem>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map(
							(pageNum) => {
								const isFirstPage = pageNum === 1;
								const isLastPage = pageNum === totalPages;
								const isCurrentPage = pageNum === currentPage;
								const isNearCurrent =
									Math.abs(pageNum - currentPage) <= 1;

								if (
									isFirstPage ||
									isLastPage ||
									isCurrentPage ||
									isNearCurrent
								) {
									return (
										<PaginationItem key={pageNum}>
											<PaginationLink
												onClick={() => setCurrentPage(pageNum)}
												isActive={isCurrentPage}
												className="cursor-pointer"
											>
												{pageNum}
											</PaginationLink>
										</PaginationItem>
									);
								}

								if (
									pageNum === currentPage - 2 ||
									pageNum === currentPage + 2
								) {
									return (
										<PaginationItem key={pageNum}>
											<PaginationEllipsis />
										</PaginationItem>
									);
								}

								return null;
							},
						)}
						<PaginationItem>
							<PaginationNext
								onClick={() =>
									setCurrentPage((p) => Math.min(totalPages, p + 1))
								}
								className={
									currentPage >= totalPages
										? "pointer-events-none opacity-50"
										: "cursor-pointer"
								}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>
			</div>
		</div>
	);
}
