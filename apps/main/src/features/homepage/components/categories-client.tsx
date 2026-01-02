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
	<Link href="/categories">
		<div className="flex flex-col items-center gap-1 text-center transition-colors hover:text-primary">
			<div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg">
				<Image
					src={category.imageUrl || "/purple_cry_face.png"}
					alt={category.name}
					width={24}
					height={24}
					className="h-5 w-5 sm:h-6 sm:w-6"
				/>
			</div>
			<span className="text-xs font-medium text-gray-700 line-clamp-2 h-8 px-2">
				{category.name}
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
								<div key={index} className="min-w-40 flex flex-col">
									<CategoryItem
										key={category.id}
										category={category}
									/>
									<CategoryItem
										key={
											categories[categories.length / 2 + index]?.id
										}
										category={
											categories[categories.length / 2 + index]
										}
									/>
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

// Client component chỉ handle UI interactions
export function CategoriesClient({
	categories,
}: {
	categories: ProductCategory[];
}) {
	const placeholderCategories: ProductCategory[] = Array.from({
		length: 20,
	}).map((_, index) => ({
		id: index + 1,
		name: ``,
		imageUrl: "/purple_cry_face.png",
	}));

	return (
		<CategoryNav
			categories={categories.length ? categories : placeholderCategories}
		/>
	);
}
