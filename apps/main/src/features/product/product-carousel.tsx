"use client"
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay"

import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import MoveBackCarouselBtn from "@/components/carousel/move-back-carousel-btn";
import MoveNextCarouselBtn from "@/components/carousel/move-next-carousel-btn";

export default function ProductCarousel({children}:{children:React.ReactNode} ) {
    const [emblaRef, emblaApi] = useEmblaCarousel({loop:false, align: "start"}, [Autoplay()])
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setPrevBtnEnabled(emblaApi.canScrollPrev())
        setNextBtnEnabled(emblaApi.canScrollNext())
    }, [emblaApi])


    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on("select", onSelect)
        emblaApi.on("reInit", onSelect)
    }, [emblaApi, onSelect])

    return (
        <div className="relative ">
            <div className="overflow-hidden  rounded-md" ref={emblaRef}>
                <div className='flex '>
                    {children}
                </div>
            </div>
            <MoveBackCarouselBtn position={"-left-4"} hover={"-left-0"} scrollPrev={scrollPrev} prevBtnEnabled={prevBtnEnabled}/>
            <MoveNextCarouselBtn position={"-right-4"} hover={"-right-0"} scrollNext={scrollNext} nextBtnEnabled={nextBtnEnabled}/>
        </div>
    )
}


