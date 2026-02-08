"use client";

import { use, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGetOrder } from "@/features/orders";
import { useCreateReview } from "@/features/reviews/hooks/use-create-review";
import { ProductReviewCard } from "@/features/reviews/components";
import { ReviewFormState, CreateReviewRequest } from "@/features/reviews/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, Package, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface RatingPageProps {
	params: Promise<{ orderId: string }>;
}

export default function RatingPage({ params }: RatingPageProps) {
	const { orderId } = use(params);
	const router = useRouter();

	const { data: order, isLoading, error } = useGetOrder(orderId);
	const createReviewMutation = useCreateReview();

	// Initialize form states for each product
	const [reviewForms, setReviewForms] = useState<
		Record<string, ReviewFormState>
	>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Initialize form states when order loads
	useMemo(() => {
		if (order && Object.keys(reviewForms).length === 0) {
			const initialForms: Record<string, ReviewFormState> = {};
			order.orderItems.forEach((item) => {
				initialForms[item.productId] = {
					productId: item.productId,
					rating: 0,
					comment: "",
					images: [],
					imagePreviews: [],
					isSubmitted: false,
				};
			});
			setReviewForms(initialForms);
		}
	}, [order, reviewForms]);

	const handleFormChange = (
		productId: string,
		changes: Partial<ReviewFormState>,
	) => {
		setReviewForms((prev) => ({
			...prev,
			[productId]: {
				...prev[productId],
				...changes,
			},
		}));
	};

	const handleSubmitAll = async () => {
		if (!order) return;

		// Validate all forms
		const validForms = Object.values(reviewForms).filter(
			(form) =>
				!form.isSubmitted &&
				form.rating > 0 &&
				form.comment.length >= 20 &&
				form.comment.length <= 1000,
		);

		if (validForms.length === 0) {
			toast.error("Vui lòng hoàn thành ít nhất một đánh giá");
			return;
		}

		setIsSubmitting(true);

		try {
			let hasErrors = false;
			// Submit reviews sequentially
			for (const form of validForms) {
				const request: CreateReviewRequest = {
					productId: parseInt(form.productId),
					userId: order.userId, // TODO: Get from auth context
					username: "User", // TODO: Get from auth context
					rating: form.rating,
					comment: form.comment,
				};

				try {
					await createReviewMutation.mutateAsync(request);

					// Mark as submitted
					setReviewForms((prev) => ({
						...prev,
						[form.productId]: {
							...prev[form.productId],
							isSubmitted: true,
							error: undefined,
						},
					}));
				} catch (error: any) {
					// Mark error for this specific form
					hasErrors = true;

					setReviewForms((prev) => ({
						...prev,
						[form.productId]: {
							...prev[form.productId],
							error: error.message || "Không thể gửi đánh giá",
						},
					}));
				}
			}

			// Check if all were successful
			if (!hasErrors) {
				toast.success("Hoàn thành đánh giá!", {
					description: "Cảm ơn bạn đã chia sẻ đánh giá của mình.",
				});

				// Redirect after success
				setTimeout(() => {
					router.push(`/orders/${orderId}`);
				}, 2000);
			}
		} finally {
			setIsSubmitting(false);
		}
	};

	// Calculate submit button state
	const hasValidForms = Object.values(reviewForms).some(
		(form) =>
			!form.isSubmitted &&
			form.rating > 0 &&
			form.comment.length >= 20 &&
			form.comment.length <= 1000,
	);

	const allSubmitted = Object.values(reviewForms).every(
		(form) => form.isSubmitted,
	);

	if (isLoading) {
		return (
			<div className="min-h-[60vh] flex items-center justify-center">
				<div className="text-center">
					<Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-500" />
					<p className="text-gray-600">Đang tải thông tin đơn hàng...</p>
				</div>
			</div>
		);
	}

	if (error || !order) {
		return (
			<div className="min-h-[60vh] flex items-center justify-center">
				<div className="text-center">
					<Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
					<h2 className="text-xl font-semibold mb-2">
						Không tìm thấy đơn hàng
					</h2>
					<p className="text-gray-600 mb-6">
						Đơn hàng không tồn tại hoặc bạn không có quyền truy cập
					</p>
					<Link href="/orders">
						<Button variant="outline">Quay lại đơn hàng</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mx-auto px-4 py-6">
			{/* Header */}
			<div className="mb-6">
				<Link
					href={`/orders/${orderId}`}
					className="flex items-center w-fit text-blue-500 hover:text-blue-600 mb-4"
				>
					<ChevronLeft className="w-5 h-5" />
					Quay lại đơn hàng
				</Link>

				<div className="flex items-start justify-between">
					<div>
						<h1 className="text-2xl font-bold mb-2">Đánh giá sản phẩm</h1>
						<p className="text-gray-600">
							Đơn hàng:{" "}
							<span className="font-medium">{order.orderNumber}</span>
						</p>
					</div>

					{allSubmitted && (
						<div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
							<CheckCircle2 className="w-5 h-5" />
							<span className="font-medium">Đã hoàn thành</span>
						</div>
					)}
				</div>
			</div>

			{/* Product Review Cards */}
			<div className="space-y-4 mb-6">
				{order.orderItems.map((item) => (
					<ProductReviewCard
						key={item.productId}
						product={{
							productId: item.productId,
							productName: item.productName,
							productSku: item.productSku,
							imageUrl: item.imageUrl,
							variantId: item.variantId,
							variantName: item.variantName,
							quantity: item.quantity,
						}}
						formState={
							reviewForms[item.productId] || {
								productId: item.productId,
								rating: 0,
								comment: "",
								images: [],
								imagePreviews: [],
								isSubmitted: false,
							}
						}
						onChange={(changes) =>
							handleFormChange(item.productId, changes)
						}
						disabled={isSubmitting}
					/>
				))}
			</div>

			{/* Submit Button */}
			<div className="sticky bottom-0 bg-white border-t border-gray-200 py-4 -mx-4 px-4">
				<div className="max-w-4xl mx-auto flex gap-3">
					<Button
						variant="outline"
						onClick={() => router.push(`/orders/${orderId}`)}
						disabled={isSubmitting}
						className="flex-1"
					>
						Để sau
					</Button>
					<Button
						onClick={handleSubmitAll}
						disabled={!hasValidForms || isSubmitting || allSubmitted}
						className="flex-1"
					>
						{isSubmitting ? (
							<>
								<Loader2 className="w-4 h-4 mr-2 animate-spin" />
								Đang gửi...
							</>
						) : allSubmitted ? (
							"Đã hoàn thành"
						) : (
							"Gửi đánh giá"
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}
