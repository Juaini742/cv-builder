import { auth } from "@/auth";
import React from "react";
import CvForm from "./form/cv-form";

export default async function page() {
  const user = await auth();

  return (
    <div>
      <CvForm userId={user?.user?.id} />
    </div>
  );
}
