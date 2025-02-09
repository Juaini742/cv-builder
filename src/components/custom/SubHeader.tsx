import React from "react";
import { BlurFade } from "../ui/blur-fade";

interface SubHeaderProps {
  title: string;
  description: string;
}

export default function SubHeader({ title, description }: SubHeaderProps) {
  return (
    <div className="text-center flex flex-col items-center gap-4">
      <BlurFade delay={0.25} inView>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
          {title}
        </h1>
      </BlurFade>
      <div className="w-28 border bg-zinc-100 shadow-md shadow-zinc-300 rounded-full animate-float" />
      <BlurFade delay={0.35} className="md:w-1/2 text-muted-foreground " inView>
        <p>{description}</p>
      </BlurFade>
    </div>
  );
}
