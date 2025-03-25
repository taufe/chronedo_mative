import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;
  console.log("Middleware token ----", token);

  const protectedRoutes = [
    "/dashboard",
    "/messages",
    "/myPurchase",
    "/mySelling",
    "/myPromotings",
    "/invoices",
    "/watchlist",
    "/promotableWatches",
    "/myProfile",
    "/settings",
    "/mySubscriptions",
    "/product",
  ];

  if (!token && protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/messages/:path*",
    "/myPurchase/:path*",
    "/mySelling/:path*",
    "/myPromotings/:path*",
    "/invoices/:path*",
    "/watchlist/:path*",
    "/promotableWatches/:path*",
    "/myProfile/:path*",
    "/settings/:path*",
    "/mySubscriptions/:path*",
    "/product/:path*",
  ],
};


// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const token = request.cookies.get('token')?.value;
//   console.log('middle ware token----',token)
//   if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/dashboard/:path*'],
// };