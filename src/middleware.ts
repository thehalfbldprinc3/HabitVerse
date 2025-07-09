import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  // Skip middleware for the Clerk webhook
  if (pathname === "/api/webhooks/clerk") {
    return NextResponse.next();
  }

  const session = await auth();
  const userId = session.userId;
  const isPublicRoute = pathname === "/";

  if (!userId && !isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"], // Match all routes excluding static assets
};