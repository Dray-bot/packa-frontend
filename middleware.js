import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();

  if (!isPublicRoute(req) && !userId) {
    return auth().protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};