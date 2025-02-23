/* eslint-disable @next/next/no-img-element */

"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Lens } from "@/components/magicui/lens";
import {useCallback, useEffect, useState} from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {ChevronLeft, ChevronRight} from "lucide-react";
const images = [
    {
        src: "https://placehold.co/500x500.png",
        alt: "Mountain camp",
        title: "Mountain Retreat",
    },
    {
        src: "https://placehold.co/501x501.png",
        alt: "Beach camp",
        title: "Coastal Getaway",
    },
    {
        src: "https://placehold.co/502x502.png",
        alt: "Forest camp",
        title: "Forest Adventure",
    },
    {
        src: "https://placehold.co/503x503.png",
        alt: "Desert camp",
        title: "Desert Expedition",
    },
    {
        src: "https://placehold.co/504x504.png",
        alt: "Desert camp",
        title: "Desert Expedition",
    },
    {
        src: "https://placehold.co/505x505.png",
        alt: "Desert camp",
        title: "Desert Expedition",
    },
    {
        src: "https://placehold.co/506x506.png",
        alt: "Desert camp",
        title: "Desert Expedition",
    },
]


export default function ProductImages() {
    const [selectedImage, setSelectedImage] = useState(images[0])
    const [emblaRef, emblaApi] = useEmblaCarousel({loop:true}, [Autoplay({
        delay: 5000,
    })])
    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    const onSlideSelect = useCallback(() => {
        if (!emblaApi) return
        const currentIndex = emblaApi.selectedScrollSnap()
        setSelectedIndex(currentIndex)
        setSelectedImage(images[currentIndex])
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSlideSelect()
        emblaApi.on("select", onSlideSelect)
        emblaApi.on("reInit", onSlideSelect)
    }, [emblaApi, onSlideSelect])

    return (
        <Card className="relative max-w-sm shadow-none  ">
            <CardHeader>
                <Lens
                    zoomFactor={2}
                    lensSize={150}
                    isStatic={false}
                    ariaLabel="Zoom Area"
                >
                    <img
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
                                        selectedIndex === index ? "ring-2 ring-custom-1" : "hover:ring-2 hover:ring-custom-1/40 opacity-80 hover:opacity-100"
                                    }`}
                                    key={index}
                                    onClick={() => {
                                        emblaApi?.scrollTo(index)
                                    }}
                                >
                                    <img
                                        src={slide.src || "/placeholder.svg"}
                                        alt={slide.alt}
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
                        <ChevronLeft className="w-5 h-5"/>
                    </button>
                    <button
                        className="absolute top-1/2 -right-2 transform -translate-y-1/2 bg-white/90 rounded-l-full p-1"
                        onClick={scrollNext}
                    >
                        <ChevronRight className="w-5 h-5"/>
                    </button>
                </div>
            </CardFooter>
        </Card>
    );
}
