import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import * as bcrypt from "bcrypt-ts";
import { loginSchema } from "./lib/types";
import { getUserByEmail } from "./data/user";

export default {
  providers: [
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
