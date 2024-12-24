"use client";
import { TbPasswordFingerprint } from "react-icons/tb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/redux/apiClient/userApi";
import { IApiError } from "@/types";
import { CiLock } from "react-icons/ci";
import { FiEyeOff } from "react-icons/fi";
import { GoEye } from "react-icons/go";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/zodSchema/resetPasswordSchema";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const [resetPasswordHandler, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  async function onSubmit(formData: z.infer<typeof resetPasswordSchema>) {
    try {
      const bodyData = {
        password: formData.password,
      };
      await resetPasswordHandler({ token, bodyData }).unwrap();
      router.push("/login");
      toast.success("Your password reseted successfully.");
      form.reset();
    } catch (err: unknown) {
      const error = err as IApiError;
      const errorMessage = error?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  }

  return (
    <div className="w-full  min-h-screen max-h-[auto] flex items-center justify-center px-3">
      <Card className="w-full max-w-[500px] rounded-xl overflow-hidden flex flex-col justify-center items-center">
        {/* wave svg-- */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#006EEF"
            fillOpacity="1"
            d="M0,192L48,165.3C96,139,192,85,288,74.7C384,64,480,96,576,133.3C672,171,768,213,864,208C960,203,1056,149,1152,122.7C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
        <div className="border-[1px] border-gray-tertiary rounded-lg p-3">
          <TbPasswordFingerprint className="text-4xl text-gray-primary" />
        </div>

        <CardHeader className="px-2">
          <CardTitle className="font-primary text-2xl font-bold text-center">
            Set new passowrd
          </CardTitle>
          <CardDescription className="font-primary text-base text-gray-primary text-center">
            <p>Password must be 8 characters long.</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 flex flex-col items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 w-full lg:w-[400px] my-6"
            >
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="border-[1px] border-gray-tertiary rounded-lg py-2 px-3 flex items-center">
                        <CiLock className="text-2xl text-purple-500" />
                        <Input
                          placeholder="Confirm Password"
                          autoComplete="on"
                          type={showConfirmPassword ? "text" : "password"}
                          {...field}
                          className="outline-none border-none placeholder:text-placeholder focus-visible:ring-0 font-secondary text-base shadow-none"
                        />
                        {!showConfirmPassword ? (
                          <GoEye
                            onClick={toggleConfirmPassword}
                            className="text-2xl text-purple-500 cursor-pointer transition-all duration-300 hover:opacity-[.7]"
                          />
                        ) : (
                          <FiEyeOff
                            onClick={toggleConfirmPassword}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
