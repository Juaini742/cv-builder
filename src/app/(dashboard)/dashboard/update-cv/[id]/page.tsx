"use client";

import React from "react";
import CvForm from "./form/cv-form";
import { useParams } from "next/navigation";
import { useSingleCv } from "@/hooks/use-singleCv";
import LoadingScreen from "@/components/custom/LoadingScreen";

export default function Page() {
  const param = useParams<{ id: string }>();
  const { cv, isSingleCvLoading } = useSingleCv(param.id);

  if (isSingleCvLoading) {
    return <LoadingScreen message="Loading CV..." />;
  }

  console.log(cv);

  return (
    <div>
      <CvForm id={param.id} cv={cv} />
    </div>
  );
}
