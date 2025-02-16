"use client";

import Link from "next/link";
import Image from "next/image";
import { useTransition } from "react";
import { ICv } from "@/lib/interfaces";
import { deleteCv } from "./delete-action";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";
import ButtonDeleteWithAlert from "@/components/custom/ButtonDeleteWithAlert";
import LoadingScreen from "@/components/custom/LoadingScreen";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LinkIcon, PhoneIcon } from "lucide-react";
import { motion } from "framer-motion";

const image =
  "https://res.cloudinary.com/dixdqxpza/image/upload/v1738820082/cv-ats1_y7nvo3.png";

export default function DashboardCvList({ cv }: { cv: ICv[] }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const onDelete = (id: string) => {
    startTransition(() => {
      deleteCv(id).then((res) => {
        if (!res.success) {
          toast({
            title: "Error",
            description: res.message,
            variant: "destructive",
          });
          return;
        }
        toast({
          title: "Success",
          description: res.message,
          variant: "default",
        });
      });
    });
  };

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {isPending && <LoadingScreen message="Loading..." />}
      {cv.map((cv) => (
        <motion.div
          key={cv.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className="mb-10 shadow-md border border-gray-200 rounded-lg overflow-hidden">
            <CardHeader className="relative">
              <Image
                src={image}
                alt="CV Preview"
                className="w-full h-40 object-cover rounded-t-lg"
                width={300}
                height={150}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <Link href={`/dashboard/cv/${cv.id}`}>
                  <Button variant="secondary">
                    <EyeIcon className="mr-2" /> View Details
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg font-semibold">
                {cv.fullName}
              </CardTitle>
              <p className="text-sm text-gray-600">{cv.email}</p>
              <div className="flex items-center gap-2 mt-2 text-gray-500">
                <PhoneIcon size={16} />
                <span className="text-sm">{cv.phoneNumber}</span>
              </div>
              {cv.linkedInURL && (
                <div className="flex items-center gap-2 mt-1 text-blue-500">
                  <LinkIcon size={16} />
                  <Link
                    href={cv.linkedInURL}
                    target="_blank"
                    className="text-sm hover:underline"
                  >
                    LinkedIn Profile
                  </Link>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">
                Created: {new Date(cv.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Link href={`/dashboard/update-cv/${cv.id}`}>
                <Button variant="outline">
                  <PencilIcon size={16} className="mr-2" /> Edit
                </Button>
              </Link>
              <ButtonDeleteWithAlert
                title="Delete Cv"
                desc="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                button={
                  <Button variant="destructive" title="Delete Cv">
                    <Trash2Icon />
                  </Button>
                }
                onDelete={() => onDelete(cv.id)}
              />
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
