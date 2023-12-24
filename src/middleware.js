import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(request) {
  const cookieHeader = request.headers.get("cookie");

  const cookies = parseCookies(cookieHeader);

  const role = cookies.ROLE;

  // console.log(request.method);
  // console.log("URL", request.url);
  // const origin = request.headers;
  // console.log("load", origin);
  // const token = cookies.access_token;
  // const decoded = jwtDecode(token);
  // console.log(decoded.agencyRole);

  if (request.url.includes("/manage") && role == "ADMIN") {
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
