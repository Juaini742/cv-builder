import NextAuth from "next-auth";
import { prisma } from "./lib/prisma";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getAccountData } from "./lib/get.account.data";

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
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.uid = user.id;
      }

      if (account && profile) {
        token.uid = user.id;

        if (account?.provider === "google") {
          token.provider = account.provider;
          token.emailVerified = profile.email_verified ? new Date() : null;
        }
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url === "/sign-in") return `${baseUrl}/`;
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async signIn({ user, profile, account }) {
      if (!account?.provider || !user.email || !user.id) return false;

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: user.id,
            email: user.email,
            emailVerified: profile?.email_verified ? new Date() : null,
            Profile: {
              create: {
                name: user.name,
                image: user.image,
              },
            },
            accounts: {
              create: getAccountData(user.id, account),
            },
          },
        });
      }

      await prisma.user.update({
        where: { email: user.email },
        data: { emailVerified: profile?.email_verified ? new Date() : null },
      });

      await prisma.profile.upsert({
        where: { userId: user.id },
        update: {
          name: user.name,
          image: user.image,
        },
        create: {
          userId: user.id,
          name: user.name,
          image: user.image,
        },
      });

      await prisma.account.upsert({
        where: {
          provider_providerAccountId: {
            provider: account.provider,
            providerAccountId: account.providerAccountId,
          },
        },
        update: getAccountData(user.id, account),
        create: {
          userId: user.id,
          type: account.type,
          provider: account.provider,
          providerAccountId: account.providerAccountId,
          access_token: account.access_token ?? undefined,
          expires_at: account.expires_at ?? undefined,
          token_type: account.token_type ?? undefined,
          scope: account.scope ?? undefined,
          id_token: account.id_token ?? undefined,
          session_state: account.session_state?.toString() ?? null,
          refresh_token: account.refresh_token ?? undefined,
        },
      });

      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
