"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EventBanner, POSITION_OPTIONS } from "../types";

// Client component chỉ handle UI interactions
export function EventBannerClient({ events }: { events: EventBanner[] }) {
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	const scrollPrev = React.useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = React.useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	React.useEffect(() => {
		if (!emblaApi) return;
		const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
		emblaApi.on("select", onSelect);
		onSelect(); // Set the initial selected index
		return () => {
			emblaApi.off("select", onSelect);
		};
	}, [emblaApi]);

	const mainEvents = events.filter(
		(event) =>
			event.position === "main" ||
			event.position === POSITION_OPTIONS?.[0]?.value
	);
	const sideEvents = events.filter(
		(event) =>
			event.position === "sidebar" ||
			event.position === POSITION_OPTIONS?.[1]?.value
	);

	return (
		<>
			<div className="relative flex-1 group">
				<div className="overflow-hidden relative rounded-lg" ref={emblaRef}>
					<div className="flex rounded-lg">
						{mainEvents.map((event, index) => (
							<div className="flex-[0_0_100%] min-w-0" key={event.id}>
								<Card className="mx-1 my-4 border-0">
									<div className="relative aspect-[16/7]">
										<Image
											src={event.imageUrl}
											alt={event.title || "event-" + index}
											fill
											className="object-cover rounded-lg"
										/>
									</div>
								</Card>
							</div>
						))}
					</div>
					<div className="flex justify-center gap-2 mt-2 absolute bottom-0 -translate-y-[24px] left-1/2 -translate-x-1/2">
						{/*dot navigation*/}
						{mainEvents.map((_, index) => (
							<Button
								key={index}
								variant="ghost"
								size="icon"
								className={cn(
									" rounded-full hover:bg-custom-1/100 transition-all duration-300 h-2 ease-in-out border ",
									index === selectedIndex
										? "bg-custom-1/90 h-2 w-6"
										: "bg-custom-1/30 w-4 "
								)}
								onClick={() => emblaApi?.scrollTo(index)}
							/>
						))}
					</div>
				</div>
				<Button
					variant="outline"
					size="icon"
					className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hidden group-hover:flex "
					onClick={scrollPrev}
				>
					<ChevronLeft className="h-4 w-4" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hidden group-hover:flex"
					onClick={scrollNext}
				>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</div>
			{/*side banner*/}
			<div className="py-4 md:pl-4 flex flex-col justify-between">
				{sideEvents.map((event, index) => (
					<div key={index} className="mb-4">
						<Image
							src={event.imageUrl}
							alt={event.title || "side-banner-" + index}
							width={440}
							height={160}
							style={{ height: "160px", width: "440px" }}
							className="rounded-lg"
						/>
					</div>
				))}
			</div>
		</>
	);
}
