"use client";

import SubHeader from "@/components/custom/SubHeader";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import React from "react";
import {
  FileText,
  Printer,
  BrainCircuit,
  BadgeCheck,
  Layout,
  FileSearch,
} from "lucide-react";

export const features = [
  {
    title: "CV Builder",
    description:
      "Easily create and manage your CV with an intuitive and responsive interface.",
    icon: FileText,
  },
  {
    title: "Print PDF",
    description:
      "Download and print your CV in high-quality PDF format with just one click.",
    icon: Printer,
  },
  {
    title: "AI-Powered Description (Dev)",
    description:
      "Use AI to generate professional and engaging job descriptions effortlessly.",
    icon: BrainCircuit,
  },
  {
    title: "100% Free",
    description:
      "Enjoy all features without hidden costs, completely free with no limitations.",
    icon: BadgeCheck,
  },
  {
    title: "Multiple Templates",
    description:
      "Choose from a variety of professional templates to create a standout CV.",
    icon: Layout,
  },
  {
    title: "Read from Existing PDF (Dev)",
    description:
      "Import data directly from an existing PDF file to speed up CV creation.",
    icon: FileSearch,
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="container pt-10">
      <SubHeader
        title="Powerful Features"
        description="Explore a range of powerful tools designed to help you create, manage, and enhance your CV effortlessly. From AI-driven descriptions to multiple templates, we provide everything you need to build a professional resume."
      />
      <HoverEffect items={features} />
    </section>
  );
}
