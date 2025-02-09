"use client";

import React from "react";
import CvForm from "./form/cv-form";
import { useParams } from "next/navigation";
import { useSingleCv } from "@/hooks/use-singleCv";

export default function Page() {
  const param = useParams<{ id: string }>();
  const { cv, isSingleCvLoading } = useSingleCv(param.id);

  if (isSingleCvLoading) {
    return <div>Loading...</div>;
  }

  console.log(cv);

  return (
    <div>
      <CvForm id={param.id} cv={cv} />
    </div>
  );
}
