"use client";
import { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "@/redux/apiClient/userApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  addUserToStore,
  removeUserFromStore,
} from "@/redux/reducer/userReducer";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: userData, isError } = useGetUserQuery({});
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (isError) {
      router.push("/login");
      dispatch(removeUserFromStore());
    } else {
      dispatch(addUserToStore(userData?.data));
    }
  }, [router, userData?.data, isError, dispatch]);

  if (!user) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
