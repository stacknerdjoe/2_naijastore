import { auth } from "@/auth"
import { NextResponse } from "next/server"

const PROTECTED = ["/dashboard", "/checkout", "/orders"]
const AUTH_ROUTES = ["/auth/login", "/auth/register"]

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isProtected = PROTECTED.some((p) => nextUrl.pathname.startsWith(p))
  const isAuthRoute = AUTH_ROUTES.some((p) => nextUrl.pathname.startsWith(p))

  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl))
  }

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
