import { prisma } from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
      include: { Profile: true },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { Profile: true },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
