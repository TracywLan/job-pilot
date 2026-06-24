import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { createAuthActions } from "@insforge/sdk/ssr";

const CODE_VERIFIER_COOKIE = "insforge_code_verifier";

function redirectToLogin(request: NextRequest): NextResponse {
  const response = NextResponse.redirect(new URL("/login?error=oauth", request.url));
  response.cookies.delete(CODE_VERIFIER_COOKIE);
  return response;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const code = request.nextUrl.searchParams.get("insforge_code");
    const verifier = (await cookies()).get(CODE_VERIFIER_COOKIE)?.value;

    if (!code || !verifier) {
      return redirectToLogin(request);
    }

    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    const auth = createAuthActions({
      requestCookies: request.cookies,
      responseCookies: response.cookies,
    });
    const { error } = await auth.exchangeOAuthCode(code, verifier);

    if (error) {
      console.error("[api/auth/callback]", error);
      return redirectToLogin(request);
    }

    response.cookies.delete(CODE_VERIFIER_COOKIE);
    return response;
  } catch (error) {
    console.error("[api/auth/callback]", error);
    return redirectToLogin(request);
  }
}
