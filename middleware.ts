import { getUserProfile } from "@/lib/api";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const user = await getUserProfile();
  console.log(user);
  // If no token, redirect to login.
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if the user is verified.
  if (!user.isVerified) {
    return NextResponse.redirect(new URL("/resend-verify-code", request.url));
  }

  // Check if the user's role is allowed for this route.
  const allowedRoles = ["user"]; // Define roles allowed for this route.

  if (!allowedRoles.includes(user.role.toLowerCase())) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If all checks pass, allow access.
  return NextResponse.next();
}

// Apply middleware only to specific paths.
export const config = {
  matcher: ["/", "/products", "/units", "/categories", "/sales"],
};
