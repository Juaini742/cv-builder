import { DevelopmentImg } from "@/assets";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <main className="flex-1 flex flex-col justify-center items-center  gap-5">
      <Card className="flex-1 p-3 w-full flex flex-col gap-5 justify-center items-center">
        <h1 className="text-4xl font-bold text-primary text-center">
          Development
        </h1>
        <Image src={DevelopmentImg} alt="404" width={300} height={300} />
        <p className="text-lg text-gray-600">
          Sorry this page is still in development.
        </p>
      </Card>
    </main>
  );
}
