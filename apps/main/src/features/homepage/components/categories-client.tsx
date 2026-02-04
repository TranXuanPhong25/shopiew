"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import MoveBackCarouselBtn from "@/components/carousel/move-back-carousel-btn";
import MoveNextCarouselBtn from "@/components/carousel/move-next-carousel-btn";
import { ProductCategory } from "../../product-categories/types";

const CategoryItem = ({ category }: { category: ProductCategory }) => (
	<Link 
		href={`/categories/${category.id}`}
		className="group block"
	>
		<div className="flex flex-col items-center gap-2 text-center p-2 rounded-xl transition-all duration-200 hover:bg-brand-50 group-focus-visible:ring-2 group-focus-visible:ring-brand-500">
			<div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 group-hover:from-brand-50 group-hover:to-brand-100 transition-colors shadow-sm">
				<Image
					src={category.imageUrl || "/purple_cry_face.png"}
					alt=""
					width={32}
					height={32}
					className="h-6 w-6 sm:h-7 sm:w-7 transition-transform group-hover:scale-110"
					aria-hidden="true"
				/>
			</div>
			<span className="text-xs font-medium text-gray-700 line-clamp-2 min-h-[2rem] px-1 group-hover:text-brand-600 transition-colors">
				{category.name || "Category"}
			</span>
		</div>
	</Link>
);

function CategoryNav({ categories }: { categories: ProductCategory[] }) {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ align: "start", loop: true, skipSnaps: false },
		[Autoplay({ delay: 4000, stopOnInteraction: true })]
	);
	const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
	const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi]
	);
	const scrollNext = useCallback(
		() => emblaApi && emblaApi.scrollNext(),
		[emblaApi]
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		setPrevBtnEnabled(emblaApi.canScrollPrev());
		setNextBtnEnabled(emblaApi.canScrollNext());
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on("select", onSelect);
		emblaApi.on("reInit", onSelect);
	}, [emblaApi, onSelect]);

	return (
		<>
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex">
					{categories.map(
						(category, index) =>
							index < categories.length / 2 && (
								<div key={index} className="min-w-[120px] sm:min-w-[140px] flex flex-col">
									<CategoryItem
										key={category.id}
										category={category}
									/>
									{categories[Math.floor(categories.length / 2) + index] && (
										<CategoryItem
											key={categories[Math.floor(categories.length / 2) + index]?.id}
											category={categories[Math.floor(categories.length / 2) + index]}
										/>
									)}
								</div>
							)
					)}
				</div>
			</div>
			<MoveBackCarouselBtn
				position={"left-0"}
				hover={"-left-1"}
				scrollPrev={scrollPrev}
				prevBtnEnabled={prevBtnEnabled}
			/>
			<MoveNextCarouselBtn
				position={"right-0"}
				hover={"-right-1"}
				scrollNext={scrollNext}
				nextBtnEnabled={nextBtnEnabled}
			/>
		</>
	);
}

// Client component handles UI interactions
export function CategoriesClient({
	categories,
}: {
	categories: ProductCategory[];
}) {
	const placeholderCategories: ProductCategory[] = Array.from({
		length: 20,
	}).map((_, index) => ({
		id: index + 1,
		name: `Category ${index + 1}`,
		imageUrl: "/purple_cry_face.png",
	}));

	return (
		<nav aria-label="Product categories">
			<CategoryNav
				categories={categories.length ? categories : placeholderCategories}
			/>
		</nav>
	);
}
