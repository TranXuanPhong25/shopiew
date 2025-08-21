import {useMutation} from "@tanstack/react-query";
import {CreateProductData} from "@/features/products/model";
import {ProductsService} from "@/features/products/service";
import {useEffect, useState} from "react";


const useSectionsNav = (
    sectionsNav:{ id: string; label: string }[]
) => {
    const [currentTab, setCurrentTab] = useState<string>(sectionsNav[0].id);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setCurrentTab(entry.target.id)
                    }
                })
            },
            { threshold: 1 },
        )

        document.querySelectorAll("section[id]").forEach((section) => {
            observer.observe(section)
        })

        return () => observer.disconnect()
    }, [])
    return {
        currentTab
    };
}
export {
    useSectionsNav
}