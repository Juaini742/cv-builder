"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/flip-words";
import {
  Award,
  BriefcaseBusiness,
  CheckCircle,
  FileText,
  Star,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ResumeSVGImg } from "@/assets";
import { TextAnimate } from "@/components/magicui/text-animate";
import { useRouter } from "next/navigation";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";

const words = ["Professional", "Beautiful", "Modern"];

export default function HeroSection() {
  const router = useRouter();
  return (
    <section className="relative w-full h-[38rem] flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-16 lg:px-20 xl:px-32 py-12">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <BlurFade delay={0.25}>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-tight">
            Build Your <FlipWords words={words} /> CV{" "}
            <br className="hidden md:block" /> With Ease
          </h1>
        </BlurFade>
        <TextAnimate
          animation="blurInUp"
          by="character"
          className="text-base md:text-lg lg:text-xl text-gray-600 mt-4 max-w-lg md:max-w-xl"
        >
          Create a stunning, professional resume effortlessly and land your
          dream job with our AI-powered CV Builder.
        </TextAnimate>

        <div className="mt-6 flex justify-center md:justify-start gap-4">
          <BlurFade delay={0.25}>
            <InteractiveHoverButton onClick={() => router.push("/sign-in")}>
              Get Started
            </InteractiveHoverButton>
          </BlurFade>

          <BlurFade delay={0.35}>
            <Link href="#features">
              <Button
                variant="outline"
                size="lg"
                className="px-6 py-3 text-base md:text-lg"
              >
                Learn More
              </Button>
            </Link>
          </BlurFade>
        </div>

        <div className="mt-8 mb-10 md:mb-0 flex flex-col md:flex-row justify-center md:justify-start gap-4 md:gap-6">
          <BlurFade delay={0.25}>
            <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
              <CheckCircle className="text-green-500 w-5 h-5" />
              AI-Optimized Resume
            </div>
          </BlurFade>
          <BlurFade delay={0.35}>
            <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
              <CheckCircle className="text-green-500 w-5 h-5" />
              Job-Ready Templates
            </div>
          </BlurFade>
          <BlurFade delay={0.45}>
            <div className="flex items-center gap-2 text-gray-700 text-sm md:text-base">
              <CheckCircle className="text-green-500 w-5 h-5" />
              Export to PDF
            </div>
          </BlurFade>
        </div>
      </div>

      <div className="mb-10 md:mt-0 flex w-full md:w-1/2 h-full md:justify-center items-center md:mb-0 relative">
        <BlurFade delay={0.25} direction="left">
          <Image
            src={ResumeSVGImg}
            alt="CV Builder Preview"
            width={500}
            height={500}
            className="w-64 md:w-80 lg:w-[400px] h-auto relative z-20"
          />
        </BlurFade>

        <BlurFade delay={0.3} direction="right">
          <div className="absolute top-16 left-10 w-14 h-14 bg-white shadow-lg rounded-full flex items-center justify-center animate-float">
            <BriefcaseBusiness className="text-primary w-7 h-7" />
          </div>
        </BlurFade>

        <BlurFade delay={0.4} direction="down">
          <div className="absolute top-24 right-14 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center animate-float delay-200">
            <FileText className="text-blue-500 w-6 h-6" />
          </div>
        </BlurFade>

        <BlurFade delay={0.5} direction="left">
          <div className="absolute bottom-14 left-12 w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center animate-float delay-400">
            <CheckCircle className="text-green-500 w-8 h-8" />
          </div>
        </BlurFade>

        <BlurFade delay={0.6} direction="up">
          <div className="absolute bottom-24 right-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center animate-float delay-600">
            <UserCheck className="text-orange-500 w-5 h-5" />
          </div>
        </BlurFade>

        <BlurFade delay={0.7} direction="right">
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-white shadow-lg rounded-full flex items-center justify-center animate-float delay-800">
            <Star className="text-yellow-400 w-7 h-7" />
          </div>
        </BlurFade>

        <BlurFade delay={0.8} direction="left">
          <div className="absolute bottom-8 left-1/3 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center animate-float delay-1000">
            <Award className="text-purple-500 w-6 h-6" />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
