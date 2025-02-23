"use client"

import * as React from "react"
import Image from "next/image"
import {ChevronLeft, ChevronRight} from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"

import {Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"

// Sample event data
const events = [
    {id: 1, imageUrl: "https://placehold.co/1600x900.png"},
    {id: 2, imageUrl: "https://placehold.co/1400x800.png"},
    {id: 3, imageUrl: "https://placehold.co/1400x700.png"},
    {id: 4, imageUrl: "https://placehold.co/1200x600.png"}


]

export function EventBannerCarousel() {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop: true}, [Autoplay()])

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev()
    }, [emblaApi])

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext()
    }, [emblaApi])

    return (
        <div className="relative flex my-4 px-4 bg-white rounded-2xl shadow-sm group">
            <div className="relative flex-1">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {events.map((event, index) => (
                            <div className="flex-[0_0_100%] min-w-0" key={event.id}>
                                <Card className="mx-1 my-4 border-0">
                                    <div className="relative aspect-[16/7]">
                                        <Image
                                            src={event.imageUrl}
                                            alt={"event-" + index}
                                            fill
                                            className="object-cover rounded-t-lg"
                                        />
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hidden group-hover:flex "
                    onClick={scrollPrev}
                >
                    <ChevronLeft className="h-4 w-4"/>
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm  hidden group-hover:flex"
                    onClick={scrollNext}
                >
                    <ChevronRight className="h-4 w-4"/>
                </Button>
            </div>
            {/*side banner*/}
            <div className="py-4 md:pl-4 flex flex-col justify-between">
                <Image
                    src="https://placehold.co/440x160.png"
                    alt="banner1"
                    width={440}
                    height={160}
                    style={{height: "160px",width:"440px"}}
                    className="rounded-lg"
                />
                <Image
                    src="https://placehold.co/440x160.png"
                    alt="banner2"
                    width={440}
                    height={160}
                    style={{height: "160px",width:"440px"}}
                    className="rounded-lg"
                />
            </div>
        </div>
    )
}

