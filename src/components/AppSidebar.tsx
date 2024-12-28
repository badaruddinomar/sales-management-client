"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { sidebarLinks } from "@/data/sidebarLinks";
import { NavMain } from "./NavMain";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open: isSidebarOpen } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="">
        <div className="flex items-center space-x-3">
          <div className={`w-[30px] h-[30px]`}>
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          </div>
          {isSidebarOpen && (
            <p className="font-primary font-extrabold text-2xl">Weno</p>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent className="">
        {/* sidebar links-- */}
        <NavMain items={sidebarLinks} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
