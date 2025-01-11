"use client";
import { CiLogout } from "react-icons/ci";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { sidebarLinks } from "@/data/sidebarLinks";
import { NavMain } from "./NavMain";
import { useLogoutMutation } from "@/redux/apiClient/userApi";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { removeUserFromStore } from "@/redux/reducer/userReducer";
import { toast } from "sonner";
import { IApiError } from "@/types";
import LoadingSpinner from "../reusable/LoadingSpinner";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open: isSidebarOpen } = useSidebar();
  const [logout, { isLoading }] = useLogoutMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logoutHandler = async () => {
    try {
      await logout({}).unwrap();
      router.push("/login");
      dispatch(removeUserFromStore());
      const successMessage = "Logout successful.";
      toast.success(successMessage);
    } catch (err: unknown) {
      const error = err as IApiError;
      const errorMessage = error?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  };
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
      <SidebarContent>
        {/* sidebar links-- */}
        <NavMain items={sidebarLinks} />
      </SidebarContent>
      <SidebarFooter>
        <button
          disabled={isLoading}
          onClick={logoutHandler}
          className="flex items-center text-red-500 font-primary cursor-pointer justify-center space-x-2 py-2 border-t-[1px] border-[#eee] hover:opacity-[.5] transition-all duration-300"
        >
          {isLoading ? (
            <LoadingSpinner
              size={25}
              color="#000"
              borderWidth="2px"
              height="100%"
            />
          ) : (
            <>
              {isSidebarOpen ? (
                <>
                  <CiLogout /> <span>Logout</span>
                </>
              ) : (
                <CiLogout />
              )}
            </>
          )}
        </button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
