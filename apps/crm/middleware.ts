import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { paths } from "crmui";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("access_token");
  if (
    (url.pathname.startsWith(paths.login({})) && token) ||
    (url.pathname === paths.crmRoot({}) && token)
  ) {
    url.pathname = paths.home({});
    return NextResponse.redirect(url);
  }
  if (url.pathname === paths.crmRoot({} && !token)) {
    url.pathname = paths.login({});
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: "/crm/:path*",
};
