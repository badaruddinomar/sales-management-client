import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/redux/ReduxProvider";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});
const sfPro = localFont({
  src: [
    {
      path: "../app/fonts/SF-Pro-Display-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/fonts/SF-Pro-Display-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../app/fonts/SF-Pro-Display-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../app/fonts/SF-Pro-Display-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
});
export const metadata: Metadata = {
  title: "Slaes Pro",
  description:
    "Slaes Prop is a platform where you can keep your sales records.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${sfPro.variable} antialiased bg-[#E8e8e8]`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <Toaster position="bottom-right" richColors />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
