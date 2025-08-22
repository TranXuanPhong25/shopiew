"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {slugsTransform} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React, {useEffect, useState} from "react";

const NavBreadcrumb = () => {
   const pathname = usePathname();
   const [pageTitle, setPageTitle] = useState("");

   useEffect(() => {
      // Access document.title only in useEffect to avoid hydration mismatch
      setPageTitle(document.title.replace(/ \|Shopiew.+/, ""));
   }, [pathname]);

   const pathnameParts = pathname.split('/').
      map(part => slugsTransform(part))
      .slice(1, -1)

   return (
      <Breadcrumb>
         <BreadcrumbList>
            {pathnameParts.map((part, index) => (
               <React.Fragment key={index}>
                  <BreadcrumbItem >
                     <BreadcrumbPage>
                        <BreadcrumbLink href={`/${pathnameParts.slice(0, index + 1).join('/')}`} asChild>
                           <Link
                              href={`/${pathnameParts.slice(0, index + 1).join('/')}`}
                              className={"text-sm font-semibold text-muted-foreground hover:text-gray-700"}
                           >
                              {part}
                           </Link>
                        </BreadcrumbLink>
                     </BreadcrumbPage>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
               </React.Fragment>
            ))}
            <BreadcrumbItem>
               <BreadcrumbPage>
                  <BreadcrumbLink asChild>
                     <span className="font-semibold">{pageTitle}</span>
                  </BreadcrumbLink>
               </BreadcrumbPage>
            </BreadcrumbItem>
         </BreadcrumbList>
      </Breadcrumb>
   )
}

export { NavBreadcrumb }
export default NavBreadcrumb;