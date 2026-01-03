"use client";

import { useState, useEffect } from "react";
import { PromoBar } from "../types";

export function PromoTopBarClient({ bars }: { bars: PromoBar[] }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		if (bars.length <= 1) return;

		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % bars.length);
		}, 5000); // Chuyển đổi mỗi 5 giây

		return () => clearInterval(interval);
	}, [bars.length]);

	// Lọc active bars và sắp xếp theo order
	const activeBars = bars
		.filter((bar) => bar.isActive !== false)
		.sort((a, b) => (a.priority || 0) - (b.priority || 0));

	if (!isVisible || !activeBars.length) return null;

	const activeBar = activeBars[currentIndex] || activeBars[0];
	return (
		<div
			className="text-center py-2 px-4 transition-colors duration-500 relative"
			style={{
				backgroundColor: activeBar.backgroundColor || "#ff4757",
				color: activeBar.textColor || "#ffffff",
			}}>
			<p className="text-sm md:text-base">{activeBar.message}</p>

			{/* Close button */}
			<button
				onClick={() => setIsVisible(false)}
				className="absolute right-2 top-1/2 -translate-y-1/2 text-current hover:opacity-70 transition-opacity"
				aria-label="Đóng thông báo">
				×
			</button>
		</div>
	);
}
