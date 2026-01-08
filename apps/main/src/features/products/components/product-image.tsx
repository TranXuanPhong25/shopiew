"use client";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Lens } from "@/components/magicui/lens";
import { useCallback, useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useVariantSelectionStore } from "@/stores/variant-selection-store";

interface Props {
	src: string;
	alt: string;
}
export default function ProductImages({ images }: { images: Props[] }) {
	const [selectedImage, setSelectedImage] = useState(images[0]);
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
		Autoplay({
			delay: 5000,
		}),
	]);
	const [selectedIndex, setSelectedIndex] = useState(0);
	// FIX: idk why variantsImages is needed here
	const variantsImages = useVariantSelectionStore((state) => state.variants);
	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const onSlideSelect = useCallback(() => {
		if (!emblaApi) return;
		const currentIndex = emblaApi.selectedScrollSnap();
		setSelectedIndex(currentIndex);
		setSelectedImage(images[currentIndex]);
	}, [emblaApi]);

	useEffect(() => {
		if (!emblaApi) return;
		onSlideSelect();
		emblaApi.on("select", onSlideSelect);
		emblaApi.on("reInit", onSlideSelect);
	}, [emblaApi, onSlideSelect]);

	return (
		<Card className="relative max-w-sm shadow-none  ">
			<CardHeader>
				<Lens
					zoomFactor={2}
					lensSize={150}
					isStatic={false}
					ariaLabel="Zoom Area"
				>
					<Image
						src={selectedImage.src}
						alt={selectedImage.alt}
						width={500}
						height={500}
					/>
				</Lens>
			</CardHeader>

			<CardFooter className="mt-1">
				<div className="relative">
					<div className="overflow-hidden" ref={emblaRef}>
						<div className="flex">
							{images.map((slide, index) => (
								<div
									className={`relative flex-[0_0_25%] min-w-0 cursor-pointer m-1 rounded-md ${
										selectedIndex === index
											? "ring-2 ring-custom-1"
											: "hover:ring-2 hover:ring-custom-1/40 opacity-80 hover:opacity-100"
									}`}
									key={index}
									onClick={() => {
										emblaApi?.scrollTo(index);
									}}
								>
									<Image
										src={
											slide.src || "https://placehold.co/500x500.png"
										}
										alt={slide.alt}
										width={500}
										height={500}
										className="h-20 w-full object-cover rounded-md"
									/>
								</div>
							))}
						</div>
					</div>
					<button
						className="absolute top-1/2 -left-2 transform -translate-y-1/2 bg-white/90 rounded-r-full p-1 "
						onClick={scrollPrev}
					>
						<ChevronLeft className="w-5 h-5" />
					</button>
					<button
						className="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-white/90 rounded-l-full p-1"
						onClick={scrollNext}
					>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
			</CardFooter>
		</Card>
	);
}
