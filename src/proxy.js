import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your_super_secret_key"
);
export async function proxy(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("auth_token")?.value || null;

// ADVANCED DIRECT ACCESS PROTECTION
// -------------------------------
const accept = req.headers.get("accept") || "";
const userAgent = req.headers.get("user-agent") || "";
const secFetchMode = req.headers.get("sec-fetch-mode") || "";
const secFetchSite = req.headers.get("sec-fetch-site") || "";
const method = req.method;
const isHTMLRequest = accept.includes("text/html");
const isNavigation = secFetchMode === "navigate";
const isCrossSite = secFetchSite && secFetchSite !== "same-origin";
const isBrowserUA =
  /(mozilla|chrome|safari|edge|firefox|opera|brave|bingbot|googlebot)/i.test(
    userAgent
  );
const isNotJSON = !accept.includes("application/json");
const isSuspiciousGET = method === "GET";
if (
  pathname.startsWith("/pages/api") &&
  (
    isHTMLRequest ||
    isNavigation ||
    isCrossSite ||
    isBrowserUA && isNotJSON ||
    isSuspiciousGET
  )
) {
  return new NextResponse(
    JSON.stringify({
      message: "Direct access not allowed",
      reason: {
        htmlRequest: isHTMLRequest,
        navigationAttempt: isNavigation,
        crossOrigin: isCrossSite,
        suspiciousUserAgent: isBrowserUA,
        blockedGET: isSuspiciousGET,
      },
    }),
    {
      status: 403,
      headers: { "Content-Type": "application/json" },
    }
  );
}
// ------------------------------------------------------------------------------------------------
  const publicPages = ["/login", "/register"];

  // 2️⃣ If token exists → verify
  if (token) {
    try {
      await jwtVerify(token, JWT_SECRET);
      if (publicPages.includes(pathname)) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      }
    } catch (error) {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("auth_token");
      return res;
    }
  } else {

    if (!publicPages.includes(pathname) && pathname !== "/") {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/pages/api/:path*",
    "/login",
    "/register",
  ],
};
