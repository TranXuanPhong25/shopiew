"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import reviewService from "../service";
import { CreateReviewRequest, ReviewResponse } from "../types";

interface UseCreateReviewOptions {
	onSuccess?: (data: ReviewResponse) => void;
	onError?: (error: Error) => void;
}

export const useCreateReview = (options?: UseCreateReviewOptions) => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: (request: CreateReviewRequest) =>
			reviewService.createReview(request),
		onSuccess: (data) => {
			toast.success("Đánh giá thành công!", {
				description: "Cảm ơn bạn đã chia sẻ đánh giá về sản phẩm.",
			});

			// Invalidate relevant queries
			queryClient.invalidateQueries({
				queryKey: ["product-reviews", data.productId],
			});
			queryClient.invalidateQueries({
				queryKey: ["user-reviews"],
			});

			options?.onSuccess?.(data);
		},
		onError: (error: Error) => {
			toast.error("Đánh giá thất bại", {
				description: error.message || "Vui lòng thử lại sau.",
			});

			options?.onError?.(error);
		},
	});
};
