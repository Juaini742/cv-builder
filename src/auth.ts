import NextAuth from "next-auth";
import { prisma } from "./lib/prisma";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/sign-in",
    error: "/error",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url === "/sign-in") return `${baseUrl}/`;
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
