"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteCv(
  id: string
): Promise<{ message: string; success: boolean }> {
  try {
    if (!id) {
      return {
        message: "Something went wrong",
        success: false,
      };
    }

    const cv = await prisma.cV.delete({
      where: {
        id,
      },
    });

    if (!cv) {
      return {
        message: "Something went wrong",
        success: false,
      };
    }

    revalidatePath("/dashboard");
    return {
      message: "Cv deleted successfully",
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Something went wrong",
      success: false,
    };
  }
}
