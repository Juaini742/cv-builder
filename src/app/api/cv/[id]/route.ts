import {
  ICertification,
  ICv,
  IEducation,
  IExperience,
  ILanguage,
  IProject,
} from "@/lib/interfaces";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || typeof id !== "string") {
      return NextResponse.json({
        message: "id is required and must be a string",
        status: 400,
      });
    }

    const result = await prisma.cV.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      return NextResponse.json(
        {
          message: "Cv not found",
        },
        { status: 404 }
      );
    }

    const formattedCv: ICv = {
      ...result,
      experience: result.experience as unknown as IExperience[],
      education: result.education as unknown as IEducation[],
      certifications: result.certifications as unknown as ICertification[],
      languages: result.languages as unknown as ILanguage[],
      project: result.project as unknown as IProject[],
    };

    return NextResponse.json(formattedCv, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
