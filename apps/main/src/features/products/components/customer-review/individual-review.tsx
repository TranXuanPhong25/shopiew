import Image from "next/image";
import { MoreVertical, Star, ThumbsUp } from "lucide-react";
import type { Review } from "@/features/reviews";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface IndividualReviewProps {
	review: Review;
	onMarkHelpful: (reviewId: string) => void;
}

export default function IndividualReview({
	review,
	onMarkHelpful,
}: IndividualReviewProps) {
	const formatDate = (dateString: string) => {
		try {
			return formatDistanceToNow(new Date(dateString), {
				addSuffix: true,
				locale: vi,
			});
		} catch {
			return dateString;
		}
	};

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`w-4 h-4 ${
					i < rating
						? "fill-yellow-300 text-yellow-300"
						: "fill-gray-200 text-gray-200"
				}`}
			/>
		));
	};

	return (
		<div className="border-b pb-6 mb-2">
			<div className="flex items-start gap-3">
				<div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-200">
					<div className="w-full h-full flex items-center justify-center text-gray-600 font-semibold">
						{review.username.charAt(0).toUpperCase()}
					</div>
				</div>
				<div className="flex-1">
					<div className="flex justify-between">
						<div>
							<div className="font-medium">{review.username}</div>
							<div className="flex">{renderStars(review.rating)}</div>
						</div>
						<button className="text-gray-400">
							<MoreVertical className="w-5 h-5" />
						</button>
					</div>

					<div className="text-sm text-gray-500 mt-1">
						{formatDate(review.createdAt)}
					</div>

					{/* Review Content */}
					{review.comment && (
						<div className="mt-2">
							<p className="text-gray-700">{review.comment}</p>
						</div>
					)}

					{/* Like Button */}
					<div className="mt-3 flex items-center text-gray-500">
						<button
							className="flex items-center gap-1 hover:text-primary transition-colors"
							onClick={() => onMarkHelpful(review.id.toString())}
						>
							<ThumbsUp className="w-4 h-4" />
							<span>Helpful</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
