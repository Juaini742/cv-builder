import { LogoWhiteImg } from "@/assets";
import { Github, MailCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FooterSection() {
  return (
    <footer className="bg-gradient-to-br from-primary to-blue-500 text-white py-10">
      <div className="container flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          <Image src={LogoWhiteImg} alt="Logo" width={100} height={100} />
          <p className="text-sm mt-3 max-w-sm">
            Build your professional CV effortlessly. Choose a template,
            customize it, and download in minutes.
          </p>
        </div>

        <div className="flex flex-col items-center lg:items-start gap-3">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <Link className="hover:underline" href="#features">
            Features
          </Link>
          <Link className="hover:underline" href="#testimonial">
            Testimonials
          </Link>
          <Link className="hover:underline" href="#step">
            Join
          </Link>
        </div>

        <div className="flex flex-col items-center lg:items-start gap-3">
          <h3 className="text-lg font-semibold">Stay Connected</h3>
          <div className="flex items-center gap-2">
            <MailCheck />
            <a
              href="mailto:juaini742@gmail.com"
              target="_blank"
              className="hover:underline"
            >
              juaini742@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Github />
            <a
              href="https://github.com/your-repository"
              target="_blank"
              className="hover:underline"
            >
              Contribute on GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20 mt-6 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} CV Builder. All rights reserved.
      </div>
    </footer>
  );
}
