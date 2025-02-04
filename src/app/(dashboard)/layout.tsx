import React from "react";
import { SidebarDemo } from "./sidebar";
import { auth } from "@/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();

  console.log("LAYOUT USER:", user);

  return (
    <>
      <SidebarDemo email={user?.user?.email}>{children}</SidebarDemo>
    </>
  );
}
