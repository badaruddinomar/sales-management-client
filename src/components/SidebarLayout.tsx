"use client";
import { AppSidebar } from "@/components/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/redux/hooks";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppSelector((state) => state.userReducer);
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex px-4 h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear 
         group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12  bg-[#FAFAFA]"
        >
          <div className="flex items-center gap-2 ">
            <SidebarTrigger className="-ml-1" />
          </div>
          <div>
            <p className="h-10 w-10 overflow-hidden rounded-full bg-gray-200 flex items-center justify-center font-extrabold text-purple-500 text-2xl cursor-pointer">
              {user?.name.split(" ")[0].split("")[0]}
            </p>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
