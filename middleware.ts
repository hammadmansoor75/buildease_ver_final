import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: ["/project-member"],
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};