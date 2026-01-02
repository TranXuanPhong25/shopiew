"use client";
import { usePromoBars } from "../hooks/use-promo-bar";

export default function PromoTopBar() {
	const { bars, isLoading, activeBar } = usePromoBars();
	return (
		<div>
			{!isLoading && bars && bars.length > 0 && (
				<div
					className="text-center py-2 px-4 transition-colors duration-500"
					style={{
						backgroundColor: activeBar.backgroundColor,
						color: activeBar.textColor,
					}}>
					<p className="text-sm md:text-base">{activeBar.message}</p>
				</div>
			)}
		</div>
	);
}
