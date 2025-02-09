import Credentials from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt-ts";
import { loginSchema } from "./lib/types";
import { getUserByEmail } from "./data/user";
import Google from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success || !validatedFields.data.email) {
          throw new Error("Invalid credentials");
        }

        const user = await getUserByEmail(validatedFields.data.email);
        if (!user) {
          throw new Error("User not found");
        }

        const pwVerify = bcrypt.compareSync(
          validatedFields.data.password,
          user.password || ""
        );
        if (!pwVerify) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  trustHost: true,
} satisfies NextAuthConfig;
