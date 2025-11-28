import { NextResponse } from "next/server";
export function proxy(req) {
  const url = req.nextUrl.clone();
console.log("Proxy is running")
  return NextResponse.next();
}


export const config = {
  matcher: ["/", "/api/external/:path*"],
};
