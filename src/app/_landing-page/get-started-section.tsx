import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function GetStartedSection() {
  return (
    <section className="container mt-10 h-[30rem] flex flex-col items-center justify-center gap-3">
      <BlurFade delay={0.25} inView>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
          Get Started Now
        </h1>
      </BlurFade>
      <BlurFade delay={0.25} inView>
        <p className="text-muted-foreground text-center max-w-lg">
          Create a professional CV in minutes. Choose a template, customize it
          to fit your style, and download it instantly.
        </p>
      </BlurFade>
      <BlurFade delay={0.25} inView>
        <Link href="/sign-in">
          <Button size="lg">Get Started</Button>
        </Link>
      </BlurFade>
    </section>
  );
}
