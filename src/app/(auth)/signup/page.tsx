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
import { CiMail } from "react-icons/ci";
import { FiEyeOff } from "react-icons/fi";
import { GoEye } from "react-icons/go";
import { CiLock } from "react-icons/ci";
import { RxAvatar } from "react-icons/rx";
import { useState } from "react";
import Link from "next/link";
import { signupSchema } from "@/zodSchema/signupSchema";

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof signupSchema>) {
    console.log(values);
  }
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="w-full px-3">
      {/* container-- */}
      <div className="w-full h-screen  max-w-[1360px] mx-auto flex items-center justify-between bg-[#fff] m-10 rounded-xl overflow-hidden">
        {/* left area-- */}
        <div className="w-1/2 hidden sm:block h-full">
          <Image
            src={"/login.png"}
            alt="login-image"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>
        {/* right area-- */}
        <div className="w-full sm:w-1/2 px-2 flex items-center justify-center flex-col">
          <div className="w-[80px] h-[80px] sm:w-[128px] sm:h-[128px]">
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-primary font-semibold text-2xl my-3">
            Hi, Welcome to Weno{" "}
          </h3>
          <p className="font-primary font-semibold text-base text-gray-primary">
            Sign Up with your email address
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full lg:w-[400px] my-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="border-[1px] border-gray-tertiary rounded-lg py-2 px-3 flex items-center">
                        <RxAvatar className="text-2xl text-purple-500" />
                        <Input
                          placeholder="Your name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="border-[1px] border-gray-tertiary rounded-lg py-2 px-3 flex items-center">
                        <CiMail className="text-2xl text-purple-500" />
                        <Input
                          placeholder="Your email"
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
                className="font-semibold text-base font-secondary py-3 text-[#fff] bg-blue-primary rounded-lg w-full hover:opacity-[.7] transition-all duration-300 hover:bg-blue-primary"
              >
                Submit
              </Button>
            </form>
          </Form>
          <p className="font-primary text-sm font-semibold text-gray-primary">
            Don’t have an account?{" "}
            <Link
              href={"/login"}
              className="text-dark-primary hover:opacity-[.7] transition-all duration-300"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
