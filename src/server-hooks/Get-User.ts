"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const GetUser = async () => {
  const authData = await auth();
  const user = await prisma.user.findUnique({
    where: {
      id: authData?.user?.id || "",
    },
    include: {
      Profile: true,
    },
  });

  return user;
};
