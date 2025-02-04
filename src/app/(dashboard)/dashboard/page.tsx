import { auth } from "@/auth";
import { BoxReveal } from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default async function page() {
  const user = await auth();
  return (
    <div>
      <div className="flex justify-between">
        <BoxReveal boxColor="#5046e6" duration={0.5}>
          <h1 className="py-2 rounded-md text-lg">
            Welcome <span className="font-bold">{user?.user?.email}</span>
          </h1>
        </BoxReveal>

        <Link href="/dashboard/create-cv">
          <Button>Create Cv</Button>
        </Link>
      </div>
    </div>
  );
}
