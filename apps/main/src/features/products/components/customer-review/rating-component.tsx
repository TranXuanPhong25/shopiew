import { Star } from "lucide-react";
import type { ReviewStats } from "@/features/reviews";

interface RatingComponentProps {
	stats: ReviewStats;
}

export default function RatingComponent({ stats }: RatingComponentProps) {
	const {
		averageRating,
		totalReviews,
		fiveStarCount,
		fourStarCount,
		threeStarCount,
		twoStarCount,
		oneStarCount,
	} = stats;

	const getPercentage = (count: number) => {
		if (totalReviews === 0) return 0;
		return Math.round((count / totalReviews) * 100);
	};

	const renderStars = (count: number) => {
		const stars = [];
		for (let i = 0; i < 5; i++) {
			stars.push(
				<Star
					key={i}
					className={`size-4 ${
						i < count
							? "fill-yellow-300 text-yellow-300"
							: "fill-gray-200 text-gray-200"
					}`}
				/>,
			);
		}
		return stars;
	};

	const ratingCounts = {
		5: fiveStarCount,
		4: fourStarCount,
		3: threeStarCount,
		2: twoStarCount,
		1: oneStarCount,
	};

	return (
		<div className="p-6 bg-white flex w-full gap-4">
			<div className="flex mb-4 flex-col gap-1">
				<span>
					<span className="font-semibold text-2xl">
						{averageRating.toFixed(1)}
					</span>{" "}
					out of 5
				</span>
				<div className="flex">{renderStars(Math.floor(averageRating))}</div>
				<span className="text-gray-500 text-sm">
					{totalReviews.toLocaleString()} review{totalReviews !== 1 ? "s" : ""}
				</span>
			</div>

			<div className="space-y-2 flex-1">
				{[5, 4, 3, 2, 1].map((rating) => {
					const count = ratingCounts[rating as keyof typeof ratingCounts] || 0;
					const percentage = getPercentage(count);

					return (
						<div key={rating} className="flex items-center">
							<span className="w-16 font-medium underline flex">
								{renderStars(rating)}
							</span>
							<div className="flex-1 h-5 bg-gray-200 rounded-full mx-2">
								<div
									className="h-full bg-yellow-300 rounded-full transition-all"
									style={{ width: `${percentage}%` }}
								/>
							</div>
							<span className="w-32 text-right text-gray-600">
								{count.toLocaleString()} ({percentage}%)
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}
