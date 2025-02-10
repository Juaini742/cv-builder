import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const authData = await auth();
    const user = await prisma.user.findUnique({
      where: {
        id: authData?.user?.id || "",
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        Profile: true,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
