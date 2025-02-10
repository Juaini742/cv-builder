import { EmptyImg } from "@/assets";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function EmptyCv() {
  return (
    <Card className="flex-1 flex flex-col gap-5 items-center justify-center py-16">
      <Image src={EmptyImg} alt="Empty CV" className="w-28" />
      <h2 className="text-xl font-semibold mt-4">No CVs found</h2>
      <p className="text-gray-500 mt-2">
        You don&apos;t have any CVs yet. Create one now.
      </p>
      <Link href="dashboard/create-cv">
        <Button>Create Cv</Button>
      </Link>
    </Card>
  );
}
