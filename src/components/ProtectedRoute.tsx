"use client";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/redux/apiClient/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeUserFromStore } from "@/redux/reducer/userReducer";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isError } = useGetUserQuery({});
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!user || isError) {
      router.push("/login");
      dispatch(removeUserFromStore());
    } else {
      if (user.isVerified === false) router.push("/resend-verify-code");
    }
  }, [user, router, isError, dispatch]);

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
