"use server";

import { signIn } from "@/auth";

export const GoogleAction = async () => {
  const session = await signIn("google");
  return session;
};
