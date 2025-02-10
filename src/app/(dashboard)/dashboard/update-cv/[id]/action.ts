"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CvSchema, CvValues } from "@/lib/types";
import { InputJsonValue } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const onSubmitAction = async (values: CvValues) => {
  const user = await auth();
  try {
    const result = CvSchema.safeParse(values);
    if (!result.success) {
      return {
        message: "Invalid input",
        error: true,
        success: false,
      };
    }

    const {
      id,
      fullName,
      email,
      phoneNumber,
      birthDay,
      nationality,
      maritalStatus,
      gender,
      address,
      linkedInURL,
      portfolioURL,
      summary,
      skills,
      experiences,
      projects,
      educations,
      certifications,
      languages,
    } = result.data;

    const cv = await prisma.cV.update({
      where: {
        id,
      },
      data: {
        userId: user?.user?.id || "",
        fullName,
        email,
        phoneNumber,
        birthDay: new Date(birthDay),
        nationality,
        maritalStatus,
        gender,
        address,
        linkedInURL,
        portfolioURL,
        summary,
        skills: (skills ?? []) as unknown as string[],
        experiences: (experiences ?? []) as unknown as InputJsonValue[],
        educations: (educations ?? []) as unknown as InputJsonValue[],
        certifications: (certifications ?? []) as unknown as InputJsonValue[],
        languages: (languages ?? []) as unknown as InputJsonValue[],
        projects: (projects ?? []) as unknown as InputJsonValue[],
      },
    });

    revalidatePath("/dashboard");

    return {
      message: "CV updated successfully",
      data: cv,
      error: false,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Something went wrong",
      error: true,
      success: false,
    };
  }
};
