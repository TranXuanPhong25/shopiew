"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
	value: number;
	onChange: (rating: number) => void;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
}

const sizeClasses = {
	sm: "w-6 h-6",
	md: "w-8 h-8",
	lg: "w-10 h-10",
};

export function StarRating({
	value,
	onChange,
	disabled = false,
	size = "md",
}: StarRatingProps) {
	const [hoverRating, setHoverRating] = useState(0);

	const displayRating = hoverRating || value;

	return (
		<div className="flex items-center gap-1">
			{[1, 2, 3, 4, 5].map((star) => (
				<button
					key={star}
					type="button"
					disabled={disabled}
					onClick={() => !disabled && onChange(star)}
					onMouseEnter={() => !disabled && setHoverRating(star)}
					onMouseLeave={() => !disabled && setHoverRating(0)}
					className={cn(
						"transition-all duration-150",
						!disabled && "cursor-pointer hover:scale-110",
						disabled && "cursor-not-allowed opacity-50",
					)}
				>
					<Star
						className={cn(
							sizeClasses[size],
							"transition-colors",
							star <= displayRating
								? "fill-yellow-400 text-yellow-400"
								: "fill-gray-200 text-gray-300",
						)}
					/>
				</button>
			))}
		</div>
	);
}
