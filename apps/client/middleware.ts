import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as paths from "./src/paths";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === paths.categories({})) {
    url.pathname = paths.root({});
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: "/:path*",
};