import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "better-auth/types";

export default async function middleware(request: NextRequest) {
  const url = new URL(request.url);

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: url.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );

  // Protected Route Logic
  if (url.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/", url));
    }
  }

  // Auth Route Logic
  if (url.pathname === "/") {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", url));
    }
  }

  // CORRECT: Tell Next.js to continue to the actual route handler
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
