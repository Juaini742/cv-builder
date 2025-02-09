import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/ui/blur-fade";
import Link from "next/link";
import React from "react";

export default function ArticleSection() {
  return (
    <section className="container flex flex-col-reverse lg:flex-row items-center justify-between gap-6 py-16">
      {/* Left Side - Video */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <BlurFade
          delay={0.25}
          direction="right"
          className="relative w-[23rem] md:w-[30rem] lg:w-[40rem]"
          inView
        >
          <video
            src="https://res.cloudinary.com/dixdqxpza/video/upload/v1738998153/Screencast_from_2025-02-08_14-01-25_smpuee.webm"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover rounded-2xl shadow-lg border border-gray-300"
          />
          <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary rounded-full blur-lg opacity-20"></div>
        </BlurFade>
      </div>

      {/* Right Side - Text Content */}
      <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start gap-6">
        {/* Title */}
        <BlurFade delay={0.25} inView>
          <h1 className="text-4xl font-bold text-primary leading-tight">
            CV Showcase <br className="hidden lg:block" /> & Insights
          </h1>
        </BlurFade>

        {/* Subtitle */}
        <BlurFade delay={0.35} className="text-muted-foreground" inView>
          <p className="text-md leading-relaxed">
            Explore a detailed breakdown of a professional CV example. Learn how
            each section is structured, what makes it effective, and how you can
            create a standout resume just like this.
          </p>
        </BlurFade>

        {/* Feature Badges */}
        <BlurFade delay={0.4} inView>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <Badge className="bg-blue-500 text-white">AI-Powered</Badge>
            <Badge className="bg-green-500 text-white">
              Multiple Templates
            </Badge>
            <Badge className="bg-purple-500 text-white">
              Editable Sections
            </Badge>
          </div>
        </BlurFade>

        {/* Divider */}
        <div className="w-20 h-[2px] bg-muted-foreground opacity-30"></div>

        {/* CTA Button */}
        <BlurFade delay={0.45} inView>
          <Link href="/sign-in">
            <InteractiveHoverButton>
              Start Building Your CV
            </InteractiveHoverButton>
          </Link>
        </BlurFade>
      </div>
    </section>
  );
}
