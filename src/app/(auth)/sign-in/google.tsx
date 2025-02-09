"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useTransition } from "react";
import { GoogleAction } from "./google-action";

export default function GoogleProvider() {
  const [isPending, startTransition] = useTransition();

  const onSignIn = () => {
    startTransition(async () => {
      GoogleAction().catch((err) => {
        console.log(err);
      });
    });
  };
  return (
    <form action={onSignIn} className="flex gap-2 items-center mt-3 w-full">
      <Button
        disabled={isPending}
        variant="outline"
        type="submit"
        className="w-full"
      >
        <Image
          src="https://res.cloudinary.com/dixdqxpza/image/upload/v1738980054/google_zkprve.png"
          alt="google"
          width={20}
          height={20}
        />
        {isPending ? (
          <>
            <span className="animate-spin mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a8 8 0 1 1 0 15.292"
                />
              </svg>
            </span>
            Loading...
          </>
        ) : (
          "Google Account"
        )}
      </Button>
    </form>
  );
}
