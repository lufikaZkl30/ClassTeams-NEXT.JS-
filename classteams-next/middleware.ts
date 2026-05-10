import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isLoginPage =
    request.nextUrl.pathname.startsWith("/auth/login");

  // ❌ belum login → ke login
  if (!session && !isLoginPage) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  // ✅ sudah login → jangan balik login
  if (session && isLoginPage) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: ["/", "/auth/login"],
};