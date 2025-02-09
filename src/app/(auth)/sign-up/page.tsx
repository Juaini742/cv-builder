import RegisterForm from "./Form";
import GoogleProvider from "../sign-in/google";
import Image from "next/image";
import { LogoBlackImg } from "@/assets";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center items-center p-10 relative">
        <Link href="/">
          <Image
            src={LogoBlackImg}
            alt="logo"
            width={150}
            height={150}
            className="absolute top-5 left-5"
          />
        </Link>

        <div className="max-w-md w-full">
          <BlurFade delay={0.25}>
            <h2 className="text-3xl font-semibold text-primary mb-2">
              Join Us Today!
            </h2>
            <p className="text-gray-500 mb-6">
              Create an account to start building your professional CV with
              ease.
            </p>
            <RegisterForm />
            <div className="mt-4">
              <GoogleProvider />
            </div>
            <p className="text-sm text-gray-500 mt-6 flex items-center">
              Already have an account?{" "}
              <Button variant="link" className="p-0 flex justify-start">
                <Link href="/sign-in">Click here to sign in</Link>
              </Button>
            </p>
          </BlurFade>
        </div>
      </div>

      <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-r from-blue-700 to-blue-500 text-white flex-col items-center justify-center p-10 text-center">
        <h3 className="text-4xl font-bold">Dear User</h3>
        <p className="mt-4 text-lg max-w-md leading-relaxed">
          Take the next step in your career journey. Build a professional CV
          that showcases your skills and achievements.
        </p>
      </div>
    </div>
  );
}
