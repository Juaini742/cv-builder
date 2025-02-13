"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { loginSchema } from "@/lib/types";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields", success: null, user: null };
  }
  const { email, password } = validatedFields.data;
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return {
        success: null,
        error: "User unregistered, Please sign up first",
        role: null,
      };
    }

    if (user) {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
    }
    return { success: true, error: null };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};

export const googleLogin = async () => {
  try {
    await signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });

    return { success: true, error: null };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong", success: false };
  }
};
