"use server";

import { registerSchema, registerValue } from "@/lib/types";
import * as bcrypt from "bcrypt-ts";
import { prisma } from "@/lib/prisma";

export async function register(credentials: registerValue) {
  try {
    const { email, password } = registerSchema.parse(credentials);

    const salt = bcrypt.genSaltSync(10);
    const passwordHashing = bcrypt.hashSync(password, salt);

    const existingEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (existingEmail) {
      return {
        error: "Email already exists",
      };
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: passwordHashing,
      },
    });

    await prisma.profile.create({
      data: {
        userId: user.id,
      },
    });

    return {
      success: "Register was successfully, you might to sign in",
      error: null,
    };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
}
