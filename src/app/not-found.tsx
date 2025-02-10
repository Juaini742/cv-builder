import { NotFoundImg } from "@/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-5 justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-primary">404</h1>
      <Image src={NotFoundImg} alt="404" width={300} height={300} />
      <p className="text-lg text-gray-600">Oops! Page not found.</p>
      <Link href="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
}
