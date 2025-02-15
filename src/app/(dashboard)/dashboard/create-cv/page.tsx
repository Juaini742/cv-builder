import React from "react";
import CvForm from "./form/cv-form";
import { GetCv } from "@/server-hooks/Get-CV";

export default async function page() {
  const cv = await GetCv();

  return (
    <div>
      <CvForm cv={cv} />
      <div className="my-10" />
    </div>
  );
}
