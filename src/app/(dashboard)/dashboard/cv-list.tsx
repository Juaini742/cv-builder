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

const image =
  "https://res.cloudinary.com/dixdqxpza/image/upload/v1738820082/cv-ats1_y7nvo3.png";

export default function CvList({ cv }: { cv: ICv[] }) {
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
    <div className="flex gap-5 justify-between md:justify-normal flex-wrap">
      {isPending && (
        <LoadingScreen message="Please wait while we are deleting your CV..." />
      )}
      {cv.map((cv) => (
        <div
          key={cv.id}
          className="relative flex flex-col items-center p-2 shadow-md rounded-md group overflow-hidden"
        >
          <Image
            src={image}
            alt="cv"
            className="w-full h-52 lg:h-64 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
            width={300}
            height={300}
          />
          <h1 className="mt-3 text-sm">{cv.fullName}</h1>

          <div
            className="absolute inset-0 flex flex-col lg:flex-row gap-2 items-center justify-center bg-black/50 
                      opacity-0 scale-95 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100"
          >
            <Link href={`/dashboard/cv/${cv.id}`}>
              <Button title="See Detail">
                <EyeIcon />
              </Button>
            </Link>
            <Link href={`/dashboard/update-cv/${cv.id}`}>
              <Button variant="warning" title="Update Cv">
                <PencilIcon />
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
          </div>
        </div>
      ))}
    </div>
  );
}
