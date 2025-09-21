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
   const { product } = useProductPageContext();
   return (
      <Breadcrumb className=" px-4 mb-4">
         <BreadcrumbList>
            <BreadcrumbItem>
               <BreadcrumbLink asChild>
                  <Link href="/public" className="text-custom-1/80 hover:text-custom-1">Shopiew</Link>
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
               <BreadcrumbLink asChild>
                  <Link href="/src/componentsents"
                     className="text-custom-1/80 hover:text-custom-1">Components</Link>
               </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="flex-1">
               <BreadcrumbPage className="line-clamp-1 text-ellipsis">
                  {product.name}
               </BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   )
}