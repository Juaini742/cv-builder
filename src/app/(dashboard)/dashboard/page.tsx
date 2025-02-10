import React from "react";
import { auth } from "@/auth";
import DashboardCvList from "./dashboard-cv-list";
import { GetCv } from "@/server-hooks/Get-CV";

import DashboardHeader from "./dashboard-header";
import DashboardStats from "./dashboard-stats";
import EmptyCv from "./empty-cv";

export default async function page() {
  const user = await auth();
  const cvs = await GetCv();

  return (
    <div className="flex flex-col gap-5">
      <DashboardHeader user={user} />
      <DashboardStats totalCvs={cvs.length.toString()} />
      {cvs.length > 0 ? <DashboardCvList cv={cvs} /> : <EmptyCv />}
    </div>
  );
}
