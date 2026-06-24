import { NextResponse, type NextRequest } from "next/server";
import type { CookieOptions, CookieStore } from "@insforge/sdk/ssr";
import { updateSession } from "@insforge/sdk/ssr/middleware";

import { hasInsforgeConfig } from "@/lib/insforge-config";

const protectedRoutes = ["/dashboard", "/profile", "/find-jobs"];

function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

function createRequestCookieStore(request: NextRequest): CookieStore {
  return {
    get: (name: string) => request.cookies.get(name),
    set: () => undefined,
    delete: () => undefined,
  };
}

function createResponseCookieStore(response: NextResponse): CookieStore {
  type CookieObject = { name: string; value: string } & CookieOptions;
  type DeleteCookieObject = { name: string } & CookieOptions;

  function setCookie(
    name: string,
    value: string,
    options?: CookieOptions,
  ): unknown;
  function setCookie(options: CookieObject): unknown;
  function setCookie(
    nameOrOptions: string | CookieObject,
    value?: string,
    options?: CookieOptions,
  ): unknown {
    if (typeof nameOrOptions === "string") {
      return response.cookies.set(nameOrOptions, value ?? "", options);
    }

    const { name, value: cookieValue, ...cookieOptions } = nameOrOptions;
    return response.cookies.set(name, cookieValue, cookieOptions);
  }

  function deleteCookie(name: string): unknown;
  function deleteCookie(options: DeleteCookieObject): unknown;
  function deleteCookie(nameOrOptions: string | DeleteCookieObject): unknown {
    if (typeof nameOrOptions === "string") {
      return response.cookies.delete(nameOrOptions);
    }

    return response.cookies.delete(nameOrOptions.name);
  }

  return {
    get: (name: string) => response.cookies.get(name),
    set: setCookie,
    delete: deleteCookie,
  };
}

function copyResponseCookies(source: NextResponse, target: NextResponse): void {
  for (const cookie of source.cookies.getAll()) {
    target.cookies.set(cookie);
  }
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const response = NextResponse.next({ request });
  let accessToken: string | null = null;

  if (hasInsforgeConfig()) {
    const session = await updateSession({
      requestCookies: createRequestCookieStore(request),
      responseCookies: createResponseCookieStore(response),
    });

    accessToken = session.accessToken;
  }

  if (!accessToken && isProtectedRoute(request.nextUrl.pathname)) {
    const redirectResponse = NextResponse.redirect(new URL("/login", request.url));
    copyResponseCookies(response, redirectResponse);
    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/find-jobs/:path*"],
};
