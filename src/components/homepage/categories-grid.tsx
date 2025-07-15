"use client"

import Image from "next/image"
import Link from "next/link"
import {useCallback, useEffect, useState} from "react"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import MoveBackCarouselBtn from "@/src/components/carousel/move-back-carousel-btn";
import MoveNextCarouselBtn from "@/src/components/carousel/move-next-carousel-btn";

type Category = {
    icon: string
    label: string
    href: string
    bgColor: string
}
const categories = [
    {icon: "/next.svg", label: "TOP DEAL", href: "/top-deal", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Tiki Trading", href: "/tiki-trading", bgColor: "bg-blue-50"},
    {icon: "/next.svg", label: "Coupon siêu hot", href: "/coupons", bgColor: "bg-purple-50"},
    {icon: "/next.svg", label: "Xả kho giảm nửa giá", href: "/clearance", bgColor: "bg-orange-50"},
    {icon: "/next.svg", label: "Hàng ngoại giá hot", href: "/international", bgColor: "bg-blue-50"},
    {icon: "/next.svg", label: "Sức Khoẻ Làm Đẹp", href: "/health-beauty", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Quà tặng Valentine", href: "/valentine", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Du Lịch Đầu Năm", href: "/travel", bgColor: "bg-blue-50"},
    {icon: "/next.svg", label: "Top Sách Bán Chạy", href: "/books", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Vitamin cho Bé", href: "/vitamins", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Sức Khoẻ Làm Đẹp", href: "/health-beauty", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "TOP DEAL", href: "/top-deal", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Tiki Trading", href: "/tiki-trading", bgColor: "bg-blue-50"},
    {icon: "/next.svg", label: "Coupon siêu hot", href: "/coupons", bgColor: "bg-purple-50"},
    {icon: "/next.svg", label: "Xả kho giảm nửa giá", href: "/clearance", bgColor: "bg-orange-50"},
    {icon: "/next.svg", label: "Hàng ngoại giá hot", href: "/international", bgColor: "bg-blue-50"},
    {icon: "/next.svg", label: "Sức Khoẻ Làm Đẹp", href: "/health-beauty", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Quà tặng Valentine", href: "/valentine", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Du Lịch Đầu Năm", href: "/travel", bgColor: "bg-blue-50"},
    {icon: "/next.svg", label: "Top Sách Bán Chạy", href: "/books", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Vitamin cho Bé", href: "/vitamins", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Sức Khoẻ Làm Đẹp", href: "/health-beauty", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Quà tặng Valentine", href: "/valentine", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Du Lịch Đầu Năm", href: "/travel", bgColor: "bg-blue-50"},
    {icon: "/next.svg", label: "Top Sách Bán Chạy", href: "/books", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Vitamin cho Bé", href: "/vitamins", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Sức Khoẻ Làm Đẹp", href: "/health-beauty", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Quà tặng Valentine", href: "/valentine", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Du Lịch Đầu Năm", href: "/travel", bgColor: "bg-blue-50"},
    {icon: "/next.svg", label: "Top Sách Bán Chạy", href: "/books", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Vitamin cho Bé", href: "/vitamins", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Sức Khoẻ Làm Đẹp", href: "/health-beauty", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Quà tặng Valentine", href: "/valentine", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Du Lịch Đầu Năm", href: "/travel", bgColor: "bg-blue-50"},
    {icon: "/next.svg", label: "Top Sách Bán Chạy", href: "/books", bgColor: "bg-pink-50"},
    {icon: "/next.svg", label: "Vitamin cho Bé", href: "/vitamins", bgColor: "bg-pink-50"},
]

const CategoryItem = ({category}: { category: Category }) => (
    <Link href={category.href}>
        <div className="flex flex-col items-center gap-1 text-center transition-colors hover:text-primary">
            <div
                className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg ${category.bgColor}`}>
                <Image
                    src={category.icon || "/placeholder.svg"}
                    alt={category.label}
                    width={24}
                    height={24}
                    className="h-5 w-5 sm:h-6 sm:w-6"
                />
            </div>
            <span className="text-xs font-medium text-gray-700 line-clamp-2 h-8 px-2">{category.label}</span>
        </div>
    </Link>
)

export default function CategoryNav() {
    const [emblaRef, emblaApi] = useEmblaCarousel({align: "start", loop: true, skipSnaps: false}, [
        Autoplay({delay: 4000, stopOnInteraction: true}),
    ])
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

    // Pair up categories
    const pairedCategories = categories.reduce((result: Category[][], item: Category, index) => {
        if (index % 2 === 0) {
            result.push([item, categories[index + 1]].filter(Boolean) as Category[])
        }
        return result
    }, [])

    return (
        <div className="w-full bg-white py-4 shadow-sm rounded-2xl">
            <div className="container mx-auto px-4 relative">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {pairedCategories.map((pair, index) => (
                            index % 2 == 1 && <div
                                key={index}
                                className="flex-[0_0_33.33%] min-w-0 sm:flex-[0_0_25%] md:flex-[0_0_20%] lg:flex-[0_0_16.66%] flex"
                            >
                                <div className="flex flex-col space-y-4">
                                    {pair.map((category, idx) => (
                                        <CategoryItem key={idx} category={category}/>
                                    ))}

                                </div>
                                <div className="flex flex-col space-y-4">
                                    {pairedCategories[index - 1].map((category, idx) => (
                                        <CategoryItem key={idx} category={category}/>
                                    ))}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
                <MoveBackCarouselBtn position={"left-0"} hover={"-left-1"} scrollPrev={scrollPrev}
                                     prevBtnEnabled={prevBtnEnabled}/>
                <MoveNextCarouselBtn position={"right-0"} hover={"-right-1"} scrollNext={scrollNext}
                                     nextBtnEnabled={nextBtnEnabled}/>
            </div>
        </div>
    )
}

