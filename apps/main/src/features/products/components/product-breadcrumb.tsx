import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useProductPageContext } from "../context";

export default function ProductBreadcrumb() {
   const { product: { categoryPath, name } } = useProductPageContext();
   return (
      <Breadcrumb className=" px-4 mb-4">
         <BreadcrumbList>
            <BreadcrumbItem>
               <BreadcrumbLink asChild>
                  <Link href="/" className="text-custom-1/80 hover:text-custom-1">Shopiew</Link>
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {
               categoryPath.map((category, index) => (
                  <div key={category.id} className="flex items-center gap-3">
                     <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                           <Link href={`/categories/${category.slug || category.id}`} className="line-clamp-1 text-ellipsis">
                              {category.name}
                           </Link>
                        </BreadcrumbLink>
                     </BreadcrumbItem>
                        {index < categoryPath.length - 1 && <BreadcrumbSeparator />}
                  </div>
               ))
            }
            <BreadcrumbSeparator />
            <BreadcrumbItem className="flex-1">
               <BreadcrumbPage className="line-clamp-1 text-ellipsis">
                  {name}
               </BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   )
}