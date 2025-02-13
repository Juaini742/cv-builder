import { GetUser } from "@/server-hooks/Get-User";
import React from "react";
import UpdateUserForm from "./update-form";
import { IUser } from "@/lib/interfaces";
import { Card } from "@/components/ui/card";

export default async function page() {
  const user = await GetUser();
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <Card className="relative z-10 max-w-3xl w-full bg-white shadow-lg rounded-xl p-6">
        <UpdateUserForm user={user as IUser | null} />
      </Card>
    </div>
  );
}
