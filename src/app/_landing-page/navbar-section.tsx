"use client";

import { LogoBlackImg } from "@/assets";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function NavbarSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-[9999]">
      <nav className="container px-5 md:px-0 flex justify-between items-center py-4">
        <Link href="/" className="flex items-center">
          <Image src={LogoBlackImg} alt="Logo" width={120} height={40} />
        </Link>

        <ul className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>
            <Link href="#features" className="hover:text-primary">
              Features
            </Link>
          </li>
          <li>
            <Link href="#testimonial" className="hover:text-primary">
              Testimonials
            </Link>
          </li>
          <li>
            <Link href="#step" className="hover:text-primary">
              Build
            </Link>
          </li>
        </ul>

        <div className="hidden lg:block">
          <Link href="/sign-in">
            <Button>Join Us</Button>
          </Link>
        </div>

        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 text-lg transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <button
          className="absolute top-6 right-6 text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} />
        </button>
        <Link
          href="/"
          className="hover:text-primary text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          href="#features"
          className="hover:text-primary text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          Features
        </Link>
        <Link
          href="#testimonial"
          className="hover:text-primary text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          Testimonials
        </Link>
        <Link
          href="#step"
          className="hover:text-primary text-gray-700"
          onClick={() => setIsOpen(false)}
        >
          Build
        </Link>
        <Link href="/sign-in">
          <Button onClick={() => setIsOpen(false)}>Join Us</Button>
        </Link>
      </div>
    </header>
  );
}
