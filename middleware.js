import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
export async function middleware(req) {
  const { pathname, origin } = req.nextUrl;

  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  if (pathname == "/checkout") {
    if (!session) return NextResponse.redirect(`${origin}`);
  }
  if (pathname.startsWith("/order")) {
    if (!session) return NextResponse.redirect(`${origin}`);
  }
  if (pathname.startsWith("/profile")) {
    if (!session) return NextResponse.redirect(`${origin}`);
  }
  if (pathname.startsWith("/admin")) {
    if (!session) return NextResponse.redirect(`${origin}`);
    if (session.role !== "admin") return NextResponse.redirect(`${origin}`);
  }
}
