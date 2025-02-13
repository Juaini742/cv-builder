"use client";

import { UserImg } from "@/assets";
import ButtonWithLoading from "@/components/custom/ButtonWithLoading";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IUser } from "@/lib/interfaces";
import { UpdateUserSchema, UpdateUserValues } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BriefcaseBusiness,
  BriefcaseIcon,
  CameraIcon,
  GithubIcon,
  LinkIcon,
  MapPinIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import UpdateUserAction from "./action";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UpdateUserForm({ user }: { user: IUser | null }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.Profile.image ?? "");
  const form = useForm<UpdateUserValues>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: extractDefaultValue(user),
  });

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      form.setError("image", {
        type: "manual",
        message: "Only image files are allowed",
      });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      form.setError("image", {
        type: "manual",
        message: "File size must be less than 5 MB",
      });
      toast({
        title: "File size must be less than 5 MB",
        description: "Please upload a file less than 5 MB",
        variant: "destructive",
      });
      return;
    }

    form.clearErrors("image");

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result as string;
      form.setValue("image", base64String);
      setAvatarUrl(URL.createObjectURL(file));
    };
  };

  const onSubmit = async (values: UpdateUserValues) => {
    startTransition(() => {
      UpdateUserAction(values).then((res) => {
        if (res.success) {
          toast({
            title: "Profile updated successfully",
            description: res.message,
            variant: "default",
          });
          router.push("/profile");
        }
      });
    });
  };

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-semibold">Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 rounded-full border overflow-hidden group">
                <Image
                  src={avatarUrl === "" ? UserImg : avatarUrl}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="w-full h-full object-cover"
                />
                <label
                  htmlFor="imageUpload"
                  className="hidden group-hover:flex justify-center items-center absolute inset-0 bg-black bg-opacity-50 cursor-pointer transition-all duration-300"
                >
                  <div className="p-1 bg-white border rounded-full shadow ">
                    <CameraIcon className="w-5 h-5 text-gray-700" />
                  </div>
                </label>
              </div>
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                onChange={handleUploadImage}
                accept="image/*"
              />
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="phone"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="flex items-center border  rounded-md gap-2 pl-2 group focus-within:ring-1 focus-within:ring-primary">
                        <span>+628</span>
                        <Input
                          placeholder="Enter your Phone number"
                          className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          value={field.value.replace(/^(\+?628)/, "")}
                          onChange={(e) => {
                            const newValue = e.target.value.replace(/\D/g, "");
                            if (newValue.length > 13) return;
                            form.setValue(
                              "phone",
                              newValue ? `+628${newValue}` : ""
                            );
                            field.onChange(`+628${newValue}`);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="position"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-2 focus-within:ring-1 focus-within:ring-primary">
                        <BriefcaseBusiness className="w-5 h-5 text-gray-500" />
                        <Input
                          placeholder="Enter your position: e.g. Frontend Developer, student..."
                          {...field}
                          className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="address"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-2 focus-within:ring-1 focus-within:ring-primary">
                        <MapPinIcon className="w-5 h-5 text-gray-500" />
                        <Input
                          placeholder="Enter your address"
                          {...field}
                          className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="linkedin"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-2 focus-within:ring-1 focus-within:ring-primary">
                        <LinkIcon className="w-5 h-5 text-gray-500" />
                        <Input
                          type="url"
                          placeholder="LinkedIn URL"
                          {...field}
                          className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="github"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-2 focus-within:ring-1 focus-within:ring-primary">
                        <GithubIcon className="w-5 h-5 text-gray-500" />
                        <Input
                          type="url"
                          placeholder="GitHub URL"
                          {...field}
                          className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                name="portfolio"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio</FormLabel>
                    <FormControl>
                      <div className="flex items-center border rounded-md px-2 focus-within:ring-1 focus-within:ring-primary">
                        <BriefcaseIcon className="w-5 h-5 text-gray-500" />
                        <Input
                          type="url"
                          placeholder="Portfolio URL"
                          {...field}
                          className="border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col gap-3">
              <ButtonWithLoading
                type="submit"
                isLoading={isPending}
                label="Save Update"
              />
              <Link href="/profile">
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
}

const extractDefaultValue = (user: IUser | null) => {
  return {
    name: user?.Profile?.name ?? "",
    position: user?.Profile?.position ?? "",
    imagePreview: user?.Profile?.image ?? "",
    image: user?.Profile?.image ?? "",
    phone: user?.Profile?.phone ?? "",
    address: user?.Profile?.address ?? "",
    linkedin: user?.Profile?.linkedin ?? "",
    github: user?.Profile?.github ?? "",
    portfolio: user?.Profile?.portfolio ?? "",
  };
};
