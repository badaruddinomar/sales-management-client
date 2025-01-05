"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/zodSchema/loginSchema";
import { CiMail } from "react-icons/ci";
import { FiEyeOff } from "react-icons/fi";
import { GoEye } from "react-icons/go";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import { useUserLoginMutation } from "@/redux/apiClient/userApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IApiError } from "@/types";
import { useAppDispatch } from "@/redux/hooks";
import { addUserToStore } from "@/redux/reducer/userReducer";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [loginHandler, { isLoading }] = useUserLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onSubmit(formData: z.infer<typeof loginSchema>) {
    try {
      const response = await loginHandler(formData).unwrap();
      if (response?.data?.isVerified === false) {
        router.push("/verify-email");
        toast.error("Please verify your email.");
        return;
      }
      router.push("/");
      dispatch(addUserToStore(response?.data));
      const successMessage = "Login successful.";
      toast.success(successMessage);
      form.reset();
    } catch (err: unknown) {
      const error = err as IApiError;
      const errorMessage = error?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="w-full px-3">
      {/* container-- */}
      <div className="w-full h-screen  max-w-[1360px] mx-auto flex items-center justify-between bg-[#fff] m-10 rounded-xl">
        {/* left area-- */}
        <div className="w-full sm:w-1/2 px-2 flex items-center justify-center flex-col">
          <div className="w-[80px] h-[80px] sm:w-[128px] sm:h-[128px]">
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-primary font-semibold text-2xl my-3">
            Hi, Welcome to Weno{" "}
          </h3>
          <p className="font-primary font-semibold text-base text-gray-primary">
            Login with your email address
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full lg:w-[400px] my-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="border-[1px] border-gray-tertiary rounded-lg py-2 px-3 flex items-center">
                        <CiMail className="text-2xl text-purple-500" />
                        <Input
                          placeholder="Your email"
                          type="email"
                          {...field}
                          className="outline-none border-none placeholder:text-placeholder focus-visible:ring-0 font-secondary text-base shadow-none"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="font-primary" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="border-[1px] border-gray-tertiary rounded-lg py-2 px-3 flex items-center">
                        <CiLock className="text-2xl text-purple-500" />
                        <Input
                          placeholder="Password"
                          autoComplete="on"
                          type={showPassword ? "text" : "password"}
                          {...field}
                          className="outline-none border-none placeholder:text-placeholder focus-visible:ring-0 font-secondary text-base shadow-none"
                        />
                        {!showPassword ? (
                          <GoEye
                            onClick={togglePassword}
                            className="text-2xl text-purple-500 cursor-pointer transition-all duration-300 hover:opacity-[.7]"
                          />
                        ) : (
                          <FiEyeOff
                            onClick={togglePassword}
                            className="text-2xl text-purple-500 cursor-pointer transition-all duration-300 hover:opacity-[.7]"
                          />
                        )}
                      </div>
                    </FormControl>
                    <FormMessage className="font-primary" />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size={null}
                disabled={isLoading}
                className="font-semibold text-base font-secondary py-3 text-[#fff] bg-blue-primary rounded-lg w-full hover:opacity-[.7] transition-all duration-300 hover:bg-blue-primary"
              >
                {isLoading ? (
                  <LoadingSpinner
                    size={25}
                    color="#ffffff"
                    borderWidth="2px"
                    height="100%"
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
          <p className="font-primary text-sm font-semibold text-gray-primary">
            Don’t have an account?{" "}
            <Link
              href={"/signup"}
              className="text-dark-primary hover:opacity-[.7] transition-all duration-300"
            >
              Sign Up
            </Link>
          </p>
          <Link
            href={"/forgot-password"}
            className="flex justify-center my-2 items-center"
          >
            <Button
              size={"sm"}
              variant={"secondary"}
              className="font-secondary"
            >
              Forgot Password?
            </Button>
          </Link>
        </div>
        {/* right area-- */}
        <div className="w-1/2 hidden sm:block h-full">
          <Image
            src={"/login.png"}
            alt="login-image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover rounded-r-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
