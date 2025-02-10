"use server";

import { auth } from "@/auth";
import {
  ICertification,
  IEducation,
  IExperience,
  ILanguage,
  IProject,
} from "@/lib/interfaces";
import { prisma } from "@/lib/prisma";

export const GetCv = async () => {
  const user = await auth();
  const result = await prisma.cV.findMany({
    where: {
      userId: user?.user?.id,
    },
  });

  const formattedCvs = result.map((cv) => ({
    ...cv,
    experiences: cv.experiences as unknown as IExperience[],
    educations: cv.educations as unknown as IEducation[],
    certifications: cv.certifications as unknown as ICertification[],
    languages: cv.languages as unknown as ILanguage[],
    projects: cv.projects as unknown as IProject[],
  }));

  return formattedCvs;
};
