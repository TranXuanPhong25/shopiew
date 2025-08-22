"use client";
import {cn, scrollToSection} from "@/lib/utils";
import {useSectionsNav} from "@/hooks/use-sections-nav";

const sectionsNav = [
   { id: "basic-info-section", label: "Thông tin cơ bản" },
   { id: "products-detail-section", label: "Chi tiết sản phẩm" },
   { id: "sales-info-section", label: "Thông tin bán hàng" },
   { id: "shipping-section", label: "Vận chuyển" },
   { id: "others-info-section", label: "Thông tin khác" },
];

const VerticalSectionsNav = () => {
   const { currentTab } = useSectionsNav(sectionsNav);
   return (
      <div className=" z-10 bg-white h-fit  shadow-sm rounded-lg min-w-[220px] border-b-4 border[1px] border-gray-200 ">
         <ul className="flex flex-col !rounded-lg overflow-hidden p-2 font-semibold">
            {sectionsNav.map((section) => (
            <li
               key={section.id}
               onClick={() => scrollToSection(section.id)}
               className={cn(
                  (currentTab === section.id) ? "!text-gray-900 border-l-2 border-gray-900":"",
                  "  text-gray-500 hover:text-gray-800 first:pt-2 rounded-r-md  px-4 py-2 cursor-pointer hover:bg-gray-100 transition-colors",
               )}
            >
               {section.label}
            </li>
         ))}
         </ul>
      </div>

   )
}
export default VerticalSectionsNav;