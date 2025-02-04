import { NextResponse, type NextRequest } from "next/server";
import { auth as middleware } from "@/auth";
import { authRoutes, protectedRoutes } from "./routes";

export default async function auth(request: NextRequest) {
  const { nextUrl } = request;
  const session = await middleware();
  const isLoggedIn = !!session?.user;

  const isPublic = authRoutes.includes(nextUrl.pathname);
  const isProtected = protectedRoutes.includes(nextUrl.pathname);

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isLoggedIn && isPublic) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isProtected && isLoggedIn) {
    try {
      const user = session?.user;

      console.log("MIDDLEWARE USER:", user);

      if (!user || !user.email || !user.id) {
        const response = NextResponse.redirect(
          new URL("/sign-in", request.url)
        );
        response.cookies.delete("NextToken");
        return response;
      }

      return NextResponse.next();
    } catch (error) {
      console.error(error);
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      response.cookies.delete("NextToken");
      return response;
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
