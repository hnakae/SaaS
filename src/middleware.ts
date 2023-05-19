export { default } from "next-auth/middleware";

export const config = {
  //anything that does NOT start with /register or /api or /login
  //these are white listed url structures
  // matcher: ["/((?!register|api|login).*)"],
  matcher: ["/dashboard", "/profile"],
};
