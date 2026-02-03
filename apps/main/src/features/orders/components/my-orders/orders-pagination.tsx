import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

interface OrdersPaginationProps {
	page: number;
	size: number;
	totalPages: number;
	totalElements: number;
	onPageChange: (page: number) => void;
}

export function OrdersPagination({
	page,
	size,
	totalPages,
	totalElements,
	onPageChange,
}: OrdersPaginationProps) {
	if (totalPages <= 1) return null;

	return (
		<div className="flex flex-col items-center gap-4 pt-4">
			<p className="text-sm text-gray-600">
				Hiển thị {page * size + 1}-
				{Math.min((page + 1) * size, totalElements)} trong tổng số{" "}
				{totalElements} đơn hàng
			</p>
			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							onClick={() => onPageChange(Math.max(0, page - 1))}
							className={
								page === 0
									? "pointer-events-none opacity-50"
									: "cursor-pointer"
							}
						/>
					</PaginationItem>
					{Array.from({ length: totalPages }, (_, i) => i).map(
						(pageNum) => {
							const isFirstPage = pageNum === 0;
							const isLastPage = pageNum === totalPages - 1;
							const isCurrentPage = pageNum === page;
							const isNearCurrent = Math.abs(pageNum - page) <= 1;

							if (
								isFirstPage ||
								isLastPage ||
								isCurrentPage ||
								isNearCurrent
							) {
								return (
									<PaginationItem key={pageNum}>
										<PaginationLink
											onClick={() => onPageChange(pageNum)}
											isActive={isCurrentPage}
											className="cursor-pointer"
										>
											{pageNum + 1}
										</PaginationLink>
									</PaginationItem>
								);
							}

							if (pageNum === page - 2 || pageNum === page + 2) {
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
								onPageChange(Math.min(totalPages - 1, page + 1))
							}
							className={
								page >= totalPages - 1
									? "pointer-events-none opacity-50"
									: "cursor-pointer"
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
