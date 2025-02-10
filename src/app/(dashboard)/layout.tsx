import React from "react";
import { SidebarDashboard } from "./sidebar";
import { GetUser } from "@/server-hooks/Get-User";
import { IUser } from "@/lib/interfaces";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await GetUser();

  console.log("LAYOUT USER:", user);

  return (
    <>
      <SidebarDashboard user={user as IUser | null}>
        {children}
      </SidebarDashboard>
    </>
  );
}
