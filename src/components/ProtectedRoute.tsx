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
    if (isError) {
      router.push("/login");
      dispatch(removeUserFromStore());
    }
    if (user?.isVerified === false) router.push("/resend-verify-code");
    if (!user) router.push("/login");
  }, [user, router, isError, dispatch]);

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
