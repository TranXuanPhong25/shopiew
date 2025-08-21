"use client";
import { Button } from "@/components/ui/button";
import { cn, scrollToSection } from "@/lib/utils";
import { useSectionsNav} from "@/hooks/use-sections-nav";

const sectionsNav = [
   { id: "basic-info-section", label: "Thông tin cơ bản" },
   { id: "products-detail-section", label: "Chi tiết sản phẩm" },
   { id: "sales-info-section", label: "Thông tin bán hàng" },
   { id: "shipping-section", label: "Vận chuyển" },
   { id: "others-info-section", label: "Thông tin khác" },
];

const SectionsNav = () => {
   const { currentTab } = useSectionsNav(sectionsNav);
   return (
      <div className="sticky top-16 z-10 bg-slate-100 backdrop-blur-md grid w-full grid-cols-4 h-auto border-b-4 border-gray-200 mb-8 shadow-sm rounded-lg">
         {sectionsNav.map((section) => (
            <Button
               key={section.id}
               variant="ghost"
               onClick={() => scrollToSection(section.id)}
               className={cn(
                  (currentTab === section.id) ? "border-b-2 border-red-500 data-[state=active]:text-red-500 rounded-none py-3":"",
                  "rounded-none py-3 text-gray-600 hover:text-red-500 hover:border-red-500",
               )}
            >
               {section.label}
            </Button>
         ))}
      </div>

   )
}
export default SectionsNav;