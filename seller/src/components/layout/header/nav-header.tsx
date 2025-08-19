import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { NavUser } from "./nav-user"
import Link from "next/link"
import { Store } from "lucide-react"
import NavBreadcrumb from "./nav-breadcrumb"
const NavHeader = () => {
  return (
    <header className="mx-2 sticky top-2 z-50  flex justify-between h-16 shrink-0 items-center gap-2 bg-white transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 shadow-sm border-b-4 border-[1px] border-b-gray-200 rounded-lg ">
      <div className="absolute bg-background w-full h-4 -top-[17px]"></div>
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <NavBreadcrumb/>

      </div>
      <div className="flex items-center gap-2 px-4">
        <Link href="/shop" className="text-sm font-semibold text-gray-700 hover:text-gray-900">
          <Store className="size-7 stroke-[1.5]" />
        </Link>
        <NavUser />
      </div>
    </header>
  )
}
export default NavHeader;