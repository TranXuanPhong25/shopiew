"use client"

import * as React from "react"
import {
    AudioWaveform,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PackageOpenIcon,
    PieChart,
    Settings2,
    ShoppingCartIcon,
} from "lucide-react"

import {NavMain} from '@/components/layout/sidebar/nav-main'
import {NavProjects} from '@/components/layout/sidebar/nav-projects'
import {TeamSwitcher} from '@/components/layout/sidebar/team-switcher'
import {Sidebar, SidebarContent, SidebarHeader, SidebarRail,} from '@/components/ui/sidebar'

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Products",
      icon: PackageOpenIcon,
      isActive: true,
      items: [
        {
          title: "Collections",
          url: "/products/collections",
        },
        {
          title: "Publish new product",
          url: "/products/create",
        } 
      ],
    },
    {
      title: "Orders",
      icon: ShoppingCartIcon,
      items: [
        {
          title: "All Orders",
          url: "/orders",
        },
        {
          title: "Returned/Canceled Orders",
          url: "/orders/returned",
        },
        {
          title: "Delivery Management",
          url: "/orders/delivery-management",
        },
      ],
    },
    {
      title: "Customers Service",
      icon: Settings2,
      items: [
        {
          title: "Chats Management",
          url: "/customers-service/chats",
        },
        {
          title: "Reviews Management",
          url: "/customers-service/reviews",
        }
      ],
    },
    {
      title: "Developer Tools",
      icon: Command,
      items: [
        {
          title: "Mock Product Generator",
          url: "/tools/mock-product",
        }
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} variant="floating" >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
