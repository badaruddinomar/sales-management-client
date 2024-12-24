"use client";
import { useLayoutEffect, ComponentType } from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

const ProtectedRoute = <P extends object>(
  Component: ComponentType,
  allowedRoles: string[] = []
) => {
  return function Route(props: P) {
    const { user } = useAppSelector((state) => state.userReducer);

    useLayoutEffect(() => {
      if (!user) {
        redirect("/login");
      }

      const userRole = user?.role?.toLowerCase();

      // Check if the user's role is allowed to access the route
      if (!allowedRoles.includes(userRole)) {
        redirect("/login");
      }
    }, [user]);

    if (!user || !allowedRoles.includes(user?.role?.toLowerCase())) {
      return null;
    }

    return <Component {...props} />;
  };
};
export default ProtectedRoute;
