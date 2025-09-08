"use server"

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyJwt } from "@/lib/jwt";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const payload = verifyJwt<{ sub: string; plan: string }>(token);

  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Protege somente /dashboard (ou ajuste conforme precisar)
export const config = {
  matcher: ["/dashboard/:path*"],
};
