import "./globals.css";
import Head from "next/head";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Geist, Geist_Mono } from "next/font/google";
import ReactQueryConfiguration from "./ReactQueryConfiguration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Build Your CV Online",
  description:
    "Easily create professional resumes with our AI-powered CV builder. Choose from job-ready templates and export to PDF.",
  openGraph: {
    title: "AI CV Builder",
    description:
      "Easily create professional resumes with AI assistance. Export to PDF and land your dream job.",
    images: [
      {
        url: "https://res.cloudinary.com/dc6cewocz/image/upload/v1739498742/logo-white_il61g0.png",
        width: 800,
        height: 600,
        alt: "go",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Your Name or Company" />
        <meta property="og:title" content={"Build Your CV Online"} />
        <meta
          property="og:description"
          content={metadata.openGraph?.description || ""}
        />
        <meta
          property="og:image"
          content={
            "https://res.cloudinary.com/dc6cewocz/image/upload/v1739498742/logo-white_il61g0.png"
          }
        />
        <meta property="og:type" content={"website"} />
        <meta property="og:url" content="https://yourwebsite.com" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryConfiguration>{children}</ReactQueryConfiguration>
        <Toaster />
      </body>
    </html>
  );
}
