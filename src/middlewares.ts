// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import type { Database } from "@/types/supabase";

// export async function middleware(req: NextRequest) {
//   const res = NextResponse.next({
//     request: {
//       headers: req.headers,
//     },
//   });

//   // Create a Supabase client configured to use cookies
//   const supabase = createMiddlewareClient<Database>({ req, res });

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   // Refresh session if expired - required for Server Components
//   await supabase.auth.getSession();

//   // if user is signed in and the current path is / redirect the user to /account
//   if (user && req.nextUrl.pathname === "/auth/login") {
//     return NextResponse.redirect(new URL("/profile", req.url));
//   }

//   // if user is not signed in and the current path is not / redirect the user to /
//   // if (!user && req.nextUrl.pathname !== '/') {
//   //   return NextResponse.redirect(new URL('/', req.url))
//   // }

//   return res;
// }

// // Ensure the middleware is only called for relevant paths.
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * Feel free to modify this pattern to include more paths.
//      */
//     "/",
//     "/profile",
//     "/((?!_next/static|_next/image|favicon.ico).*)",
//   ],
// };
