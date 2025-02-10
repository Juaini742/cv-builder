import { BoxReveal } from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import Link from "next/link";
import React from "react";

interface Props {
  user: Session | null;
}

export default function DashboardHeader({ user }: Props) {
  return (
    <header className="flex justify-between items-center bg-white p-6 shadow rounded-lg">
      <BoxReveal boxColor="#5046e6" duration={0.5}>
        <h1 className="text-xl font-semibold">
          Welcome, <span className="font-bold">{user?.user?.email}</span>
        </h1>
      </BoxReveal>
      <Link href="/dashboard/create-cv">
        <Button>Create CV</Button>
      </Link>
    </header>
  );
}
