"use client";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useVerifyEmailMutation } from "@/redux/apiClient/userApi";
import { IApiError } from "@/types";
import LoadingSpinner from "@/components/reusable/LoadingSpinner";

const VerifyEmailPage = () => {
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [verifyEmailHandler, { isLoading }] = useVerifyEmailMutation();
  const router = useRouter();

  const submitHandler = async () => {
    try {
      if (verifyCode.length !== 6) {
        toast.error("Enter a valid 6 digit verification code.");
        return;
      }
      const bodyData = { verificationCode: verifyCode };
      await verifyEmailHandler(bodyData).unwrap();
      router.push("/login");
      toast.success("Email verified successfully.");
    } catch (err: unknown) {
      const error = err as IApiError;
      const errorMessage = error?.data?.message || "Something went wrong.";
      toast.error(errorMessage);
    }
  };

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
        <CardHeader className="px-2">
          <CardTitle className="font-primary text-2xl font-bold text-center">
            Verify Email
          </CardTitle>
          <CardDescription className="font-primary text-base text-gray-primary text-center">
            <p>Enter the vefication code sent to your email address.</p>
          </CardDescription>
        </CardHeader>
        <CardContent className="px-2 flex flex-col items-center justify-center">
          <Image
            src={"/verify-email.png"}
            alt="verify-email-image"
            width={150}
            height={150}
            priority
          />
          <InputOTP
            maxLength={6}
            className="my-5"
            value={verifyCode}
            onChange={(value) => setVerifyCode(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-12 h-12" />
              <InputOTPSlot index={1} className="w-12 h-12" />
              <InputOTPSlot index={2} className="w-12 h-12" />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} className="w-12 h-12" />
              <InputOTPSlot index={4} className="w-12 h-12" />
              <InputOTPSlot index={5} className="w-12 h-12" />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter>
          <Button
            size={null}
            disabled={isLoading}
            onClick={submitHandler}
            className="font-semibold text-base font-secondary px-10 py-3 text-[#fff] bg-blue-primary rounded-lg w-full hover:opacity-[.7] transition-all duration-300 hover:bg-blue-primary"
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
