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

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
