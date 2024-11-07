"use client"

import * as React from "react"
import { useSelector } from 'react-redux'

import {AudioWaveform,BookOpen,Bot, Command,Frame,GalleryVerticalEnd, Map, 
  PieChart,Settings2,SquareTerminal,CircleFadingPlus, FilePen, ChartNoAxesCombined, Users
} from "lucide-react"

import { NavMain } from "@/app/components/Admin/sidebar/nav-main"
import { NavProjects } from "@/app/components/Admin/sidebar/nav-projects"
import { NavUser } from "@/app/components/Admin/sidebar/nav-user"
import { TeamSwitcher } from "@/app/components/Admin/sidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/app/components/ui/sidebar"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
 
  const {  user } = useSelector((state: any) => state.auth)
 
  const data = {
    user: {
      name: user.name,
      email: user.email,
      avatar: user.avatar.url,
    },
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
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Dashboard",
            url: "/admin",
          },
          {
            title: "Profile",
            url: "/profile",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Data",
        url: "#",
        icon: Users,
        items: [
          {
            title: "Users",
            url: "/admin/users",
          },
          {
            title: "Invoices",
            url: "/admin/invoices",
          },
        ],
      },
      {
        title: "Content",
        url: "#",
        icon: CircleFadingPlus,
        items: [
          {
            title: "Create Course",
            url: "/admin/create-course",
          },
          {
            title: "Live Course",
            url: "/admin/courses",
          },
        ],
      },
      {
        title: "Customization",
        url: "#",
        icon: FilePen,
        items: [
          {
            title: "Hero",
            url: "#",
          },
          {
            title: "FAQ",
            url: "#",
          },
          {
            title: "Course Categories",
            url: "#",
          },
        ],
      }, 
      {
        title: "Analytics",
        url: "#",
        icon: ChartNoAxesCombined,
        items: [
          {
            title: "Courses Analytics",
            url: "#",
          },
          {
            title: "Orders Analytics",
            url: "#",
          },
          {
            title: "Users Analytics",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "/admin/team",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
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
    ],
  }
 
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
