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
        // session.user.provider = token.provider;
        // session.user.emailVerified = token.emailVerified;
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
      if (account?.provider === "google" && user.email && user.id) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          console.log("USER CREATE CALLED");
          console.log({ existingUser });
          await prisma.user.create({
            data: {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              emailVerified: profile?.email_verified ? new Date() : null,
            },
          });

          await prisma.account.create({
            data: {
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
        }

        await prisma.user.update({
          where: { email: user.email },
          data: {
            emailVerified: profile?.email_verified ? new Date() : null,
          },
        });

        await prisma.account.update({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          data: {
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
      }

      if (account?.provider === "credentials" && user.email && user.id) {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image,
              emailVerified: profile?.email_verified ? new Date() : null,
            },
          });

          await prisma.account.create({
            data: {
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
        }

        await prisma.user.update({
          where: { email: user.email },
          data: {
            emailVerified: profile?.email_verified ? new Date() : null,
          },
        });

        await prisma.account.update({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
          data: {
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
      }

      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
