"use server";

import { prisma } from "@/lib/prisma";
import { UpdateUserSchema, UpdateUserValues } from "@/lib/types";
import { GetUser } from "@/server-hooks/Get-User";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

export default async function UpdateUserAction(values: UpdateUserValues) {
  configureCloudinary();
  const user = await GetUser();
  const { name, address, phone, position, github, portfolio, image, linkedin } =
    UpdateUserSchema.parse(values);

  if (
    (!image || typeof image !== "string" || !image.startsWith("https://")) &&
    !image?.startsWith("data:image/")
  ) {
    return {
      error: true,
      message: "Invalid image format",
      success: false,
    };
  }

  try {
    const oldImage = user?.Profile?.image;
    let urlImage = oldImage;

    if (
      image &&
      typeof image === "string" &&
      image.startsWith("data:image/") &&
      image !== oldImage
    ) {
      if (oldImage) {
        const oldPublicId = oldImage.split("/").pop()?.split(".")[0];
        if (oldPublicId) {
          await cloudinary.uploader.destroy(`profile/${oldPublicId}`);
        }
      }

      const uploadResult = await cloudinary.uploader.upload(image, {
        folder: "profile",
      });

      if (!uploadResult.secure_url) throw new Error("Upload failed");

      urlImage = uploadResult.secure_url;
    }

    const profile = await prisma.profile.update({
      where: { userId: user?.id || "" },
      data: {
        name,
        address,
        phone,
        position,
        github,
        portfolio,
        linkedin,
        image: urlImage,
      },
    });

    revalidatePath("/profile");

    return {
      success: true,
      message: "Profile updated successfully",
      data: profile,
      error: false,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: true, message: "Upload failed", success: false };
  }
}

function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}
