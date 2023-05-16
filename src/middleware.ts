export { default } from "next-auth/middleware";

// secure certain pages. dashboard, and app directory
export const config = {
  matcher: ["/dashboard", "/app/:path*", "/other/:path*", "/help/:path*"],
};
