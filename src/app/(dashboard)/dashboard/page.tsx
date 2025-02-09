import React from "react";
import Link from "next/link";
import CvList from "./cv-list";
import { auth } from "@/auth";
import { GetCv } from "@/server-hooks/Get-CV";
import { Button } from "@/components/ui/button";
import { BoxReveal } from "@/components/ui/box-reveal";

export default async function page() {
  const user = await auth();
  const formattedCvs = await GetCv();

  console.log("formattedCvs:", formattedCvs);

  return (
    <div>
      <div className="flex justify-between">
        <BoxReveal boxColor="#5046e6" duration={0.5}>
          <h1 className="py-2 rounded-md text-lg mb-4">
            Welcome <span className="font-bold">{user?.user?.email}</span>
          </h1>
        </BoxReveal>
        <Link href="/dashboard/create-cv">
          <Button>Create Cv</Button>
        </Link>
      </div>
      {formattedCvs.length > 0 && <CvList cv={formattedCvs} />}
    </div>
  );
}
