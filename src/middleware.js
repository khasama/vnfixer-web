import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
  const cookieHeader = request.headers.get("cookie");

  const cookies = parseCookies(cookieHeader);
  // console.log(cookies);

  const role = cookies.ROLE;
  // console.log(role);

  // console.log(request.method);
  // console.log("URL", request.url);
  // const origin = request.headers;
  // console.log("load", origin);
  let token = "";
  let decoded = "";

  if (cookies?.access_token?.length > 0) {
    token = cookies?.access_token;
    decoded = jwtDecode(token);
  }
  if (
    request.url.includes("/manage/manager") &&
    decoded.agencyRole != "MANAGER"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
  if (request.url.includes("/manage/staff") && !decoded.agencyRole) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (request.url.includes("/my_request") && !decoded.role) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
function parseCookies(cookieHeader) {
  const cookies = {};
  if (cookieHeader) {
    cookieHeader.split(";").forEach((cookie) => {
      const parts = cookie.split("=");
      cookies[parts.shift().trim()] = decodeURI(parts.join("="));
    });
  }
  return cookies;
}

// export const config = {
//   matcher: "/*",
// };
