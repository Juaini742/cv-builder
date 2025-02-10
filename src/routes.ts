export const authRoutes = ["/sign-in", "/sign-up"];

const protectedApi = ["api/cv", "api/cv/[id]", "api/user"];

export const protectedRoutes = [
  "/dashboard",
  "/dashboard/cv/[id]",
  "/dashboard/create-cv",
  "/profile",
  "/setting",
  ...protectedApi,
];

export const DEFAULT_REDIRECT_PATH = "/dashboard";
