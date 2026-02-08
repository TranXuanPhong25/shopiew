"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { StarRating } from "./star-rating";
import { ImagePicker } from "./image-picker";
import { ProductRatingItem, ReviewFormState } from "../types";
import { cn } from "@/lib/utils";

interface ProductReviewCardProps {
	product: ProductRatingItem;
	formState: ReviewFormState;
	onChange: (state: Partial<ReviewFormState>) => void;
	disabled?: boolean;
}

export function ProductReviewCard({
	product,
	formState,
	onChange,
	disabled = false,
}: ProductReviewCardProps) {
	const commentLength = formState.comment.length;
	const isCommentValid = commentLength >= 20 && commentLength <= 1000;
	const isRatingValid = formState.rating > 0;
	const isValid = isCommentValid && isRatingValid;

	const handleRatingChange = (rating: number) => {
		onChange({ rating });
	};

	const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange({ comment: e.target.value });
	};

	const handleImagesChange = (files: File[], previews: string[]) => {
		onChange({ images: files, imagePreviews: previews });
	};

	return (
		<Card
			className={cn(
				"p-4 transition-all",
				formState.isSubmitted && "bg-green-50 border-green-200",
				formState.error && "bg-red-50 border-red-200",
			)}
		>
			{/* Product Info */}
			<div className="flex gap-3 mb-4">
				<div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
					<img
						src={product.imageUrl}
						alt={product.productName}
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="flex-1 min-w-0">
					<h3 className="font-medium text-sm line-clamp-2 mb-1">
						{product.productName}
					</h3>
					{product.variantName && (
						<p className="text-xs text-gray-500 mb-1">
							Phân loại: {product.variantName}
						</p>
					)}
					<p className="text-xs text-gray-400">Số lượng: x{product.quantity}</p>
				</div>
				{formState.isSubmitted && (
					<Badge variant="outline" className="h-fit bg-green-100 text-green-700">
						<CheckCircle2 className="w-3 h-3 mr-1" />
						Đã đánh giá
					</Badge>
				)}
			</div>

			{/* Rating */}
			<div className="mb-4">
				<label className="block text-sm font-medium mb-2">
					Đánh giá sản phẩm <span className="text-red-500">*</span>
				</label>
				<div className="flex items-center gap-2">
					<StarRating
						value={formState.rating}
						onChange={handleRatingChange}
						disabled={disabled || formState.isSubmitted}
						size="lg"
					/>
					{formState.rating > 0 && (
						<span className="text-sm text-gray-600">
							({formState.rating} sao)
						</span>
					)}
				</div>
				{!isRatingValid && formState.rating === 0 && (
					<p className="text-xs text-gray-500 mt-1">Vui lòng chọn số sao</p>
				)}
			</div>

			{/* Comment */}
			<div className="mb-4">
				<label className="block text-sm font-medium mb-2">
					Nhận xét của bạn <span className="text-red-500">*</span>
				</label>
				<Textarea
					value={formState.comment}
					onChange={handleCommentChange}
					disabled={disabled || formState.isSubmitted}
					placeholder="Chia sẻ cảm nhận của bạn về sản phẩm này (tối thiểu 20 ký tự)..."
					className="min-h-[100px] resize-none"
					maxLength={1000}
				/>
				<div className="flex justify-between items-center mt-1">
					<div>
						{commentLength > 0 && !isCommentValid && (
							<p className="text-xs text-red-500 flex items-center gap-1">
								<AlertCircle className="w-3 h-3" />
								{commentLength < 20
									? `Cần thêm ${20 - commentLength} ký tự`
									: "Vượt quá giới hạn"}
							</p>
						)}
						{isCommentValid && (
							<p className="text-xs text-green-600 flex items-center gap-1">
								<CheckCircle2 className="w-3 h-3" />
								Hợp lệ
							</p>
						)}
					</div>
					<p
						className={cn(
							"text-xs",
							commentLength > 1000
								? "text-red-500"
								: commentLength >= 20
									? "text-green-600"
									: "text-gray-400",
						)}
					>
						{commentLength}/1000
					</p>
				</div>
			</div>

			{/* Image Upload */}
			<div>
				<label className="block text-sm font-medium mb-2">
					Hình ảnh (tùy chọn)
				</label>
				<ImagePicker
					images={formState.images}
					imagePreviews={formState.imagePreviews}
					onChange={handleImagesChange}
					disabled={disabled || formState.isSubmitted}
					maxImages={10}
				/>
			</div>

			{/* Error Message */}
			{formState.error && (
				<div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg">
					<p className="text-sm text-red-700 flex items-center gap-2">
						<AlertCircle className="w-4 h-4" />
						{formState.error}
					</p>
				</div>
			)}
		</Card>
	);
}
